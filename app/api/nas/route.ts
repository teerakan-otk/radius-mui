import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.nas.findMany();

  return Response.json(data);
}

// export async function POST(req: Request) {
//     let body

//     try {
//       body = await req.json()
//     } catch (e) {
//       return Response.json(
//         {
//           success: false,
//           message: 'invalid or empty JSON body',
//         },
//         {
//           status: 400,
//         }
//       )
//     }

//     const { nasname, type, ports, secret, server, community, description } = body

//     try {
//       // validate
//       if (!nasname || !type) {
//       return Response.json(
//         {
//           success: false,
//           message: 'nasname and type required',
//         },
//         {
//           status: 400,
//         }
//       )
//     }

//     // check existing user
//     const existing = await prisma.nas.findFirst({
//       where: {
//         nasname,
//       },
//     })

//     if (existing) {
//       return Response.json(
//         {
//           success: false,
//           message: 'nas already exists',
//         },
//         {
//           status: 409,
//         }
//       )
//     }

//     // create radius user
//     const data = await prisma.nas.create({
//       data: {
//         nasname,
//         type,
//         ports,
//         secret,
//         server,
//         community,
//         description,
//       },
//     })

//     return Response.json({
//       success: true,
//       data,
//     })
//   } catch (error) {
//     console.error(error)

//     return Response.json(
//       {
//         success: false,
//         message: 'internal server error',
//       },
//       {
//         status: 500,
//       }
//     )
//   }
// }

export async function POST(req: Request) {
  let body;

  try {
    body = await req.json();
  } catch (e) {
    return Response.json(
      {
        success: false,
        message: "invalid or empty JSON body",
      },
      {
        status: 400,
      },
    );
  }

  const { nasname, shortname, secret, type, ports, description } = body;

  try {
    // validate
    if (!nasname || !secret) {
      return Response.json(
        {
          success: false,
          message: "nasname and secret required",
        },
        {
          status: 400,
        },
      );
    }

    // check existing
    const existing = await prisma.nas.findFirst({
      where: {
        nasname,
      },
    });

    if (existing) {
      return Response.json(
        {
          success: false,
          message: "NAS already exists",
        },
        {
          status: 409,
        },
      );
    }

    // create NAS
    const nas = await prisma.nas.create({
      data: {
        nasname,
        shortname,
        secret,
        type: type || "other",
        ports: ports || 0,
        description,
      },
    });

    return Response.json({
      success: true,
      data: nas,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
