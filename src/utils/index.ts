// 数组求和函数
export const summary = (arr: number[], start: number = 0) => arr.reduce((total: number, num: number) => total + +num, start)
