import { verify } from 'jsonwebtoken'
import { Next } from 'koa'
import { IApiContext } from '../types/AppContext'

export default function authenticate(ctx: IApiContext, next: Next) {
  try {
    const token: string = ctx.request.headers.authentication
    const user: any = verify(token, process.env.JWT_SECRET || '')

    if (user.id !== undefined) {
      ctx.state = { ...(ctx.state || {}), user }
      return next()
    }

    throw new Error('Error authenticating user.')
  } catch (err) {
    ctx.throw(401, 'Error authenticating user.')
  }
}
