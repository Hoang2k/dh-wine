import { Recordable } from "@/types/global.types"

/**
 * Convert a plain object to FormData.
 */
export const objToFormData = (obj: Recordable) => {
  const formData = new FormData()
  Object.keys(obj).forEach((key) => {
    formData.append(key, obj[key])
  })
  return formData
}
