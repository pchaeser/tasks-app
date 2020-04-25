import { DefaultState } from 'koa'
import Koa from 'koa'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import koaBody from 'koa-body'
import logger from 'koa-logger'

import { IApiContext } from './types/AppContext'
import db from './config/db'
import errorHandler from './middlewares/errorHandler'
import router from './routes'
import compress from './middlewares/compress'

const app = new Koa<DefaultState, IApiContext>()

app.use(helmet())
compress(app)
app.use(cors())
app.use(koaBody())
app.use(logger())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(errorHandler)

app.context.db = db

export default app
