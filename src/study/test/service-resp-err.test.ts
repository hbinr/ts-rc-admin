export class ResponseError extends Error {
  constructor(public message: string, public statusCode = 403, public errorCode = 403, public extra = {}) {
    super(message)
  }
}

export class ServiceError extends Error {
  constructor(public code: number, public message: string = '') {
    super(message)
  }
}


let respErr = new ResponseError(JSON.stringify({
  msg: 'message',
  detail: 'e',
}), 500, 500)

console.log('respErr: ', JSON.stringify(respErr));  // respErr:  {"statusCode":500,"errorCode":500,"extra":{}}

let serviceErr = new ServiceError(403, 'this collection page can not find')
console.log('serviceErr: ', JSON.stringify(serviceErr)); // serviceErr:  {"code":403}