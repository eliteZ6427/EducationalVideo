import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const video_id = searchParams.get('video_id');

  if (!video_id) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "video_id is required",
      }),
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments?video_id=${video_id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
