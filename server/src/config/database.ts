import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});

export default {
  query: (text: string, params?: any[]): Promise<QueryResult> => pool.query(text, params),
};