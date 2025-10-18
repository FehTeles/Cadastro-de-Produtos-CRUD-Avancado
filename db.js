import 'dotenv/config';
import http from 'http';
import { neon } from '@neondatabase/serverless';
import postgres from 'postgres'; // pode remover se não estiver usando

export const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req, res) => {
  try {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(version);
  } catch (err) {
    console.error('Erro ao consultar o banco:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Erro interno do servidor');
  }
};

const server = http.createServer(requestHandler);

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
