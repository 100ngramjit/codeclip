import { ramdomClips } from "@/db/queries";

export async function POST(req: Request) {
  const { userId } = await req.json();
  const response = await ramdomClips(userId);

  return Response.json(response);
}
