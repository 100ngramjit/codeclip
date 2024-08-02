import { deleteSavedClip, getSavedClips, saveClip } from "@/db/queries";

export async function POST(req: Request) {
  const { clipId, userId } = await req.json();
  const response = await saveClip(clipId, userId);

  return Response.json(response);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userid");
  const response = await getSavedClips(userId!);
  console.log(response);

  return Response.json(response);
}

export async function DELETE(req: Request) {
  const { userId, clipId } = await req.json();
  const response = await deleteSavedClip(clipId, userId);

  return Response.json(response);
}
