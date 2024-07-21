import { clipDetails } from "@/db/queries";

export async function POST(req: Request) {
  const { id } = await req.json();
  const response = await clipDetails(id);

  if (!response) {
    return Response.json({});
  }
  return Response.json(response);
}
