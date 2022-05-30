<template>
  <div>
    <!--    <div>-->
    <!--      <el-row :gutter="20">-->
    <!--        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
    <!--        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
    <!--        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->

    <!--      </el-row>-->
    <!--    </div>-->
    <div
      style="
    margin-left: 16px;margin-right: 10px"
    >
      <div style="float:left;margin:10px 52px 50px 0px">
        项目名称
        <el-select v-model="value1" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        爬虫id
        <el-input v-model="crawlerId" placeholder="爬虫id" style="width: 200px" clearable suffix-icon="el-icon-search" />
        <el-button type="primary" icon="el-icon-search" @click="searchSpider()">查询</el-button>
        <el-button type="success" icon="el-icon-plus" @click="addSpider">添加爬虫</el-button>
      </div>
      <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%" :cell-style="cellStyle" @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column fixed prop="index" label="序号" align="center" />
        <el-table-column prop="taskName" label="项目名称" align="center" />
        <el-table-column prop="role" label="Role"  align="center" />
        <el-table-column prop="taskKey" label="爬虫id"  align="center" />
        <el-table-column prop="spiderName" label="爬虫名称"  align="center" />
        <el-table-column prop="url" label="采集链接"  align="center" />
<!--        <el-table-column prop="encode" label="编码" align="center" />-->
<!--        <el-table-column prop="resource" label="resource" align="center" />-->
<!--        <el-table-column prop="parameter" label="parameter"  align="center" />-->
<!--        <el-table-column prop="dataType" label="dataType" align="center" />-->
        <el-table-column label="操作" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="detail({'title':'详情','row':scope.row})">
              查看
            </el-button>
            <el-divider direction="vertical" />
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <a @click="jumpNewPage({path:'/tinymce/spiderTest',data:scope.row,name:'添加配置'})" v-if="checkPermission(['admin'])">新增配置</a>
                  <a @click="jumpNewPage({path:'/permission/page',data:scope.row,name:'PagePermission'})" v-if="checkPermission(['editor'])">新增配置</a>
                </el-dropdown-item>
                <!--                <el-dropdown-item><a @click="$router.push('/tinymce/spiderTest')">新增配置</a></el-dropdown-item>-->
                <el-dropdown-item :command="{'title':'编辑','row':scope.row}">编辑</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :before-close="handleClose">
        <el-form :label-position="labelPosition" label-width="100px" :model="spiderForm">
          <el-form-item label="序号">
            <el-input v-model="spiderForm.index" />
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="spiderForm.taskName" />
          </el-form-item>
          <el-form-item label="Role">
            <el-input v-model="spiderForm.role" />
          </el-form-item>
          <el-form-item label="爬虫id">
            <el-input v-model="spiderForm.taskKey" />
          </el-form-item>
          <el-form-item label="爬虫名称">
            <el-input v-model="spiderForm.spiderName" />
          </el-form-item>
          <el-form-item label="采集链接">
            <!--          设置宽度填满-->
            <el-input v-model="spiderForm.url" />
          </el-form-item>
<!--          <el-form-item label="resource">-->
<!--            <el-input v-model="spiderForm.resource" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="encode">-->
<!--            <el-input v-model="spiderForm.encode" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="parameter">-->
<!--            <el-input v-model="spiderForm.parameter" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="dataType">-->
<!--            <el-input v-model="spiderForm.dataType" />-->
<!--          </el-form-item>-->

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button v-if="dialogTitle=='编辑'" type="primary" @click="dialogVisible=false">保存</el-button>
          <el-button v-if="dialogTitle=='添加爬虫'" type="primary" @click="dialogVisible=false">添加</el-button>
        </span>
      </el-dialog>
    </div>
    <div
      class="block"
      style="
    border-top-width: 30px;
    padding-bottom: 0px;
    margin-top: 30px;
    margin-left: 400px;
"
    >
      <el-pagination
        background
        layout="prev, pager, next"
        :total="50"
      />
    </div>

  </div>

</template>
<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 12px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
<script>

// import { getTask } from '@/api/role'
import { getSpider } from '../../api/role'
import checkPermission from "../../utils/permission";
import store from '@/store'
import {tableData} from "../custom-table-input/demo";
export default {
  data() {
    return {
      roleName:store.getters.roles[0],

      labelPosition: 'left',
      operationType: 0,
      dialogTitle: '',
      dialogVisible: false,
      spiderForm: {
      },
      crawlerId: '',
      tableData: [],
      multipleSelection: []

    }
  },
  // mounted() {
  //   document.title = '患者信息列表'
  // },
  created() {
    // this.getSpider()
    this.getData()
    // this.dataSource = rolesList
  },
  methods: {
    searchSpider(){console.log('传进来的是',this.$route)},
    checkPermission,
    async getData() {
      const res = await getSpider()
      // console.log(res)
      this.tableData = res.data
      let newTable = []
      for (let i = 0; i <this.tableData.length ; i++) {
        if(this.tableData[i]['taskName']==this.$route.params.taskName){
          newTable.push(this.tableData[i])
        }
        // else{
        //   this.tableData[i]['role'] = this.roleName
        // }
      }
      if (newTable.length>0){
        this.tableData = newTable
      }
      this.tableData[i]['role'] = this.roleName

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    jumpNewPage(routeData) {
      // const dataObj = data
      // console.log(data)
      // this.$router.push({ name: '添加配置', aaaaa: { id: 'aaaaaaaaaaaaaaaaa' }})
      this.$router.push({
        // name: '添加配置',
        // path: '/permission/page',
        // path: '/tinymce/spiderTest',
        path:routeData.path,
        name: routeData.name,
        // query: data,
        params:routeData.data
      })
    },
    handleCommand(command) {
      // this.$message('click on item ' + command)
      this.detail(command)
    },
    detail(spiderForm) {
      this.dialogTitle = spiderForm.title
      // console.log(this.dialogTitle)
      this.spiderForm = spiderForm.row
      // console.log(spiderForm)
      this.dialogVisible = true
      // console.log('现在', this.dialogVisible)
    },
    addSpider() {
      // console.log('表单源数据',this.tableData)
      for (let i = 0; i <this.tableData.length ; i++) {
        // if (tableData[i]["taskKey"]==this.route().params.taskName){
          console.log(this.tableData[i]['taskName']==this.$route.params.taskName)
        // }
      }
      this.spiderForm= {
      }
      this.dialogVisible = true
      this.dialogTitle = '添加爬虫'
      // console.log(this.tableData)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    addConfig() {
      // this.$router.push("/about");
      this.$router.push('/addConfig')
    }

  }
}
</script>
