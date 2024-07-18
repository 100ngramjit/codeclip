import { userClips } from "@/db/queries";

export async function POST(req: Request) {
  const { userId } = await req.json();
  const response = await userClips(userId);

  return Response.json(response);
}
