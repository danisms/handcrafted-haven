// NOTE THIS PAGE SI FOR TESTING PURPOSE ONLY

import bcrypt from 'bcryptjs';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function fetchHeroContent() {
  const data = await sql`
    ;
  `;
  console.log("HEELO! jUST TESTING!");
  return data;
}

export async function GET() {
  try {
    return Response.json(await fetchHeroContent());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
