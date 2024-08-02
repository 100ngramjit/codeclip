import { clipDetails } from "@/db/queries";

export async function POST(req: Request) {
  const { id, userId } = await req.json();
  const response = await clipDetails(id, userId);

  if (!response) {
    return Response.json({});
  }
  return Response.json(response);
}
