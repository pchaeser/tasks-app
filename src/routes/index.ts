import { DefaultState } from 'koa'
import Router from 'koa-router'

import { IApiContext } from '../types/AppContext'
import authenticate from '../auth/authenticate'
import createUser from '../controllers/user'
import loginController from '../controllers/login'
import { createTask, getTasks, removeTask } from '../controllers/task'

const router = new Router<DefaultState, IApiContext>()

router.get('/', async (ctx: IApiContext) => {
  ctx.body = {
    status: 'success',
    message: `Connected to Node API ==> ${new Date().toISOString()}`
  }
})

router.post('/signup', createUser)
router.post('/login', loginController)

router.use(authenticate)

router.get('/tasks', getTasks)
router.post('/tasks/', createTask)
router.delete('/tasks/:id', removeTask)
router.put('/tasks/:id', updateTask)

export default router
