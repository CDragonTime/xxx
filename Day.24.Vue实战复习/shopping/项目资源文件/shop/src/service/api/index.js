import ajax from './ajax'

export const getHomeData = ()=>ajax("http://localhost:3000/data");