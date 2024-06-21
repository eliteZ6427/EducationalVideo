import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { video_id, content, user_id } = (await req.json()) as {
    video_id: string;
    content: string;
    user_id: string
  };

  const newComment = {
    video_id: video_id,
    content: content,
    user_id: user_id // Replace with actual user ID
  };

  try {
    const response = await fetch(`https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const data = await response.json();
    return new NextResponse(
      JSON.stringify({
        status: "success"
      }),
      { status: 200 });
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
