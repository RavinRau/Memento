import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const isNil = <T>(value: T | null | undefined): value is null | undefined =>
  value === null || value === undefined

export const isNull = <T>(value: T | null): value is null => value === null

export const isUndefined = <T>(value: T | undefined): value is undefined => value === undefined

type ObjectType = { [key: string]: unknown }
export const isObjectEmpty = <T extends ObjectType>(value: T): boolean =>
  value && Object.keys(value).length === 0 && value.constructor === Object

export const isString = <T>(value: T): value is Extract<T, string> =>
  typeof value === 'string' || value instanceof String

export const isEmpty = <T extends ObjectType>(obj: T | null | undefined): boolean =>
  isNil(obj) || Object.keys(obj ?? {}).length === 0

export const isNotEmpty = <T extends string | number | boolean | ObjectType>(
  value: T | null | undefined
): boolean => {
  switch (typeof value) {
    case 'number':
    case 'boolean':
    case 'undefined':
      return !isNil(value)
    case 'object':
      return !isEmpty(value as ObjectType)
    case 'string':
      return Boolean((value as string)?.length)
    default:
      console.error('Invalid value')
      return false
  }
}
