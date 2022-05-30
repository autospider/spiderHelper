const Mock = require('mockjs')
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('./routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])
const spiderList = [
  { index: '1',
    taskName: 'news',
    role: 'admin',
    taskKey: 'med.wanfangdata.com.cn',
    url: 'http://wanfangdata/getTask',
    encode: 'utf8',
    resource: 'false',
    parameter: 'null',
    dataType: 'json',
    spiderName: '万方文献'
  },
  { index: '3',
    taskName: 'project',
    role: 'admin',
    taskKey: 'med.weipu.com',
    encode: 'gbk',
    url: 'http://www.weipu.com',
    resource: 'true',
    resourceId: 'hhhh',
    parameter: 'null',
    dataType: 'dom',
    spiderName: '维普文献'
  }
]
const taskList = [
  {
    key: 1,
    taskName: 'recruit',
    desc: 'recruit',
    taskKey: 'recruit.jobuy.com',
    resourceKey: 'jobuy.com',
    crawlerNo: 5,
    createTime: '2022-03-21 25:10:00'
  },
  {
    key: 2,
    taskName: 'news',
    desc: 'news',
    taskKey: 'recruit.jobuy.com',
    crawlerNo: 40,
    resourceKey: 'jobuy.com',
    createTime: '2022-03-22 12:22:05'
  },
  {
    key: 3,
    taskName: 'project',
    taskKey: 'recruit.jobuy.com',
    resourceKey: 'jobuy.com',
    crawlerNo: 9,
    desc: 'project',
    createTime: '2022-03-22 12:22:05'
  }
  // {
  //   key: 3,
  //   taskName: 'project',
  //   url: 'url',
  //   resource: 'true',
  //   crawlerNo: 9,
  //   desc: 'project',
  //   createTime: '2022-03-22 12:22:05'
  // }
  // {
  //   key: 5,
  //   name: '数据分析项目04',
  //   desc: '数据分析项目是一个xxxx项目',
  //   createTime: '2022-03-22 12:22:05'
  // }
]

const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]

module.exports = [
  // mock get all routes form server
  {
    url: '/vue-element-admin/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/vue-element-admin/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/vue-element-admin/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  {
    url: '/vue-element-admin/task',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: taskList
      }
    }
  },
  {
    url: '/vue-element-admin/spider',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: spiderList
      }
    }
  }
]
