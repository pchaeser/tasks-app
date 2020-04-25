import { sign } from 'jsonwebtoken'

export default async function generateToken(
  payload: ITokenPayload
): Promise<any> {
  try {
    return sign(payload, process.env.JWT_SECRET || '')
  } catch (err) {
    throw err
  }
}

interface ITokenPayload {
  id: number
}
