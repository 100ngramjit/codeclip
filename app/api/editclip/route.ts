import { editClip } from "@/db/queries";

export async function PUT(req: Request) {
  const { clipId, userId, title, content } = await req.json();
  const response = await editClip(clipId, userId, title, content);

  return Response.json(response);
}
