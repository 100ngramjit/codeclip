import { publishCode } from "@/db/queries";

export async function POST(req: Request) {
  const { title, content, userId } = await req.json();
  const response = await publishCode(title, content, userId);

  return Response.json(response);
}
