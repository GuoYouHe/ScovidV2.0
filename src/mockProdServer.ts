import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

const modules: Record<string, any> = import.meta.glob("../mock/*.ts", {
  eager: true
});
const mockModules = [];

//利用Node起一个服务接受Http请求，在使用Mock.js生成假数据


Object.keys(modules).forEach(key => {
  mockModules.push(...modules[key].default);
});

export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
