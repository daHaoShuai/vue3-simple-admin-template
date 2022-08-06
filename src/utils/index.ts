// 组合函数 z 是数据的输入 x 是第一级函数处理 y 是最后函数处理
export const composeXYZ = (x: Function) => (y: Function) => (z: any) => y(x(z))

// 组合纯函数为高级函数,函数的输入是从后往前的
// const a = 'dasdsadas'
// const strToArr = (str: string): Array<string> => str.split('')
// const arrRemoveA = (arr: Array<string>): Array<string> => arr.filter(str => str !== 'a')
// const arrJoin = (arr: Array<string>): string => arr.join('')
// const all = compose(
//   arrJoin,
//   arrRemoveA,
//   strToArr
// )
// console.log(all(a));
export const compose = (...funs: Array<Function>) => {
  return (z: any) => funs.reduceRight((x, y) => y(x), z)
}
// 函数的输入是从前往后的
export const pipe = (...funs: Array<Function>) => {
  return (z: any) => funs.reduce((x, y) => y(x), z)
}
