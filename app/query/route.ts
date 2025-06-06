import bcrypt from 'bcryptjs';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getHeroContent() {
	const data = await sql`
    ;
  `;

	return data;
}

export async function GET() {
  try {
  	return Response.json(await getHeroContent());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
