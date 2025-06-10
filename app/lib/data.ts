import postgres from "postgres";
import { HeroContent } from "./definitions";
import { formatCurrency } from "./utils";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchHeroContent() {
    try {
        const data = await sql<HeroContent>`SELECT * FROM hero_content`;
        data.forEach(result => result['link'] = JSON.parse(typeof result['link'] != "string" ? JSON?.stringify(result['link']) : result['link']))
        return data;
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error('Failded to fetch hero content data.');
    }
}