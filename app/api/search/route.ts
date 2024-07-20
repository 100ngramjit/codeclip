import { searchClips } from "@/db/queries";

export async function POST(req: Request) {
  try {
    const { searchTerm } = await req.json();

    if (!searchTerm) {
      return Response.json(
        { error: "Search term is required" },
        { status: 400 }
      );
    }

    const response = await searchClips(searchTerm);

    return Response.json(response);
  } catch (error) {
    console.error("Error in search API route:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
