import { config } from './config/db'

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
    },
  },
}
