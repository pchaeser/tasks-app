import compress from 'koa-compress'
import Koa, { DefaultState } from 'koa'
import { IApiContext } from '../types/AppContext'

export default function compression(app: Koa<DefaultState, IApiContext>) {
  app.use(
    compress({
      filter: contentType => /text/i.test(contentType),
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH
    })
  )
}
