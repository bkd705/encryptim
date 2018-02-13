import { IRouterContext } from 'koa-router'
import * as bcrypt from 'bcrypt'

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

    if (!user) {
      ctx.status = 404
      ctx.body = {
        error: 'User does not exist',
      }

      return
    }

    ctx.body = {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
    }
  }

  create = async (ctx: IRouterContext) => {
    const user: User = ctx.request.body
    const emailExists: boolean = this.users.some(u => u.email === user.email)
    const usernameExists: boolean = this.users.some(
      u => u.username === user.username
    )

    if (emailExists || usernameExists) {
      ctx.status = 422
      ctx.body = {
        error: emailExists
          ? 'User email already exists'
          : 'Username already exists',
      }

      return
    }

    user.id = this.users.length + 1

    try {
      user.password = await bcrypt.hash(user.password, 10)
    } catch (e) {
      ctx.status = 500

      return
    }

    this.users = [...this.users, user]

    ctx.body = {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
    }
  }

  update = async (ctx: IRouterContext) => {
    const userId: number = parseInt(ctx.params.id)
    const changes: any = ctx.request.body
    const userIndex: number = this.users.findIndex(user => user.id === userId)
    const user: User = this.users[userIndex]

    if (userIndex < 0) {
      ctx.status = 404
      ctx.body = {
        error: 'User does not exist',
      }

      return
    }
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
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
    }
  }

  delete = async (ctx: IRouterContext) => {
    const userId: number = parseInt(ctx.params.id)
    const userIndex: number = this.users.findIndex(user => user.id === userId)

    if (userIndex < 0) {
      ctx.status = 404
      ctx.body = {
        error: 'User does not exist',
      }

      return
    }

    this.users = [
      ...this.users.slice(0, userIndex),
      ...this.users.slice(userIndex + 1),
    ]

    ctx.status = 201
  }

  login = async (ctx: IRouterContext) => {
    const reqUser: any = ctx.request.body
    const user: User = this.users.find(user => user.email === reqUser.email)

    const isAuthenticated =
      user && (await bcrypt.compare(reqUser.password, user.password))

    if (!isAuthenticated) {
      ctx.status = 401
      ctx.body = {
        error: 'Invalid credentials',
      }

      return
    }

    ctx.status = 200
    ctx.body = {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
    }
  }
}
