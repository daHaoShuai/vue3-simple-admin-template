// 组合函数 z 是数据的输入 x 是第一级函数处理 y 是最后函数处理
export const composeXYZ = (x: any) => (y: any) => (z: any) => y(x(z))
