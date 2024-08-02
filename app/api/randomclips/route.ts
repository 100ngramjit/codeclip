import { randomClips } from "@/db/queries";

export async function POST(req: Request) {
  const { userId } = await req.json();
  const response = await randomClips(userId);

  return Response.json(response);
}
