import { Context, Next } from 'koa'

export default async function handleError(
  ctx: Context,
  next: Next
): Promise<void> {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = {
      message:
        'Estamos experienciando dificuldades técnicas, lamentamos o transtorno... Tente novamente em alguns minutos.'
    }
  }
}
