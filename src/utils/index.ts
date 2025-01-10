/**
 * @name clearEmptyFields
 * @description 递归清除对象及其嵌套对象中的空字段（值为 null 或 undefined 或 NaN）
 * @param {T} obj 需要清理的对象
 * @returns {Partial<T>} 清理后的对象
 */

export const clearEmptyFields = <T extends Record<string, any>>(obj: T): Partial<T> => {
  if (!obj || typeof obj !== 'object') return obj

  const acc: Partial<T> = {}
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue
    const value = obj[key]
    if (value !== null && value !== undefined && !Number.isNaN(value)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        const cleaned = clearEmptyFields(value) as T[Extract<keyof T, string>] & object
        if (Object.keys(cleaned).length) {
          acc[key] = cleaned as T[Extract<keyof T, string>]
        }
      } else {
        acc[key] = value
      }
    }
  }
  return acc
}
