import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();

    console.log("Received quiz result:", body);

    const { quizId, score, total } = body;

    if (
      quizId === undefined ||
      score === undefined ||
      total === undefined
    ) {
      return Response.json(
        { error: "Missing quiz result data" },
        { status: 400 }
      );
    }

    const result = await prisma.quizResult.create({
      data: {
        quizId: Number(quizId),
        score: Number(score),
        total: Number(total),
      },
    });

    console.log("Quiz result saved:", result);

    return Response.json(result, {
      status: 201,
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);

    return Response.json(
      {
        error: "Failed to save quiz result",
        details: error.message,
      },
      {
        status: 500,
      }
    );
  }
}