import { neon } from '@neondatabase/serverless';
import nextEnv from '@next/env';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

nextEnv.loadEnvConfig(process.cwd());
if (!process.env.DATABASE_URL) throw new Error('Configure DATABASE_URL em .env.local.');
const sql = neon(process.env.DATABASE_URL);
const [command, filename] = process.argv.slice(2);
if (command === 'migrate') {
  const schema = await readFile(new URL('../database/schema.sql', import.meta.url), 'utf8');
  await sql.transaction(schema.split(';').map(s => s.trim()).filter(Boolean).map(s => sql.query(s)));
  console.log('Estrutura do banco criada/verificada.');
} else if (command === 'backup') {
  const mensagens = await sql`SELECT id::text, legacy_id::text, sala, de, texto, color, created_at::text FROM mensagens ORDER BY id`;
  const target = filename || `backups/aluracord-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, JSON.stringify({ version: 1, created_at: new Date().toISOString(), mensagens }, null, 2), { flag: 'wx', mode: 0o600 });
  console.log(`Backup criado: ${target} (${mensagens.length} mensagens).`);
} else if (command === 'restore' && filename) {
  const backup = JSON.parse(await readFile(filename, 'utf8'));
  if (backup.version !== 1 || !Array.isArray(backup.mensagens)) throw new Error('Backup inválido.');
  await sql.transaction([
    sql`INSERT INTO mensagens (id, legacy_id, sala, de, texto, color, created_at) OVERRIDING SYSTEM VALUE
      SELECT id, legacy_id, sala, de, texto, color, created_at FROM jsonb_to_recordset(${JSON.stringify(backup.mensagens)}::jsonb)
      AS m(id bigint, legacy_id bigint, sala text, de text, texto text, color text, created_at timestamptz)
      ON CONFLICT (id) DO NOTHING`,
    sql`SELECT setval(pg_get_serial_sequence('mensagens', 'id'),
      GREATEST(COALESCE((SELECT MAX(id) FROM mensagens), 1),
        (SELECT last_value FROM mensagens_id_seq)), true)`,
  ]);
  console.log('Backup restaurado sem sobrescrever IDs existentes.');
} else {
  throw new Error('Uso: node scripts/database.mjs migrate | backup [arquivo.json] | restore arquivo.json');
}
