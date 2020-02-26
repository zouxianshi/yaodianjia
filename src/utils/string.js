export const endWith = (str, reg) => {
  return new RegExp(reg + '$').test(str)
}
