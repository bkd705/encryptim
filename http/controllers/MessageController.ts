import { IRouterContext } from 'koa-router'

export class MessageController {
  messages: Message[] = []

  index = async (ctx: IRouterContext) => {
    const messages: Message[] = this.messages

    ctx.body = {
      messages,
    }
  }

  show = async (ctx: IRouterContext) => {
    const messageId: number = parseInt(ctx.params.id)
    const message: Message = this.messages.find(
      message => message.id === messageId
    )

    if (!message) {
      ctx.status = 404

      return (ctx.body = {
        error: 'Message does not exist',
      })
    }

    ctx.body = {
      message,
    }
  }

  create = async (ctx: IRouterContext) => {
    const message: Message = ctx.request.body
    message.id = this.messages.length + 1

    this.messages = [...this.messages, message]

    ctx.body = {
      message,
    }
  }

  delete = async (ctx: IRouterContext) => {
    const messageId: number = parseInt(ctx.params.id)
    const messageIndex: number = this.messages.findIndex(
      message => message.id === messageId
    )

    if (messageIndex < 0) {
      ctx.status = 404

      return (ctx.body = {
        error: 'Message does not exist',
      })
    }

    this.messages = [
      ...this.messages.slice(0, messageIndex),
      ...this.messages.slice(messageIndex + 1),
    ]

    ctx.status = 201
  }
}
