export class AppResponse {
  readonly success: boolean
  readonly code: number
  readonly data: any
  readonly msg: string

  constructor(success: boolean, code: number, data?: any, msg = 'success') {
    this.success = success
    this.code = code
    this.data = data
    this.msg = msg
  }

  public static OK(data?: any) {
    return new AppResponse(true, 200, data)
  }
}

export class PageResult<T> {
  list: T[]
  total: number
  // 当前页码
  page: number
  // 每页大小
  size: number
}
