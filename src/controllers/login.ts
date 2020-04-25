import { compare } from 'bcryptjs'
import { IApiContext } from '../types/AppContext'
import generateToken from '../auth/jwt'

export default async function login(ctx: IApiContext): Promise<void> {
  try {
    const { db } = ctx
    const { email, password } = ctx.request.body

    if (!email || !password) {
      ctx.throw(400, 'Informe o email e a senha!')
    }

    const user = await db('users').where({ email }).first()
    if (!user) {
      ctx.throw(401, 'Unauthorized')
    }

    if (await compare(password, user.password)) {
      ctx.status = 200
      ctx.body = { token: await generateToken({ id: user.id }) }
      return
    }

    ctx.throw(401, 'Unauthorized')
  } catch (err) {
    throw err
  }
}
