import * as Router from 'koa-router'
import { UserController } from '../controllers/UserController'

const User = new UserController()

export const createRoutes = (router: Router) => {
  router.get('/api/user', User.index)
  router.get('/api/user/:id', User.show)
  router.post('/api/user', User.create)
  router.put('/api/user/:id', User.update)
  router.delete('/api/user', User.delete)
}
