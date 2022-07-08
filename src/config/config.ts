import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '../../.env') })

const config = {
  port: Number(process.env.PORT),
  host: process.env.HOST,

  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',

  basicAuth: {
    name: String(process.env.BASIC_AUTH_USERNAME),
    pass: String(process.env.BASIC_AUTH_PASSWORD),
  },
}

export default config
