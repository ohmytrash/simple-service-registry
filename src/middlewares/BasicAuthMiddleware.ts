import { NextFunction, Request, Response } from 'express'
import auth, { BasicAuthResult } from 'basic-auth'
import compare from 'tsscmp'
import ca from '@/shared/catchAsync'
import ApiError from '@/shared/ApiError'
import config from '@/config/config'

class BasicAuthMiddleware {
  req: Request
  credential?: BasicAuthResult
  next: NextFunction

  constructor(req: Request, next: NextFunction) {
    this.req = req
    this.credential = auth(this.req)
    this.next = next
  }

  checkCredential(): void {
    if (this.credential && compare(this.credential.name, config.basicAuth.name) && compare(this.credential.pass, config.basicAuth.pass)) {
      return this.next()
    }
    this.next(new ApiError(401, 'Invalid credentials.'))
  }
}

export function basicAuth(): (req: Request, res: Response, next: NextFunction) => void {
  return ca((req, res, next) => {
    const basicAuth = new BasicAuthMiddleware(req, next)
    basicAuth.checkCredential()
  })
}
