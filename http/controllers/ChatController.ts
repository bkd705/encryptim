import { IRouterContext } from 'koa-router'

export class ChatController {
  chats: Chat[] = []

  index = async (ctx: IRouterContext) => {
    const chats: Chat[] = this.chats

    ctx.body = {
      chats,
    }
  }

  show = async (ctx: IRouterContext) => {
    const chatId: number = parseInt(ctx.params.id)
    const chat: Chat = this.chats.find(chat => chat.id === chatId)

    if (!chat) {
      ctx.status = 404

      return (ctx.body = {
        error: 'Chat does not exist',
      })
    }

    ctx.body = {
      chat,
    }
  }

  create = async (ctx: IRouterContext) => {
    const chat: Chat = ctx.request.body
    chat.id = this.chats.length + 1

    this.chats = [...this.chats, chat]

    ctx.body = {
      chat,
    }
  }
}
