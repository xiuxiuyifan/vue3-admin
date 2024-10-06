/**
 *
 * @param path 校验是不是外部路径
 * @returns
 */
export const isExternal = (path: string): boolean => {
  return /^(https?)/.test(path)
}
