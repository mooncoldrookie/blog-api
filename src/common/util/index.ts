import { Request } from 'express'
import { compareSync, genSaltSync, hashSync } from 'bcrypt'
import { customAlphabet, nanoid } from 'nanoid'

export function isDev() {
  return process.env.NODE_ENV !== 'production'
}

/**
 * 判断传入的用户角色数组是否符合命名规则
 * 只能是 admin, user, tourist 中的一个
 */
export function checkRole(role: string) {
  const defaultRoles = ['admin', 'user', 'tourist']
  return defaultRoles.includes(role)
}

/**
 * 获取请求IP
 */
export function getReqIP(req: Request): string {
  return (
    // 判断是否有反向代理 IP
    (
      (req.headers['x-forwarded-for'] as string) ||
      // 判断后端的 socket 的 IP
      req.socket.remoteAddress
    ).replace('::ffff:', '')
  )
}

/**
 * 明文加密
 * @param source
 */
export function encrypt(source: string): string {
  const salt = genSaltSync(10)
  return hashSync(source, salt)
}

/**
 * 比较密码
 * @param plain 普通密码
 * @param hash 加密后的密码
 */
export function compare(plain: string, hash: string) {
  return compareSync(plain, hash)
}

/**
 * 生成一个UUID
 */
export function generateUUID(): string {
  return nanoid()
}

/**
 * 生成一个随机的值
 */
export function generateRandomValue(
  length: number,
  placeholder = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
): string {
  const customNanoid = customAlphabet(placeholder, length)
  return customNanoid()
}
