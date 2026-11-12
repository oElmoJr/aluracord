import { getDatabase } from '../../src/server/database';

const cores = { geral: '#5BC0EB', games: '#9883E5', anime: '#FFAFF0', kpop: '#FFD95C' };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Método não permitido.' });
  }
  const sala = req.query.sala;
  if (typeof sala !== 'string' || !Object.hasOwn(cores, sala)) {
    return res.status(400).json({ error: 'Sala inválida.' });
  }
  try {
    const sql = getDatabase();
    if (req.method === 'GET') {
      const mensagens = await sql`SELECT id::text, de, texto, color, created_at
        FROM mensagens WHERE sala = ${sala} ORDER BY id DESC LIMIT 100`;
      return res.status(200).json({ mensagens });
    }
    if (req.headers.origin && new URL(req.headers.origin).host !== req.headers.host) {
      return res.status(403).json({ error: 'Origem inválida.' });
    }
    const { de, texto } = req.body || {};
    if (typeof de !== 'string' || !/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(de)) {
      return res.status(400).json({ error: 'Informe um nome de usuário válido do GitHub.' });
    }
    if (typeof texto !== 'string' || !texto.trim() || texto.length > 4000) {
      return res.status(400).json({ error: 'A mensagem deve ter entre 1 e 4000 caracteres.' });
    }
    if (texto.startsWith(':sticker:')) {
      let url;
      try { url = new URL(texto.slice(9).trim()); } catch {}
      if (!url || url.protocol !== 'https:') {
        return res.status(400).json({ error: 'O sticker precisa de um endereço HTTPS válido.' });
      }
    }
    const [mensagem] = await sql`INSERT INTO mensagens (sala, de, texto, color)
      VALUES (${sala}, ${de}, ${texto.trim()}, ${cores[sala]})
      RETURNING id::text, de, texto, color, created_at`;
    return res.status(201).json({ mensagem });
  } catch (error) {
    console.error('Falha no banco de mensagens:', error.code || error.name);
    return res.status(503).json({ error: 'Não foi possível acessar as mensagens. Tente novamente.' });
  }
}

export const config = { api: { bodyParser: { sizeLimit: '16kb' } } };
