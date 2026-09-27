import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const quiz = await prisma.quiz.findFirst({
      include: {
        question: true,
      },
    });

    if (!quiz) {
      return Response.json(
        { error: "No quiz found" },
        { status: 404 }
      );
    }

    return Response.json(quiz);
  } catch (error) {
    console.error("Failed to fetch quiz:", error);

    return Response.json(
      {
        error: "Failed to fetch quiz",
        details: error.message,
      },
      { status: 500 }
    );
  }
}