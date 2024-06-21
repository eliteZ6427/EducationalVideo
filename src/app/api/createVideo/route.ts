import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user_id, description, video_url, title } = (await req.json()) as {
    user_id: string,
    description: string,
    video_url: string,
    title: string
  };

  const newComment = {
    user_id: user_id,
    description: description,
    video_url: video_url,
    title: title
  };

  try {
    const response = await fetch(`https://take-home-assessment-423502.uc.r.appspot.com/api/videos`, {
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


