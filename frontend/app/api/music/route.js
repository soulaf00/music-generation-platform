import { NextResponse } from "next/server";

import { connectMongoDB } from "../../../lib/mongodb";
import Music from "../../../models/Music";
import User from "../../../models/User";

export async function POST(request) {
  try {
    await connectMongoDB();

    const { prompt, filename } = await request.json();

    if (!prompt || !filename) {
      return NextResponse.json(
        {
          success: false,
          error: "Prompt and filename are required.",
        },
        { status: 400 }
      );
    }

    let user = await User.findOne({
      email: "demo@example.com",
    });

    if (!user) {
      user = await User.create({
        name: "Demo User",
        email: "demo@example.com",
      });
    }

    const music = await Music.create({
      prompt,
      filename,
      user: user._id,
    });

    return NextResponse.json(
      {
        success: true,
        music,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save music.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();

    const music = await Music.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        music,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve music.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectMongoDB();

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Music ID is required.",
        },
        { status: 400 }
      );
    }

    const deletedMusic = await Music.findByIdAndDelete(id);

    if (!deletedMusic) {
      return NextResponse.json(
        {
          success: false,
          error: "Music not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Music deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete music.",
      },
      { status: 500 }
    );
  }
}