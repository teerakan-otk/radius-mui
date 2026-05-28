import { prisma } from "@/lib/prisma";

export async function GET() {
  const logs = await prisma.radpostauth.findMany({
    orderBy: {
      authdate: "desc",
    },
    take: 50,
  });

  return Response.json({
    success: true,
    total: logs.length,
    data: logs,
  });
}
