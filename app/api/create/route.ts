import { publishClip } from "@/db/queries";

export async function POST(req: Request) {
  const { title, content, userId, userEmail } = await req.json();
  const response = await publishClip(title, content, userId, userEmail);

  return Response.json(response);
}
