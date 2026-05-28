import { prisma } from "@/lib/prisma";

export async function GET() {
  const sessions = await prisma.radacct.findMany({
    where: {
      acctstoptime: null,
    },
    orderBy: {
      acctstarttime: "desc",
    },
  });

  return Response.json({
    success: true,
    total: sessions.length,
    data: sessions,
  });
}
