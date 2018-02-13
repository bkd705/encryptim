import * as Koa from 'koa'
import * as BodyParser from 'koa-bodyparser'
import * as Router from 'koa-router'

import { createRoutes } from './config/routes'

const app = new Koa()
const router = new Router()

app.use(BodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

createRoutes(router)

const host = 'localhost'
const port = 3000

app.listen(port, host, () => {
  console.log(`Available on http://${host}:${port}`)
})
