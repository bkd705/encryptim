import { IRouterContext } from 'koa-router'

export class UserController {
  users: User[] = []

  index = async (ctx: IRouterContext) => {
    const users: User[] = this.users

    ctx.body = {
      users,
    }
  }

  show = async (ctx: IRouterContext) => {
    const userId: number = parseInt(ctx.params.id)
    const user: User = this.users.find(user => user.id === userId)

    ctx.body = {
      user,
    }
  }

  create = async (ctx: IRouterContext) => {
    const user: User = ctx.request.body
    user.id = this.users.length + 1

    this.users = [...this.users, user]

    ctx.body = {
      user,
    }
  }

  update = async (ctx: IRouterContext) => {
    const userId: number = parseInt(ctx.params.id)
    const changes = ctx.request.body
    const userIndex: number = this.users.findIndex(user => user.id === userId)
    const user: User = this.users[userIndex]

    if (userIndex < 0) return (ctx.status = 404)

    const updatedUser: User = {
      ...user,
      ...changes,
    }

    this.users = [
      ...this.users.slice(0, userIndex),
      updatedUser,
      ...this.users.slice(userIndex + 1),
    ]

    ctx.body = {
      user: updatedUser,
    }
  }

  delete = async (ctx: IRouterContext) => {
    const userId: number = parseInt(ctx.params.id)
    const userIndex: number = this.users.findIndex(user => user.id === userId)

    this.users = [
      ...this.users.slice(0, userIndex),
      ...this.users.slice(userIndex + 1),
    ]

    ctx.status = 201
  }
}
