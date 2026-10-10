import 'server-only';
import { Pool } from 'pg';

// Conexão com o PostgreSQL. Só pode ser importado em código de servidor
// (Server Components, Route Handlers, Server Actions) — o 'server-only'
// quebra o build se algum Client Component tentar importar este módulo.

const REQUIRED_ENV = ['DATABASE_HOST', 'DATABASE_NAME', 'DATABASE_USER', 'DATABASE_PASSWORD'];

function createPool() {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Variáveis de ambiente ausentes: ${missing.join(', ')}. Veja o .env.example.`);
  }

  const pool = new Pool({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT ?? 5432),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: true } : false,
    max: Number(process.env.DATABASE_POOL_MAX ?? 10),
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });

  // Evita que um erro em conexão ociosa derrube o processo
  pool.on('error', (err) => {
    console.error('[db] erro inesperado no pool:', err.message);
  });

  return pool;
}

// Reaproveita o pool entre os hot reloads do `next dev`
const globalForDb = globalThis;
const pool = globalForDb.__pgPool ?? createPool();
if (process.env.NODE_ENV !== 'production') globalForDb.__pgPool = pool;

/**
 * Executa uma query parametrizada.
 * Sempre passe valores via `params` ($1, $2...) — nunca concatene na string SQL.
 * @example query('SELECT * FROM products WHERE id = $1', [id])
 */
export function query(text, params) {
  return pool.query(text, params);
}

export default pool;
