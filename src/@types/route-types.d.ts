import { RouteConfig } from 'vue-router'

declare global {
    interface RouteConfUpdate extends RouteConfig {
      path: string, // 路由路径 必须
      name: string, // 路由名称 必须
      hidden?: boolean, // 默认false, 设为true 不会在侧边栏显示
      children?: RouteConfUpdate[], // 子路由
      meta: { // 自定义字段内容 因为title是必须的 所以这里也必须
        title: string, // 侧边栏显示的title
        icon?: string, // 侧边栏图标 设置了就显示 没设置就不显示
        activeMenu?: string, // 解决不能出现在侧边栏选项中页面导致高亮丢失问题
        permissions: string[] // 访问页面所需权限列表
      }
    }
}
