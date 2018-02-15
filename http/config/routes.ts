import * as Router from 'koa-router'

import { UserController } from '../controllers/UserController'
import { MessageController } from '../controllers/MessageController'
import { ChatController } from '../controllers/ChatController'

const User = new UserController()
const Message = new MessageController()
const Chat = new ChatController()

export const createRoutes = (router: Router) => {
  //Users
  router.get('/api/user', User.index)
  router.get('/api/user/:id', User.show)
  router.post('/api/user', User.create)
  router.put('/api/user/:id', User.update)
  router.delete('/api/user:id', User.delete)
  router.post('/api/login', User.login)

  //Messages
  router.get('/api/message', Message.index)
  router.get('/api/message/:id', Message.show)
  router.post('/api/message', Message.create)
  router.delete('/api/message/:id', Message.delete)

  //Chats
  router.get('/api/chat', Chat.index)
  router.get('/api/chat/:id', Chat.show)
  router.post('/api/chat', Chat.create)
}
