import { neon } from '@neondatabase/serverless';

let sql;
export function getDatabase() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL ausente');
  if (!sql) sql = neon(process.env.DATABASE_URL);
  return sql;
}
