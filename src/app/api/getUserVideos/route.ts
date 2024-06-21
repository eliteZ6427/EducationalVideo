import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get('user_id');

  if (!user_id) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "user_id is required",
      }),
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=${user_id}`);
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