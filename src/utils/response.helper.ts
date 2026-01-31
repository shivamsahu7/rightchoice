import { StatusCodes } from 'http-status-codes'
import { SuccessMessages, ErrorMessages } from '../common/messages'

interface ResponseContext {
  set: {
    status?: number | string
    [key: string]: any
  }
}

interface ResponseData {
  status: boolean
  message: string
  data?: any
}

export function sendResponse(
  ctx: ResponseContext,
  statusCode: number,
  status: boolean,
  message: string,
  data: any = {}
): ResponseData {
  ctx.set.status = statusCode
  
  return {
    status,
    message,
    data,
  }
}

export function sendSuccess(
  ctx: ResponseContext,
  message: string = SuccessMessages.REQUEST_SUCCESSFUL,
  data: any = {},
  statusCode: number = StatusCodes.OK
): ResponseData {
  return sendResponse(ctx, statusCode, true, message, data)
}

export function sendError(
  ctx: ResponseContext,
  message: string = ErrorMessages.SERVER_ERROR,
  data: any = {},
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
): ResponseData {
  return sendResponse(ctx, statusCode, false, message, data)
}
