import { prisma } from '@/lib/prisma'

export async function GET() {
  const users = await prisma.radcheck.findMany()

  return Response.json(users)
}

export async function POST(req: Request) {
    let body
    try {
      body = await req.json()
    } catch (e) {
      return Response.json(
        {
          success: false,
          message: 'invalid or empty JSON body',
        },
        {
          status: 400,
        }
      )
    }

    const { username, password } = body

    try {
      // validate
      if (!username || !password) {
      return Response.json(
        {
          success: false,
          message: 'username and password required',
        },
        {
          status: 400,
        }
      )
    }

    // check existing user
    const existing = await prisma.radcheck.findFirst({
      where: {
        username,
      },
    })

    if (existing) {
      return Response.json(
        {
          success: false,
          message: 'user already exists',
        },
        {
          status: 409,
        }
      )
    }

    // create radius user
    const user = await prisma.radcheck.create({
      data: {
        username,
        attribute: 'Cleartext-Password',
        op: ':=',
        value: password,
      },
    })

    return Response.json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        success: false,
        message: 'internal server error',
      },
      {
        status: 500,
      }
    )
  }
}