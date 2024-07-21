import { deleteClip, editClip } from "@/db/queries";

export async function PUT(req: Request) {
  const { clipId, userId, title, content } = await req.json();
  const response = await editClip(clipId, userId, title, content);

  return Response.json(response);
}

export async function DELETE(req: Request) {
  const { clipId } = await req.json();
  const response = await deleteClip(clipId);

  return Response.json(response);
}
