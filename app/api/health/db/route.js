import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

// Verifica se a aplicação consegue falar com o banco.
// Não expõe detalhes do erro na resposta (só no log do servidor).
export async function GET() {
  try {
    await query('SELECT 1');
    return Response.json({ status: 'ok' });
  } catch (err) {
    console.error('[health/db]', err.message);
    return Response.json({ status: 'error' }, { status: 503 });
  }
}
