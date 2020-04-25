import bcrypt from 'bcryptjs'
import { IApiContext } from '../types/AppContext'

export default async function createUser(ctx: IApiContext): Promise<void> {
  try {
    const { db } = ctx
    const { email, username, password } = ctx.request.body

    const [insertId] = await db('users')
      .insert({
        email,
        name: username,
        password: await bcrypt.hash(password, 8)
      })
      .returning('id')

    ctx.status = 201

    ctx.body = {
      id: insertId,
      email,
      name: username
    }
  } catch (err) {
    throw err
  }
}
