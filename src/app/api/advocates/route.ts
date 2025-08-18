import { db } from '@/db';
import { advocates, AdvocateType } from '@/db/schema';

export async function GET() {
  // Uncomment this line to use a database
  const data: AdvocateType[] = await db.select().from(advocates);

  return Response.json({ data });
}
