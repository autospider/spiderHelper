# spiderHelper

## 概述

Freespider 配置模块辅助生成工具

### 环境

- Linux, Windows, macOS

### 运行方式
```shell
cd spiderHelper

npm install

npm run dev
```

### 配置字段说明
| 字段名 | 说明 | 选项 |默认值|
| :----: | :----: | :----: | :----: |
| actKey | 本次请求所响应数据类型 | dom, json, jsonp, text ||
| encoding | 本次请求所响应数据编码 |  ||
| isBatch | 批量处理 |  ||
| task | 列表,包含一组http请求项 |  ||
| task.0.skip |  |  | |
| task.0.local|  |  | |
| task.0.req| 参考aiohttp.ClientSession().request |  | |
| task.0.inherit| 需向下传递的数据 |  | |
| task.0.res| 需向下传递的数据 |  | |
| taskName | 任务名称| | |
| taskKey | 任务ID| | |
| encoding | 网站默认编码| | UTF-8|
| resourceKey | 资源ID| | |
| resource | 资源类型| proxy, session| |
| carrier | 信息载体| webpage，app，wechat| webpage|
| weight | 下载器权重| | 1000|
| concurrency | 下载器并发量,不能为0,-1为不限| | -1|
| interval | 调度间隔| | |
| taskGroup | 任务组| | |
| inherit | 需向下传递的数据| | |
| req | 入口请求任务| | |
| req.dataType | 本次请求所响应数据类型| dom, json, jsonp| dom|
| req.encoding | 本次请求所响应数据编码| | UTF-8|
| req.unique | 地址是否过滤| true, false| false|
| req.url | 请求网址| | |
| req.method | | get, post| get|
| req.headers | | | |
| req.cookies | | | |
| req.body | | | |
| req.skip | 是否跳过请求| true, false| false|
| parser | 解析器| | |
| parser.name | 字段名| | |
| parser.parseType | 解析方式| xpath,json,re,str,value,any| any|
| parser.target | 解析数据目标| parameter,res,inherit,prev| parameter|
| parser.rule | 解析规则| | |
| parser.out | 输出类型转换| url,html,dom,range,datetime,list,any| any|
| parser.next | 二次解析| | |
| sender | 分发器| | |
| sender.type | 分发类型| req,store,store-article| |
| sender.target | 分发目标| | |
| flag | 任务状| 0: 正| |

### 许可协议
该项目在 MIT 许可下获得许可 - 请参阅[LICENSE](https://github.com/autospider/spiderHelper/blob/main/LICENSE) 文件了解详细信息

### 贡献
欢迎投稿！
### 交流反馈
暂无 
