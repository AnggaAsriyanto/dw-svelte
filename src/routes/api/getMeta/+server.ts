import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
 
export const POST: RequestHandler = async ({ request }) => {
  const { code } = await request.json();
  return json(code);
};