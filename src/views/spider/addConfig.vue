<template>
  <div
    style="
    margin-left: 16px;margin-right: 10px"
  >
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="爬虫入口" name="first">
        <h2 style="margin:0;text-align:center;">Entrance</h2>
        <div v-for="tableDataItem in entranceData" :key="tableDataItem.key" style="margin-top:5px;margin-bottom:15px">
          <el-table :data="tableDataItem.tableData" border>
<!--            <el-table-column-->
<!--              type="index"-->
<!--              width="50">-->
<!--            </el-table-column>)-->
<!--            <el-table-column prop="option" label="">-->
<!--              <template slot-scope="scope">-->
<!--                <el-button type="primary" icon="el-icon-minus" circle-->
<!--                           @click="subColumnSender(tableDataItem.key,scope.row.id)"/>-->
<!--                <el-button type="primary" icon="el-icon-plus" circle @click="addColumnSender(tableDataItem.key)"/>-->
<!--              </template>-->
<!--            </el-table-column>-->
            <el-table-column prop="children" type="expand">
              <template slot-scope="slots">
<!--                <el-button type="primary" icon="el-icon-plus" circle @click="testEntranceColum(slots.row)"/>-->

                <el-table :data="slots.row.children" style="width: 100%" v-if="slots.row.attribute.value=='inherit'" :header-cell-style="{background:'#ECF1FE'}" border>
                  <el-table-column prop="option" label="操作">
                    <template slot-scope="scopeInner">
                      <el-button type="primary" icon="el-icon-minus" circle
                                 @click="subInherit({key:tableDataItem.key,currentRow:scopeInner.row,slots:entranceData,row:'inherit'})"/>
                      <el-button type="primary" icon="el-icon-plus" circle @click="addInherit({key:tableDataItem.key,row:'inherit'})"/>
                    </template>
                  </el-table-column>
                  <el-table-column  v-for="item in entranceInnerHead" :key="item.key" :prop="item.prop" :label="item.label">
                    <template slot-scope="scope4">
                      <el-input  v-show="scope4.row[item.prop].edit" v-model="scope4.row[item.prop].value"
                                placeholder="请输入内容" @blur="blueHandler(scope4.row[item.prop])"/>
                      <span  v-show="!scope4.row[item.prop].edit">{{ scope4.row[item.prop].value }}</span>
                      <i  v-show="!scope4.row[item.prop].edit" style="margin-left:10px" class="el-icon-edit"
                         @click="editHandle(scope4.row[item.prop])"/>
                      <!--                  <i v-show="false" style="margin-left:10px" class="el-icon-edit" @click="editHandle(scope.row[item.prop])" v-if="item.prop=='parseType'" />-->
                    </template>
                  </el-table-column>
<!--                  <el-table-column-->
<!--                    width="50"-->
<!--                    show-overflow-tooltip-->
<!--                  />-->
<!--                  <el-table-column label="key" prop="attrStr" />-->
<!--                  <el-table-column label="value" prop="valueStr" />-->
                </el-table>
                <el-table :data="slots.row.task" style="width: 100%" v-if="slots.row.attribute.value=='task'" :header-cell-style="{background:'#ECF1FE'}" border>
                  <el-table-column prop="option" label="操作">
                    <template slot-scope="scopeTask">
                      <el-button type="primary" icon="el-icon-minus" circle
                                 @click="subInherit({key:tableDataItem.key,currentRow:scopeTask.row,slots:entranceData,row:'task'})"/>
                      <el-button type="primary" icon="el-icon-plus" circle @click="addInherit({key:tableDataItem.key,row:'task'})"/>
                    </template>
                  </el-table-column>
                  <el-table-column  v-for="item in entranceTaskHead" :key="item.key" :prop="item.prop" :label="item.label">
                    <template slot-scope="scopeInner">
                      <el-select v-model="scopeInner.row[item.prop].value" placeholder="请选择"
                                 v-if="item.prop=='method'">
                        <el-option
                          v-for="it in scopeInner.row[item.prop].key"
                          :key="it.value"
                          :label="it.label"
                          :value="it.label">
                        </el-option>
                      </el-select>

                      <el-input v-else v-show="scopeInner.row[item.prop].edit" v-model="scopeInner.row[item.prop].value"
                                placeholder="请输入内容" @blur="blueHandler(scopeInner.row[item.prop])"/>
                      <span v-if="item.prop!='method'" v-show="!scopeInner.row[item.prop].edit">{{ scopeInner.row[item.prop].value }}</span>
                      <i  v-if="item.prop!='method'" v-show="!scopeInner.row[item.prop].edit" style="margin-left:10px" class="el-icon-edit"
                         @click="editHandle(scopeInner.row[item.prop])"/>
                      <!--                  <i v-show="false" style="margin-left:10px" class="el-icon-edit" @click="editHandle(scope.row[item.prop])" v-if="item.prop=='parseType'" />-->
                    </template>
                  </el-table-column>
                  <!--                  <el-table-column-->
                  <!--                    width="50"-->
                  <!--                    show-overflow-tooltip-->
                  <!--                  />-->
                  <!--                  <el-table-column label="key" prop="attrStr" />-->
                  <!--                  <el-table-column label="value" prop="valueStr" />-->
                </el-table>

              </template>
            </el-table-column>

            <el-table-column v-for="item in entranceHeader" :key="item.key" :prop="item.prop" :label="item.label">
              <template  slot-scope="scope">

                <el-select v-model="scope.row[item.prop].value" placeholder="请选择"
                           v-if="(scope.row.attribute.value=='encoding' && item.prop=='value')||(scope.row.attribute.value=='dataType' && item.prop=='value')">
                  <el-option
                    v-for="it in scope.row['attribute'].key"
                    :key="it.value"
                    :label="it.label"
                    :value="it.label">
                  </el-option>
                </el-select>

                <el-input v-show="scope.row[item.prop].edit" v-model="scope.row[item.prop].value"
                          placeholder="请输入内容" @blur="blueHandler(scope.row[item.prop])"/>
                <span v-if="item.prop=='attribute'"  v-show="!scope.row[item.prop].edit" >{{ scope.row[item.prop].value }}</span>
<!--                <i  v-if="(item.prop=='value'&& scope.row.attribute.value!='encoding')&& (item.prop=='value'&& scope.row.attribute.value!='dataType')" v-show="!scope.row[item.prop].edit" style="margin-left:10px" class="el-icon-edit"-->
<!--                   @click="editHandle(scope.row[item.prop])"/>-->
              </template>
            </el-table-column>
<!--            <el-table-column prop="option" label="操作">-->
<!--              <template slot-scope="scope">-->
<!--                <el-button type="text" size="small" @click="addColumnEntrance(tableDataItem.key)">Add</el-button>-->
<!--                <el-button v-if="scope.row.edit" type="text" size="small" @click="">取消编辑-->
<!--                </el-button>-->
<!--                <el-button v-else type="text" size="small" @click="subColumnEntrance(tableDataItem.key,scope.row.id)">Del</el-button>-->
<!--              </template>-->
<!--            </el-table-column>-->
          </el-table>
        </div>
<!--        <el-table-->
<!--          :data="entrance"-->
<!--          border-->
<!--          style="width: 100%;margin-top:10px"-->
<!--          :row-class-name="tableRowClassName"-->
<!--          @header-contextmenu="(column, event) => rightClick(null, column, event)"-->
<!--          @row-contextmenu="rightClick"-->
<!--        >-->
<!--          <el-table-column v-if="enolumnList.length > 0" type="index" label="编号" :width="50" />-->
<!--          <el-table-column v-for="(col, idx) in enolumnList" :key="col.prop" :index="idx">-->
<!--            &lt;!&ndash; 自定义表头的内容 &ndash;&gt;-->
<!--            <template #header>-->
<!--              <p v-show="col.show" @dblclick="col.show = false" style="padding: 0px 15px">-->
<!--                {{ col.label }}-->
<!--              </p>-->
<!--              <el-input-->
<!--                v-show="!col.show"-->
<!--                v-model="col.label"-->
<!--                size="mini"-->
<!--                @blur="col.show=true"-->
<!--              />-->
<!--            </template>-->
<!--            &lt;!&ndash; 自定义列的内容&ndash;&gt;-->
<!--            <template #default="scope">-->
<!--              <p v-if="col.prop=='name'" style="padding: 0px 15px">-->
<!--                {{ scope.row[col.prop].content }}-->
<!--              </p>-->
<!--              <p v-else-if="scope.row.row_index==1 ||scope.row.row_index==3||scope.row.row_index==4">-->
<!--              </p>-->
<!--              <p v-else v-show="scope.row[col.prop].show" @dblclick="scope.row[col.prop].show = false" style="padding: 0px 15px">-->
<!--                {{ scope.row[col.prop].content }}-->
<!--                <i class="el-icon-edit-outline" @click="scope.row[col.prop].show=false" />-->
<!--                &lt;!&ndash;                <i class="el-icon-edit-outline" @click="scope.row[col.prop].show=false" />&ndash;&gt;-->
<!--              </p>-->
<!--              <el-select  v-show="scope.row[col.prop].show" v-if="(scope.row.row_index==1 && idx == 1)" v-model="scope.row[col.prop].content" placeholder="请选择">-->
<!--                <el-option-->
<!--                  v-for="item in mothodOps"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.label"-->
<!--                >-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--              <el-select  v-show="scope.row[col.prop].show" v-else-if="(scope.row.row_index==3 && idx == 1)" v-model="scope.row[col.prop].content" placeholder="请选择">-->
<!--                <el-option-->
<!--                  v-for="item in encodeOps"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.label"-->
<!--                >-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--              <el-select  v-show="scope.row[col.prop].show" v-else-if="(scope.row.row_index==4 && idx == 1)" v-model="scope.row[col.prop].content" placeholder="请选择">-->
<!--                <el-option-->
<!--                  v-for="item in dateTypeOps"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.label"-->
<!--                >-->
<!--                </el-option>-->
<!--              </el-select>-->

<!--              <el-input-->
<!--                v-show="!scope.row[col.prop].show"-->
<!--                v-model="scope.row[col.prop].content"-->
<!--                type="textarea"-->
<!--                :autosize="{ minRows: 2, maxRows: 4 }"-->
<!--                @blur="scope.row[col.prop].show = true"-->
<!--              />-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
        <div style="
    margin-top: 20px;
">
          <el-button type="primary" size="small" @click="getConfigFile()">下载配置文件</el-button>

        </div>
      </el-tab-pane>
      <el-tab-pane label="解析器" name="second">
        <div style="margin:20px">
          <h2 style="margin:0;text-align:center;">Parser</h2>
          <el-button type="primary" style="margin-bottom:10px" icon="el-icon-plus" @click="addTable">AddStep</el-button>
          <el-button type="danger" style="margin-bottom:10px" icon="el-icon-delete" @click="delTable">DelStep
          </el-button>
          <div v-for="tableDataItem in tableDatas" :key="tableDataItem.key" style="margin-top:5px;margin-bottom:15px">
            <div class="inputDeep" style="width: 165px">
              <el-input
                v-model="tableDataItem.name"
                placeholder="stepName"
                clearable
              >
                <i
                  slot="suffix"
                  class="el-icon-edit el-input__icon"
                />
              </el-input>
            </div>
            <el-table :data="tableDataItem.tableData" :header-cell-style="{background:'#ECF1FE'}" border>

              <el-table-column prop="children" type="expand">
                <template slot-scope="slots" >
                  <div class="innerTable" >
                    <el-table :data="slots.row.children" border :header-cell-style="{background:'#ECF1FE'}">
                      <div>
                        <el-table-column prop="children" type="expand">
                          <template slot-scope="slots2" >
                            <div class="innerTable" >
                              <el-table :data="slots2.row.children" border :header-cell-style="{background:'#ECF1FE'}">
                                <div>
                                  <el-table-column prop="children" type="expand">
                                    <template slot-scope="slots3" >
                                      <div class="innerTable" >
                                        <el-table :data="slots3.row.children" border :header-cell-style="{background:'#ECF1FE'}">
                                          <div>
                                            <el-table-column prop="children" type="expand">
                                              <template slot-scope="slots4" >
                                                <div class="innerTable" >
                                                  <el-table :data="slots4.row.children" border :header-cell-style="{background:'#ECF1FE'}">

                                                    <el-table-column
                                                      type="selection"
                                                      width="50"
                                                      show-overflow-tooltip
                                                    />
                                                    <el-table-column v-for="item in tableHeader" :key="item.key" :prop="item.prop" :label="item.label">
                                                      <template slot-scope="scope4">
                                                        <el-select v-model="scope4.row[item.prop].value" placeholder="请选择"
                                                                   v-if="item.prop=='parseType' || item.prop=='out'|| item.prop=='next'|| item.prop=='fetchall'|| item.prop=='target'">
                                                          <el-option
                                                            v-for="it in scope4.row[item.prop].key"
                                                            :key="it.value"
                                                            :label="it.label"
                                                            :value="it.label">
                                                          </el-option>
                                                        </el-select>
                                                        <el-input v-else v-show="scope4.row[item.prop].edit" v-model="scope4.row[item.prop].value"
                                                                  placeholder="请输入内容" @blur="blueHandler(scope4.row[item.prop])"/>
                                                        <span v-show="!scope4.row[item.prop].edit" v-if="item.prop!='parseType' && item.prop!='out'&& item.prop!='next'&& item.prop!='fetchall'&& item.prop!='target'">{{ scope4.row[item.prop].value }}</span>
                                                        <i v-show="!scope4.row[item.prop].edit" style="margin-left:10px" class="el-icon-edit"
                                                           @click="editHandle(scope4.row[item.prop])" v-if="item.prop!='parseType' && item.prop!='out'&& item.prop!='next'&& item.prop!='fetchall'&& item.prop!='target'"/>
                                                        <!--                  <i v-show="false" style="margin-left:10px" class="el-icon-edit" @click="editHandle(scope.row[item.prop])" v-if="item.prop=='parseType'" />-->
                                                      </template>
                                                    </el-table-column>
                                                    <el-table-column prop="option" label="操作">
                                                      <template slot-scope="scope4In">
                                                        <el-button type="text" size="small" @click="delNextFifth({tableDataRow:slots.row,data2:slots2.row,data3:slots3.row,data4:slots4.row,currentRow:scope4In.row,key:tableDataItem.key})">删除</el-button>

                                                      </template>
                                                    </el-table-column>

                                                  </el-table>

                                                </div>
                                              </template>
                                            </el-table-column>
                                          </div>
                                          <el-table-column
                                            type="selection"
                                            width="50"
                                            show-overflow-tooltip
                                          />
                                          <el-table-column v-for="item in tableHeader" :key="item.key" :prop="item.prop" :label="item.label">
                                            <template slot-scope="scope3">
                                              <el-select v-model="scope3.row[item.prop].value" placeholder="请选择"
                                                         v-if="item.prop=='parseType' || item.prop=='out'|| item.prop=='next'|| item.prop=='fetchall'|| item.prop=='target'">
                                                <el-option
                                                  v-for="it in scope3.row[item.prop].key"
                                                  :key="it.value"
                                                  :label="it.label"
                                                  :value="it.label">
                                                </el-option>
                                              </el-select>
                                              <el-input v-else v-show="scope3.row[item.prop].edit" v-model="scope3.row[item.prop].value"
                                                        placeholder="请输入内容" @blur="blueHandler(scope3.row[item.prop])"/>
                                              <span v-show="!scope3.row[item.prop].edit" v-if="item.prop!='parseType' && item.prop!='out'&& item.prop!='next'&& item.prop!='fetchall'&& item.prop!='target'">{{ scope3.row[item.prop].value }}</span>
                                              <i v-show="!scope3.row[item.prop].edit" style="margin-left:10px" class="el-icon-edit"
                                                 @click="editHandle(scope3.row[item.prop])" v-if="item.prop!='parseType' && item.prop!='out'&& item.prop!='next'&& item.prop!='fetchall'&& item.prop!='target'"/>
                                              <!--                  <i v-show="false" style="margin-left:10px" class="el-icon-edit" @click="editHandle(scope.row[item.prop])" v-if="item.prop=='parseType'" />-->
                                            </template>
                                          </el-table-column>
                                          <el-table-column prop="option" label="操作">
                                            <template slot-scope="scope3In">
                                              <el-dropdown @command="handleCommand">
                                              <span class="el-dropdown-link">
                                                更多<i class="el-icon-arrow-down el-icon--right"/>
                                              </span>
                                                <el-dropdown-menu slot="dropdown">

                                                  <!--                <el-dropdown-item><a @click="$router.push('/tinymce/spiderTest')">新增配置</a></el-dropdown-item>-->
                                                  <el-dropdown-item>
                                                    <a @click="delnextFourth({tableDataRow:slots.row,data2:slots2.row,data3:slots3.row,currentRow:scope3In.row,key:tableDataItem.key})">删除</a>

                                                  </el-dropdown-item>
                                                  <el-dropdown-item>
                                                    <a @click="addNextFourTh({tableDataRow:slots.row,data2:slots2.row,data3:slots3.row,currentRow:scope3In.row,key:tableDataItem.key})">下一步</a>

                                                  </el-dropdown-item>
                                                </el-dropdown-menu>
                                              </el-dropdown>


                                            </template>
                                          </el-table-column>

                                        </el-table>

                                      </div>
                                    </template>
                                  </el-table-column>
                                </div>
                                <el-table-column
                                  type="selection"
                                  width="50"
                                  show-overflow-tooltip
                                />
                                <el-table-column v-for="item in tableHeader" :key="item.key" :prop="item.prop" :label="item.label">
                                  <template slot-scope="scope2">
                                    <el-select v-model="scope2.row[item.prop].value" placeholder="请选择"
                                               v-if="item.prop=='parseType' || item.prop=='out'|| item.prop=='next'|| item.prop=='fetchall'|| item.prop=='target'">
                                      <el-option
                                        v-for="it in scope2.row[item.prop].key"
                                        :key="it.value"
                                        :label="it.label"
                                        :value="it.label">
                                      </el-option>
                                    </el-select>
                                    <el-input v-else v-show="scope2.row[item.prop].edit" v-model="scope2.row[item.prop].value"
                                              placeholder="请输入内容" @blur="blueHandler(scope2.row[item.prop])"/>
                                    <span v-show="!scope2.row[item.prop].edit" v-if="item.prop!='parseType' && item.prop!='out'&& item.prop!='next'&& item.prop!='fetchall'&& item.prop!='target'">{{ scope2.row[item.prop].value }}</span>
<!--                                    <el-button>默认按钮</el-button>-->
                                    <i v-show="!scope2.row[item.prop].edit" style="margin-left:10px" class="el-icon-edit"
                                       @click="editHandle(scope2.row[item.prop])" v-if="item.prop!='parseType' && item.prop!='out'&& item.prop!='next'&& item.prop!='fetchall'&& item.prop!='target'"/>
<!--                                                      <i v-show="false" style="margin-left:10px" class="el-icon-edit" @click="editHandle(scope.row[item.prop])" v-if="item.prop=='parseType'" />-->
                                  </template>

                                </el-table-column>
                                <el-table-column prop="option" label="操作">
                                  <template slot-scope="scopeIn">
                                    <el-dropdown @command="handleCommand">
                                    <span class="el-dropdown-link">
                                      更多<i class="el-icon-arrow-down el-icon--right"/>
                                    </span>
                                      <el-dropdown-menu slot="dropdown">

                                        <!--                <el-dropdown-item><a @click="$router.push('/tinymce/spiderTest')">新增配置</a></el-dropdown-item>-->
                                        <el-dropdown-item>
                                          <a @click="delNextTh({tableDataRow:slots.row,data:slots2.row,currentRow:scopeIn.row,key:tableDataItem.key})">删除</a>

                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                         <!--1-->
                                          <a @click="addNextThird({tableDataRow:slots.row,data:slots2.row,currentRow:scopeIn.row,key:tableDataItem.key})">下一步</a>

                                        </el-dropdown-item>
                                      </el-dropdown-menu>
                                    </el-dropdown>


                                  </template>
                                </el-table-column>

                              </el-table>

                            </div>
                          </template>
                        </el-table-column>
                      </div>
                      <el-table-column
                        type="selection"
                        width="50"
                        show-overflow-tooltip

                      />
                      <el-table-column v-for="item in tableHeader" :key="item.key" :prop="item.prop" :label="item.label">
                        <template slot-scope="scope">
                          <el-select v-model="scope.row[item.prop].value" placeholder="请选择"
                                     v-if="item.prop=='parseType' || item.prop=='out'|| item.prop=='next'|| item.prop=='fetchall'|| item.prop=='target'">
                            <el-option
                              v-for="it in scope.row[item.prop].key"
                              :key="it.value"
                              :label="it.label"
                              :value="it.label">
                            </el-option>
                          </el-select>
                          <el-input v-else v-show="scope.row[item.prop].edit" v-model="scope.row[item.prop].value"
                                    placeholder="请输入内容" @blur="blueHandler(scope.row[item.prop])"/>
                          <span v-show="!scope.row[item.prop].edit" v-if="item.prop!='parseType' && item.prop!='out'&& item.prop!='next'&& item.prop!='fetchall'&& item.prop!='target'">{{ scope.row[item.prop].value }}</span>
                          <i v-show="!scope.row[item.prop].edit" style="margin-left:10px" class="el-icon-edit"
                             @click="editHandle(scope.row[item.prop])" v-if="item.prop!='parseType' && item.prop!='out'&& item.prop!='next'&& item.prop!='fetchall'&& item.prop!='target'"/>
                          <!--                  <i v-show="false" style="margin-left:10px" class="el-icon-edit" @click="editHandle(scope.row[item.prop])" v-if="item.prop=='parseType'" />-->
                        </template>
                      </el-table-column>
                      <el-table-column prop="option" label="操作">
                        <template slot-scope="scope">
                          <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">
                              更多<i class="el-icon-arrow-down el-icon--right"/>
                            </span>
                            <el-dropdown-menu slot="dropdown">

                              <!--                <el-dropdown-item><a @click="$router.push('/tinymce/spiderTest')">新增配置</a></el-dropdown-item>-->
                              <el-dropdown-item>
                                <a @click="delNextItem({parentsRow:slots.row,data:scope.row})">删除</a>

                              </el-dropdown-item>
                              <el-dropdown-item>
                                <a @click="addNextItem({key:tableDataItem.key,row:scope.row,slots:slots.row})">下一步</a>
                              </el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>


                        </template>
                      </el-table-column>

                    </el-table>

                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="option" label="">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-minus" circle
                             @click="subColumnN(tableDataItem.key,scope.row.id)"/>
                  <el-button type="primary" icon="el-icon-plus" circle @click="addColumnN(tableDataItem.key)"/>
                </template>
              </el-table-column>
              <el-table-column v-for="item in tableHeader" :key="item.key" :prop="item.prop" :label="item.label">
                <template slot-scope="scope">
                  <el-select v-model="scope.row[item.prop].value" placeholder="请选择"
                             v-if="item.prop=='parseType' || item.prop=='out' || item.prop=='next'|| item.prop=='fetchall'|| item.prop=='target'">
                    <el-option
                      v-for="it in scope.row[item.prop].key"
                      :key="it.value"
                      :label="it.label"
                      :value="it.label">
                    </el-option>
                  </el-select>
                  <el-input v-else v-show="scope.row[item.prop].edit" v-model="scope.row[item.prop].value"
                            placeholder="请输入内容" @blur="blueHandler(scope.row[item.prop])"/>
                  <span v-show="!scope.row[item.prop].edit" v-if="item.prop!='parseType' && item.prop!='out' && item.prop!='next'&& item.prop!='fetchall'&& item.prop!='target'">{{ scope.row[item.prop].value }}</span>
                  <i v-show="!scope.row[item.prop].edit" style="margin-left:10px" class="el-icon-edit"
                     @click="editHandle(scope.row[item.prop])" v-if="item.prop!='parseType' && item.prop!='out' && item.prop!='next'&& item.prop!='fetchall'&& item.prop!='target'"/>
                  <!--                  <i v-show="false" style="margin-left:10px" class="el-icon-edit" @click="editHandle(scope.row[item.prop])" v-if="item.prop=='parseType'" />-->
                </template>
              </el-table-column>

              <el-table-column prop="option" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="addNext({tableKey:tableDataItem.key,row:scope.row})">下一步</el-button>
                </template>
              </el-table-column>
<!--              <el-table-column prop="option" label="操作">-->
<!--                <template slot-scope="scope">-->
<!--                  <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>-->
<!--                  <el-button v-if="scope.row.edit" type="text" size="small" @click="editHandler(scope.row)">取消编辑-->
<!--                  </el-button>-->
<!--                  <el-button v-else type="text" size="small" @click="editHandler(scope.row)">编辑</el-button>-->
<!--                </template>-->
<!--              </el-table-column>-->
            </el-table>
          </div>
        </div>
        <p style="text-align:left;color:#ccc;padding: 18px">Tips:stepName非空，当next为true时可点下一步</p>
      </el-tab-pane>
      <el-tab-pane label="分发器" name="third">
        <div style="margin:20px">
          <h2 style="margin:0;text-align:center;">Sender</h2>
          <el-button type="primary" style="margin-bottom:10px" icon="el-icon-plus" @click="addSender">Add</el-button>
          <el-button type="danger" style="margin-bottom:10px" icon="el-icon-delete" @click="delSender">Del
          </el-button>
          <div v-for="tableDataItem in senderData" :key="tableDataItem.key" style="margin-top:5px;margin-bottom:15px">
            <div class="inputDeep" style="width: 165px">
              <el-input
                v-model="tableDataItem.name"
                placeholder="actKey"
                clearable
              >
                <i
                  slot="suffix"
                  class="el-icon-edit el-input__icon"
                />
              </el-input>
            </div>
            <el-table :data="tableDataItem.tableData" border>
              <el-table-column prop="option" label="">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-minus" circle
                             @click="subColumnSender(tableDataItem.key,scope.row.id)"/>
                  <el-button type="primary" icon="el-icon-plus" circle @click="addColumnSender(tableDataItem.key)"/>
                </template>
              </el-table-column>
              <el-table-column v-for="item in senderHeader" :key="item.key" :prop="item.prop" :label="item.label">
                <template slot-scope="scope">
                  <el-select v-model="scope.row[item.prop].value" placeholder="请选择"
                             v-if="item.prop=='encoding'">
                    <el-option
                      v-for="it in scope.row[item.prop].key"
                      :key="it.value"
                      :label="it.label"
                      :value="it.label">
                    </el-option>
                  </el-select>
                  <el-input v-else v-show="scope.row[item.prop].edit" v-model="scope.row[item.prop].value"
                            placeholder="请输入内容" @blur="blueHandler(scope.row[item.prop])"/>
                  <span v-show="!scope.row[item.prop].edit" v-if="item.prop!='encoding'">{{ scope.row[item.prop].value }}</span>
                  <i v-show="!scope.row[item.prop].edit" style="margin-left:10px" class="el-icon-edit"
                     @click="editHandle(scope.row[item.prop])" v-if="item.prop!='encoding'"/>
                  <!--                  <i v-show="false" style="margin-left:10px" class="el-icon-edit" @click="editHandle(scope.row[item.prop])" v-if="item.prop=='parseType'" />-->
                </template>
              </el-table-column>
              <!--              <el-table-column prop="option" label="操作">-->
              <!--                <template slot-scope="scope">-->
              <!--                  <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>-->
              <!--                  <el-button v-if="scope.row.edit" type="text" size="small" @click="editHandler(scope.row)">取消编辑-->
              <!--                  </el-button>-->
              <!--                  <el-button v-else type="text" size="small" @click="editHandler(scope.row)">编辑</el-button>-->
              <!--                </template>-->
              <!--              </el-table-column>-->
            </el-table>
          </div>
        </div>
        <p style="text-align:left;color:#ccc;padding: 18px">Tips:actKey非空</p>
      </el-tab-pane>
      <el-tab-pane label="其他设置" name="fourth" style="width:100%">
        <h2 style="margin:0;text-align:center;">Setting</h2>

        <!-- 表格 -->
        <el-table
          :data="testDatas"
          border
          style="width: 100%;margin-top:10px"
          :row-class-name="tableRowClassName"
          @header-contextmenu="(column, event) => rightClick(null, column, event)"
          @row-contextmenu="rightClick"
        >
          <el-table-column v-if="columnList.length > 0" type="index" label="编号" :width="50" />
          <el-table-column v-for="(col, idx) in columnList" :key="col.prop" :index="idx">
            <!-- 自定义表头的内容 -->
            <template #header>
              <p v-show="col.show" @dblclick="col.show = false">
                {{ col.label }}
              </p>
              <el-input
                v-show="!col.show"
                v-model="col.label"
                size="mini"
                @blur="col.show=true"
              />
            </template>
            <!-- 自定义列的内容-->
            <template #default="scope">
              <p v-show="scope.row[col.prop].show" @dblclick="scope.row[col.prop].show = false">
                {{ scope.row[col.prop].content }}
                <i class="el-icon-edit-outline" @click="scope.row[col.prop].show=false" />
              </p>
              <el-input
                v-show="!scope.row[col.prop].show"
                v-model="scope.row[col.prop].content"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                @blur="scope.row[col.prop].show = true"
              />
            </template>
          </el-table-column>
        </el-table>
        <p style="text-align:left;color:#ccc;">右键菜单，双击编辑</p>

<!--        <div v-if="checkPermission(['admin'])">-->
<!--          <h3 style="text-align:center;">实时数据展示</h3>-->
<!--          <label>当前目标：</label>-->
<!--          <p>{{ JSON.stringify(curTarget) }}</p>-->
<!--          <label>表头：</label>-->
<!--          <p v-for="col in columnList" :key="col.prop">{{ JSON.stringify(col) }}</p>-->
<!--          <label>数据：</label>-->
<!--          <ul>-->
<!--            <li v-for="(data,idx) in testDatas" :key="idx">-->
<!--              <p v-for="(key,idx1) in Object.keys(data)" :key="idx1">{{ key + ': ' + JSON.stringify(data[key]) }}</p>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->

        <!-- 表头右键菜单 -->
        <div v-show="showMenu" id="contextmenu">
          <i class="el-icon-circle-close hideContextMenu" @click="showMenu=false" />
          <!--          <el-button size="mini" type="primary" @click="addColumn()">前方插入一列</el-button>-->
          <!--          <el-button size="mini" type="primary" @click="addColumn(true)">后方插入一列</el-button>-->
          <!--          <el-popconfirm title="确定删除该列吗？" @confirm="delColumn">-->
          <!--            <template #reference>-->
          <!--              <el-button type="primary" size="mini">删除当前列</el-button>-->
          <!--            </template>-->
          <!--          </el-popconfirm>-->
          <div v-show="!curTarget.isHead">
            <hr>
            <!--            <el-button size="mini" type="primary" @click="addRow()">上方插入一行</el-button>-->
            <el-button size="mini" type="primary" style="width: 100px" @click="addRow(true)">下方插入一行</el-button>
            <el-popconfirm title="确定删除该行吗？" @confirm="delRow">
              <template #reference>
                <el-button type="primary" size="mini" style="width: 100px">删除当前行</el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid'
import FileSaver from "file-saver";
import checkPermission from '@/utils/permission' // 权限判断函数
export default {
  data() {
    return {
      parChildId:{},
      mothodOps:[{
        value: '选项1',
        label: 'post'
      }, {
        value: '选项2',
        label: 'get'
      }],
      encodeOps:[{
        value: '选项1',
        label: 'gbk'
      }, {
        value: '选项2',
        label: 'utf8'
      }],
      dateTypeOps:[{
        value: '选项1',
        label: 'dom'
      }, {
        value: '选项2',
        label: 'json'
      },{
        value: '选项3',
        label: 'josnp'
      }],
      paramsData: this.$route.params,
      jsonData: [],
      tableData: [],
      seed: this.$route.params.url,
      dataType: '',
      encodeStr: '',
      encodeData: [{ value: 'v1', label: 'utf8' }, { value: 'v2', label: 'gbk' }],
      options: [{
        value: '选项1',
        label: 'dom'
      }, {
        value: '选项2',
        label: 'json'
      }, {
        value: '选项3',
        label: 'detail'
      }],
      columnList: [
        { prop: 'name', label: '设置', show: true },
        { prop: 'value', label: '值', show: true }

      ],
      enolumnList: [
        { prop: 'name', label: '属性', show: true },
        { prop: 'value', label: '值', show: true }

      ],
      testDatas: [{
        name: { content: '', show: true },
        value: { content: '', show: true }
      },
      //   {
      //   name: { content: '', show: true },
      //   value: { content: '', show: true }
      //
      // }
      ],
      entrance: [{
        name: { content: 'task', show: true },
        value: { content: '', show: true }
      },
        {
          name: { content: 'method', show: true },
          value: { content: '', show: true }
        },
        {
        name: { content: 'body', show: true },
        value: { content: 'null', show: true }

      },  {
        name: { content: 'encode', show: true },
        value: { content: '', show: true }

      },  {
        name: { content: 'dataType', show: true },
        value: { content: '', show: true }

      }, {
        name: { content: 'inherit', show: true },
        value: { content: '', show: true }

      },],
      count_col: 0,
      showMenu: false,
      curTarget: { // 当前目标信息
        rowIdx: null, // 行下标
        colIdx: null, // 列下标
        isHead: undefined // 当前目标是表头？
      },
      input: '',
      entranceInnerHead:[
        {
          key: '0',
          label: 'key',
          prop: 'attrStr'
        },
        {
          key: '1',
          label: 'value',
          prop: 'valueStr'
        },
      ],
      entranceTaskHead:[
        {
          key: '0',
          label: 'url',
          prop: 'url'
        },
        {
          key: '1',
          label: 'method',
          prop: 'method'
        }, {
          key: '2',
          label: 'body',
          prop: 'body'
        },{
          key: '3',
          label: 'headers',
          prop: 'headers'
        },
      ],
      tableHeader: [
        {
          key: '0',
          label: 'name',
          prop: 'name'
        },
        {
          key: '1',
          label: 'parseType',
          prop: 'parseType'
        },
        {
          key: '2',
          label: 'rule',
          prop: 'rule'
        },
        {
          key: '3',
          label: 'out',
          prop: 'out'
        },
        {
          key: '4',
          label: 'target',
          prop: 'target'
        },
        {
          key: '5',
          label: 'next',
          prop: 'next'
        },
        {
          key: '6',
          label: 'fetchall',
          prop: 'fetchall'
        },

      ],
      entranceHeader:[
        {
          key: '1',
          label: '属性',
          prop: 'attribute'
        },
        {
          key: '2',
          label: '值',
          prop: 'value'
        },

      ],
      entranceData:[
        {
          key: 0,
          name: '',
          tableData: [{
            id: 1,
            code: {
              value: '',
              edit: false
            },

            attribute: {
              value: 'encoding',
              key: [{
                value: '选项1',
                label: 'utf8'
              }, {
                value: '选项2',
                label: 'gbk'
              }],
              edit: false
            },
            value: {
              value: '',
              edit: false
            },
          },
            {
              id: 2,
              code: {
                value: '',
                edit: false
              },
              attribute: {
                value: 'dataType',
                key: [{
                  value: '选项1',
                  label: 'dom'
                }, {
                  value: '选项2',
                  label: 'json'
                },{
                  value: '选项3',
                  label: 'josnp'
                },{
                  value: '选项4',
                  label: 'original'
                },],
                edit: false
              },
              value: {
                value: '',
                edit: false
              },
            },
            {
              id: 3,
              code: {
                value: '',
                edit: false
              },
              attribute: {
                value: 'inherit',
                edit: false
              },
              children: [
                { id: 1111,attrStr:{
                    value: '',
                    edit: false
                  }, valueStr: {
                    value: '',
                    edit: false
                  } },
                // { id: 2222,attrStr:{
                //     value: 'key2',
                //     edit: false
                //   }, valueStr: {
                //     value: 'value2',
                //     edit: false
                //   }
                // }
              ],
              value: {
                value: '{}',
                edit: false
              },
            },
            {
              id: 4,
              code: {
                value: '',
                edit: false
              },
              attribute: {
                value: 'task',
                edit: false
              },
              task: [
                { id: 3333,
                  url:{
                    value: '',
                    edit: false
                  },
                  method: {
                    value: '',
                    key: [{
                      value: '选项1',
                      label: 'GET'
                    }, {
                      value: '选项2',
                      label: 'POST'
                    }, {
                      value: '选项3',
                      label: 'HEAD'
                    },  {
                      value: '选项4',
                      label: 'OPTIONS'
                    },{
                      value: '选项5',
                      label: 'PUT'
                    },{
                      value: '选项6',
                      label: 'PATCH'
                    }, {
                      value: '选项7',
                      label: 'DELETE'
                    }, {
                      value: '选项8',
                      label: 'TRACE'
                    },{
                      value: '选项9',
                      label: 'CONNECT'
                    }, ],
                    edit: false
                  },
                  body: {
                    value: '',
                    edit: false
                  },
                  headers: {
                    // value: '{ "X-Requested-With": "XMLHttpRequest", "Content-Type": "application/x-www-form-urlencoded"}',
                    value: '',
                    edit: false
                  },
                  },

              ],
              value: {
                value: '{}',
                edit: false
              },
            },]
        }
      ],
      senderHeader: [
        {
          key: '1',
          label: 'source',
          prop: 'source'
        },
        {
          key: '2',
          label: 'type',
          prop: 'type'
        },
        {
          key: '3',
          label: 'target',
          prop: 'target'
        },
        {
          key: '4',
          label: 'encoding',
          prop: 'encoding'
        },
        {
          key: '5',
          label: 'targetType',
          prop: 'targetType'
        },{
          key: '6',
          label: 'parameter',
          prop: 'parameter'
        },
      ],
      senderData:[
        {
          key: 0,
          name: '',
          tableData: [{
            id: 0,
            source: {
              value: '',
              edit: false
            },
            type: {
              value: '',
              edit: false
            },
            target: {
              value: '',
              edit: false
            },
            encoding: {
              value: '',
              key: [{
                value: '选项1',
                label: 'gbk'
              }, {
                value: '选项2',
                label: 'utf8'
              }],
              edit: false
            },
            targetType: {
              value: '',
              edit: false
            },
            parameter: {
              value: '',
              edit: false
            },
          }]
        }
      ],
      tableDatas: [
        {
          key: 0,
          name: '',
          tableData: [{
            id: 1,
            name: {
              value: '',
              edit: false
            },
            children:[
            //   {
            //   id: 2,
            //   fetchall:{
            //     key: [{
            //       value: '选项1',
            //       label: '1'
            //     }, {
            //       value: '选项2',
            //       label: '0'
            //     },{
            //       value: '选项3',
            //       label: '-1'
            //     },],
            //     value:-1,
            //     edit:false
            //   },
            //   name: {
            //     value: 'title2',
            //     edit: false
            //   },
            //   children:[{
            //     id: 3,
            //     fetchall:{
            //       value:-1,
            //       key: [{
            //         value: '选项1',
            //         label: '1'
            //       }, {
            //         value: '选项2',
            //         label: '0'
            //       },{
            //         value: '选项3',
            //         label: '-1'
            //       },],
            //       edit:false
            //     },
            //     name: {
            //       value: 'title3',
            //       edit: false
            //     },
            //     children:[{
            //       id: 4,
            //       fetchall:{
            //         value:-1,
            //         key: [{
            //           value: '选项1',
            //           label: '1'
            //         }, {
            //           value: '选项2',
            //           label: '0'
            //         },{
            //           value: '选项3',
            //           label: '-1'
            //         },],
            //         edit:false
            //       },
            //       name: {
            //         value: 'title4',
            //         edit: false
            //       },
            //       children:[{
            //         id: 5,
            //         fetchall:{
            //           key: [{
            //             value: '选项1',
            //             label: '1'
            //           }, {
            //             value: '选项2',
            //             label: '0'
            //           },{
            //             value: '选项3',
            //             label: '-1'
            //           },],
            //           value:-1,
            //           edit:false
            //         },
            //         name: {
            //           value: 'title5',
            //           edit: false
            //         },
            //         children:[],
            //         parseType: {
            //           value:'',
            //           key: [{
            //             value: '选项1',
            //             label: 'xpath'
            //           }, {
            //             value: '选项2',
            //             label: 'json'
            //           }, {
            //             value: '选项3',
            //             label: 're'
            //           }, {
            //             value: '选项4',
            //             label: 'str'
            //           }, {
            //             value: '选项5',
            //             label: 'value'
            //           }, {
            //             value: '选项6',
            //             label: 'any'
            //           }],
            //           edit: false
            //         },
            //         out: {
            //           value: 'list',
            //           key: [{
            //             value: '选项1',
            //             label: 'url'
            //           }, {
            //             value: '选项2',
            //             label: 'html'
            //           }, {
            //             value: '选项3',
            //             label: 'range'
            //           }, {
            //             value: '选项4',
            //             label: 'dom'
            //           }, {
            //             value: '选项5',
            //             label: 'datetime'
            //           }, {
            //             value: '选项6',
            //             label: 'any'
            //           }, {
            //             value: '选项7',
            //             label: 'list'
            //           }],
            //           edit: false
            //         },
            //         rule: {
            //           value: '//*[@class=\'dddd\']/a/@href',
            //           edit: false
            //         },
            //         target: {
            //           key:[ {
            //             value: '选项1',
            //             label: 'parameter'
            //           }, {
            //             value: '选项2',
            //             label: 'res'
            //           }, {
            //             value: '选项3',
            //             label: 'inherit'
            //           }, {
            //             value: '选项4',
            //             label: 'prev'
            //           },],
            //           value: 'res',
            //           edit: false
            //         },
            //         next: {
            //           value: false,
            //           key: [{
            //             value: '选项1',
            //             label: false
            //           }, {
            //             value: '选项2',
            //             label: true
            //           }],
            //           edit: false
            //         },
            //       }],
            //       parseType: {
            //         value:'',
            //         key: [{
            //           value: '选项1',
            //           label: 'xpath'
            //         }, {
            //           value: '选项2',
            //           label: 'json'
            //         }, {
            //           value: '选项3',
            //           label: 're'
            //         }, {
            //           value: '选项4',
            //           label: 'str'
            //         }, {
            //           value: '选项5',
            //           label: 'value'
            //         }, {
            //           value: '选项6',
            //           label: 'any'
            //         }],
            //         edit: false
            //       },
            //       out: {
            //         value: 'list',
            //         key: [{
            //           value: '选项1',
            //           label: 'url'
            //         }, {
            //           value: '选项2',
            //           label: 'html'
            //         }, {
            //           value: '选项3',
            //           label: 'range'
            //         }, {
            //           value: '选项4',
            //           label: 'dom'
            //         }, {
            //           value: '选项5',
            //           label: 'datetime'
            //         }, {
            //           value: '选项6',
            //           label: 'any'
            //         }, {
            //           value: '选项7',
            //           label: 'list'
            //         }],
            //         edit: false
            //       },
            //       rule: {
            //         value: '//*[@class=\'dddd\']/a/@href',
            //         edit: false
            //       },
            //       target: {
            //         value: 'res',
            //         key:[ {
            //           value: '选项1',
            //           label: 'parameter'
            //         }, {
            //           value: '选项2',
            //           label: 'res'
            //         }, {
            //           value: '选项3',
            //           label: 'inherit'
            //         }, {
            //           value: '选项4',
            //           label: 'prev'
            //         },],
            //         edit: false
            //       },
            //       next: {
            //         value: false,
            //         key: [{
            //           value: '选项1',
            //           label: false
            //         }, {
            //           value: '选项2',
            //           label: true
            //         }],
            //         edit: false
            //       },
            //     }],
            //     parseType: {
            //       value:'',
            //       key: [{
            //         value: '选项1',
            //         label: 'xpath'
            //       }, {
            //         value: '选项2',
            //         label: 'json'
            //       }, {
            //         value: '选项3',
            //         label: 're'
            //       }, {
            //         value: '选项4',
            //         label: 'str'
            //       }, {
            //         value: '选项5',
            //         label: 'value'
            //       }, {
            //         value: '选项6',
            //         label: 'any'
            //       }],
            //       edit: false
            //     },
            //     out: {
            //       value: 'list',
            //       key: [{
            //         value: '选项1',
            //         label: 'url'
            //       }, {
            //         value: '选项2',
            //         label: 'html'
            //       }, {
            //         value: '选项3',
            //         label: 'range'
            //       }, {
            //         value: '选项4',
            //         label: 'dom'
            //       }, {
            //         value: '选项5',
            //         label: 'datetime'
            //       }, {
            //         value: '选项6',
            //         label: 'any'
            //       }, {
            //         value: '选项7',
            //         label: 'list'
            //       }],
            //       edit: false
            //     },
            //     rule: {
            //       value: '//*[@class=\'dddd\']/a/@href',
            //       edit: false
            //     },
            //     target: {
            //       value: 'res',
            //       key:[ {
            //         value: '选项1',
            //         label: 'parameter'
            //       }, {
            //         value: '选项2',
            //         label: 'res'
            //       }, {
            //         value: '选项3',
            //         label: 'inherit'
            //       }, {
            //         value: '选项4',
            //         label: 'prev'
            //       },],
            //       edit: false
            //     },
            //     next: {
            //       value: false,
            //       key: [{
            //         value: '选项1',
            //         label: false
            //       }, {
            //         value: '选项2',
            //         label: true
            //       }],
            //       edit: false
            //     },
            //   }],
            //   parseType: {
            //     value:'',
            //     key: [{
            //       value: '选项1',
            //       label: 'xpath'
            //     }, {
            //       value: '选项2',
            //       label: 'json'
            //     }, {
            //       value: '选项3',
            //       label: 're'
            //     }, {
            //       value: '选项4',
            //       label: 'str'
            //     }, {
            //       value: '选项5',
            //       label: 'value'
            //     }, {
            //       value: '选项6',
            //       label: 'any'
            //     }],
            //     edit: false
            //   },
            //   out: {
            //     value: 'list',
            //     key: [{
            //       value: '选项1',
            //       label: 'url'
            //     }, {
            //       value: '选项2',
            //       label: 'html'
            //     }, {
            //       value: '选项3',
            //       label: 'range'
            //     }, {
            //       value: '选项4',
            //       label: 'dom'
            //     }, {
            //       value: '选项5',
            //       label: 'datetime'
            //     }, {
            //       value: '选项6',
            //       label: 'any'
            //     }, {
            //       value: '选项7',
            //       label: 'list'
            //     }],
            //     edit: false
            //   },
            //   rule: {
            //     value: '//*[@class=\'dddd\']/a/@href',
            //     edit: false
            //   },
            //   target: {
            //     value: 'res',
            //     key:[ {
            //       value: '选项1',
            //       label: 'parameter'
            //     }, {
            //       value: '选项2',
            //       label: 'res'
            //     }, {
            //       value: '选项3',
            //       label: 'inherit'
            //     }, {
            //       value: '选项4',
            //       label: 'prev'
            //     },],
            //     edit: false
            //   },
            //   next: {
            //     value: false,
            //     key: [{
            //       value: '选项1',
            //       label: false
            //     }, {
            //       value: '选项2',
            //       label: true
            //     }],
            //     edit: false
            //   },
            // }
            ],
            parseType: {
              value:'',
              key: [{
                value: '选项1',
                label: 'xpath'
              }, {
                value: '选项2',
                label: 'json'
              }, {
                value: '选项3',
                label: 're'
              }, {
                value: '选项4',
                label: 'str'
              }, {
                value: '选项5',
                label: 'value'
              }, {
                value: '选项6',
                label: 'any'
              }],
              edit: false
            },
            out: {
              value: '',
              key: [{
                value: '选项1',
                label: 'url'
              }, {
                value: '选项2',
                label: 'html'
              }, {
                value: '选项3',
                label: 'range'
              }, {
                value: '选项4',
                label: 'dom'
              }, {
                value: '选项5',
                label: 'datetime'
              }, {
                value: '选项6',
                label: 'any'
              }, {
                value: '选项7',
                label: 'list'
              }],
              edit: false
            },
            rule: {
              value: '',
              edit: false
            },
            fetchall:{
              value:0,
              key: [{
                value: '选项1',
                label: '1'
              }, {
                value: '选项2',
                label: '0'
              },{
                value: '选项3',
                label: '-1'
              },],
              edit:false
            },
            target: {
              value: '',
              key:[ {
                value: '选项1',
                label: 'parameter'
              }, {
                value: '选项2',
                label: 'res'
              }, {
                value: '选项3',
                label: 'inherit'
              }, {
                value: '选项4',
                label: 'prev'
              },],
              edit: false
            },
            next: {
              value: false,
              key: [{
                value: '选项1',
                label: false
              }, {
                value: '选项2',
                label: true
              }],
              edit: false
            },
          }]
        }
      ]
    }
  },
  methods: {
    checkPermission,

    getConfigFile(){
      const configFile = {}
      const  settingData = this.senderData
      const entranceData = this.entranceData
      const parserData = this.tableDatas
      configFile['sender'] = {}
      configFile['parser'] = {}
      configFile['entrance'] = {}
      configFile['entrance']['task'] = []
      configFile['entrance']['inherit']={}
      //entrance
      let tableData = entranceData[0].tableData
      let dataTypeStr = ''
      let  encodingStr= ''
      for (let i = 0; i < tableData.length; i++) {
        if (tableData[i].attribute.value=='encoding'){
          try {
            encodingStr=tableData[i].value.value
            if(this.isNotEmptyStr(encodingStr)==true){
              configFile['entrance']['encoding']=encodingStr
            }
          }catch (e) {
            configFile['entrance']['encoding']='utf8'
          }
        }
        if (tableData[i].attribute.value=='dataType'){
          try {
            dataTypeStr=tableData[i].value.value
            if(this.isNotEmptyStr(dataTypeStr)){
              configFile['entrance']['dataType']=dataTypeStr
            }
          }catch (e) {
            configFile['entrance']['dataType']='dom'
          }
        }
        if (tableData[i].attribute.value=='inherit'){

            for (let j = 0; j < tableData[i].children.length; j++) {
              if(this.isNotEmptyStr(tableData[i].children[j].attrStr.value)==true){
                try {
                  configFile['entrance']['inherit'][tableData[i].children[j].attrStr.value]=tableData[i].children[j].valueStr.value

                }
                catch (e) {
                  configFile['entrance']['inherit']={}
                }

              }

            }

        }
        if(tableData[i].attribute.value=='task'){
          for (let j = 0; j < tableData[i].task.length; j++) {
            const eachTaskObj = {}
            eachTaskObj['req'] = {}

            for (let k = 0; k < this.entranceTaskHead.length; k++) {
              const key = this.entranceTaskHead[k].prop
              const value = tableData[i].task[j][key].value
              if (this.isNotEmptyStr(value)==true){
                if(key=='headers'){
                  eachTaskObj['req'][key]=JSON.parse(value)
                }
                else {
                  eachTaskObj['req'][key]=value

                }
              }

            }
            configFile['entrance']['task'].push(eachTaskObj)

          }
        }

      }
      //parser
      for (let i = 0; i < parserData.length ; i++) {
        let parserKey = ''//ackKey
        try{
          parserKey= parserData[i].name
        }
        catch (e) {
          parserKey = ''
        }
        if (this.isNotEmptyStr(parserKey.trim()) == true) {
          configFile['parser'][parserKey] = []
          const tableData = parserData[i].tableData
          for (let j = 0; j < tableData.length; j++) {
            const eachInnerObj = {}
            const name = tableData[j].name.value.toString().trim()
            const parseType = tableData[j].parseType.value.toString().trim()
            const rule = tableData[j].rule.value.toString().trim()
            const out = tableData[j].out.value.toString().trim()
            const target = tableData[j].target.value.toString().trim()
            const fetchall = tableData[j].fetchall.value.toString().trim()
            const children = tableData[j].children
            if (this.isNotEmptyStr(name) == true) {
              eachInnerObj['name'] = name
            }
            if (this.isNotEmptyStr(parseType) == true) {
              eachInnerObj['parseType'] = parseType
            }
            if (this.isNotEmptyStr(rule) == true) {
              eachInnerObj['rule'] = rule
            }
            if (this.isNotEmptyStr(out) == true) {
              eachInnerObj['out'] = out
            }
            if (this.isNotEmptyStr(target) == true) {
              eachInnerObj['target'] = target
            }
            if (this.isNotEmptyStr(fetchall) == true) {
              eachInnerObj['fetchall'] = parseInt(fetchall)
            }
             if (children.length>0){
               eachInnerObj['next']=[]

               for (let k = 0; k < children.length; k++) {
                 const FirstNextObj = {}
                 const name = children[k].name.value.toString().trim()
                 const parseType = children[k].parseType.value.toString().trim()
                 const rule = children[k].rule.value.toString().trim()
                 const out = children[k].out.value.toString().trim()
                 const target = children[k].target.value.toString().trim()
                 const fetchall = children[k].fetchall.value.toString().trim()
                 const childrenSecond = children[k].children
                 if (this.isNotEmptyStr(name) == true) {
                   FirstNextObj['name'] = name
                 }
                 if (this.isNotEmptyStr(parseType) == true) {
                   FirstNextObj['parseType'] = parseType
                 }
                 if (this.isNotEmptyStr(rule) == true) {
                   FirstNextObj['rule'] = rule
                 }
                 if (this.isNotEmptyStr(out) == true) {
                   FirstNextObj['out'] = out
                 }
                 if (this.isNotEmptyStr(target) == true) {
                   FirstNextObj['target'] = target
                 }
                 if (this.isNotEmptyStr(fetchall) == true) {
                   FirstNextObj['fetchall'] = parseInt(fetchall)
                 }
                 if(childrenSecond.length>0){
                   FirstNextObj['next'] = []
                   for (let l = 0; l < childrenSecond.length; l++) {
                     const secondNextObj = {}
                     const name = childrenSecond[l].name.value.toString().trim()
                     const parseType = childrenSecond[l].parseType.value.toString().trim()
                     const rule = childrenSecond[l].rule.value.toString().trim()
                     const out = childrenSecond[l].out.value.toString().trim()
                     const target = childrenSecond[l].target.value.toString().trim()
                     const fetchall = childrenSecond[l].fetchall.value.toString().trim()
                     const childrenThird = childrenSecond[l].children
                     if (this.isNotEmptyStr(name) == true) {
                       secondNextObj['name'] = name
                     }
                     if (this.isNotEmptyStr(parseType) == true) {
                       secondNextObj['parseType'] = parseType
                     }
                     if (this.isNotEmptyStr(rule) == true) {
                       secondNextObj['rule'] = rule
                     }
                     if (this.isNotEmptyStr(out) == true) {
                       secondNextObj['out'] = out
                     }
                     if (this.isNotEmptyStr(target) == true) {
                       secondNextObj['target'] = target
                     }
                     if (this.isNotEmptyStr(fetchall) == true) {
                       secondNextObj['fetchall'] = parseInt(fetchall)
                     }
                     if(childrenThird.length>0){
                       secondNextObj['next'] = []
                       for (let m = 0; m < childrenThird.length; m++) {
                         const thirdNextObj = {}
                         const name = childrenThird[m].name.value.toString().trim()
                         const parseType =childrenThird[m].parseType.value.toString().trim()
                         const rule = childrenThird[m].rule.value.toString().trim()
                         const out = childrenThird[m].out.value.toString().trim()
                         const target = childrenThird[m].target.value.toString().trim()
                         const fetchall = childrenThird[m].fetchall.value.toString().trim()
                         const childrenFourth = childrenThird[m].children
                         if (this.isNotEmptyStr(name) == true) {
                           thirdNextObj['name'] = name
                         }
                         if (this.isNotEmptyStr(parseType) == true) {
                           thirdNextObj['parseType'] = parseType
                         }
                         if (this.isNotEmptyStr(rule) == true) {
                           thirdNextObj['rule'] = rule
                         }
                         if (this.isNotEmptyStr(out) == true) {
                           thirdNextObj['out'] = out
                         }
                         if (this.isNotEmptyStr(target) == true) {
                           thirdNextObj['target'] = target
                         }
                         if (this.isNotEmptyStr(fetchall) == true) {
                           thirdNextObj['fetchall'] = parseInt(fetchall)
                         }
                         if (childrenFourth.length>0){
                           thirdNextObj['next'] = []
                           for (let n = 0; n <childrenFourth.length ; n++) {
                             const forthNextObj = {}
                             const name = childrenFourth[n].name.value.toString().trim()
                             const parseType =childrenFourth[n].parseType.value.toString().trim()
                             const rule = childrenFourth[n].rule.value.toString().trim()
                             const out = childrenFourth[n].out.value.toString().trim()
                             const target = childrenFourth[n].target.value.toString().trim()
                             const fetchall = childrenFourth[n].fetchall.value.toString().trim()
                             const childrenfifth = childrenFourth[n].children
                             if (this.isNotEmptyStr(name) == true) {
                               forthNextObj['name'] = name
                             }
                             if (this.isNotEmptyStr(parseType) == true) {
                               forthNextObj['parseType'] = parseType
                             }
                             if (this.isNotEmptyStr(rule) == true) {
                               forthNextObj['rule'] = rule
                             }
                             if (this.isNotEmptyStr(out) == true) {
                               forthNextObj['out'] = out
                             }
                             if (this.isNotEmptyStr(target) == true) {
                               forthNextObj['target'] = target
                             }
                             if (this.isNotEmptyStr(fetchall) == true) {
                               forthNextObj['fetchall'] = parseInt(fetchall)
                             }
                             thirdNextObj['next'].push(forthNextObj)
                           }
                         }
                         secondNextObj['next'].push(thirdNextObj)
                       }
                     }
                     FirstNextObj['next'].push(secondNextObj)
                   }
                 }
                 eachInnerObj['next'].push(FirstNextObj)
               }
             }
            configFile['parser'][parserKey].push(eachInnerObj)

          }
        }


      }
      //setting
      for (let i = 0; i < this.testDatas.length; i++) {
          if(this.isNotEmptyStr(this.testDatas[i].name.content.toString().trim())==true){
            if(this.testDatas[i].name.content=='interval'||this.testDatas[i].name.content=='concurrency'||this.testDatas[i].name.content=='timeout'||this.testDatas[i].name.content=='retryTimes'||this.testDatas[i].name.content=='flag'){
              const key = this.testDatas[i].name.content
              const value = parseFloat(this.testDatas[i].value.content)
              configFile[key]=value
            }
            else {
              const key = this.testDatas[i].name.content
              const value = this.testDatas[i].value.content
              configFile[key]=value
            }
          }
      }
      //sender
      for (let i = 0; i < settingData.length; i++) {
        let actKey = ''
        try {
         actKey = settingData[i].name.toString().trim()

        }
        catch(err){
        }
        if (this.isNotEmptyStr(actKey)==true){
          const senderKey = settingData[i].name.toString().trim()
          const childArr = settingData[i].tableData
          configFile['sender'][senderKey] = []
          const eachArrObj = {}
          for (let j = 0; j < childArr.length; j++) {
            const sourceValue =childArr[j].source.value.toString().trim()
            const typeValue =childArr[j].type.value.toString().trim()
            const targetValue =childArr[j].target.value.toString().trim()
            const targetTypeValue =childArr[j].targetType.value.toString().trim()
            const parameterValue =childArr[j].parameter.value.toString().trim()
            const encodingValue =childArr[j].encoding.value.toString().trim()
            if(this.isNotEmptyStr(sourceValue)==true){
              eachArrObj['source'] = sourceValue
            }
           if(this.isNotEmptyStr(typeValue)==true){
              eachArrObj['type'] = typeValue
            }
            if(this.isNotEmptyStr(targetValue)==true){
              eachArrObj['target'] = targetValue
            }
            if(this.isNotEmptyStr(targetTypeValue)==true){
              eachArrObj['targetType'] = targetTypeValue
            }
            if(this.isNotEmptyStr(encodingValue)==true){
              eachArrObj['encoding'] = encodingValue
            }
            else {
              eachArrObj['parameter'] = parameterValue
            }
            // console.log(eachArrObj)
            configFile['sender'][senderKey].push(eachArrObj)

          }


        }

      }
      let data = JSON.stringify(configFile);
      // console.log('entrance:',this.entranceData)
      let blob = new Blob([data], { type: "application/json" });
      FileSaver.saveAs(blob, `configFile.json`);
    },
    isNotEmptyStr(s) {
      if (typeof s == 'string' && s.length > 0) {
        return true
      }
      return false
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    rightClick(row, column, event) {
      // 阻止浏览器自带的右键菜单弹出
      event.preventDefault() // window.event.returnValue = false
      if (column.index == null || row == null) return
      // console.log(row)
      // 定位菜单
      const ele = document.getElementById('contextmenu')
      ele.style.top = event.clientY - 130 + 'px'
      ele.style.left = event.clientX - 130 + 'px'
      if (window.innerWidth - 140 < event.clientX) {
        ele.style.left = 'unset'
        ele.style.right = 0
      }
      this.showMenu = true
      // 当前目标
      this.curTarget = {
        rowIdx: row ? row.row_index : null,
        colIdx: column.index,
        isHead: !row
      }
    },
    getSameStr(str1,str2){
      const len = str1.length<str2.length?str1.length:str2.length
      let sameStr = ""
      for (let index = 0; index < len; index++) {
        if(str1[index]!=str2[index]){
          // sameStr = str1.substring(0,index)
          // console.log(str1.substring(0,index-1))
          sameStr = str1.substring(0,index-1)
          break
        }

      }
      return sameStr
    },
    // 新增行
    addRow(later) {
      this.showMenu = false
      if (this.curTarget.rowIdx === null) return
      const idx = later ? this.curTarget.rowIdx + 1 : this.curTarget.rowIdx
      const obj = {}
      this.columnList.forEach(p => {
        obj[p.prop] = { content: '', show: true }
      })
      this.testDatas.splice(idx, 0, obj)
    },
    // 删除行
    delRow() {
      this.showMenu = false
      this.curTarget.rowIdx !== null && this.testDatas.splice(this.curTarget.rowIdx, 1)
    },
    // 新增列
    addColumn(later) {
      this.showMenu = false
      const idx = later ? this.curTarget.colIdx + 1 : this.curTarget.colIdx
      const obj = { prop: 'col_' + ++this.count_col, label: '', show: true }
      this.columnList.splice(idx, 0, obj)
      this.testDatas.forEach(p => {
        // vue3无需 this.$set(p, obj.col, { content: '', show: true }) // vue2中, 新增的对象无法被监听到
        p[obj.prop] = { content: '', show: true }
      })
    },
    // 删除列
    delColumn() {
      this.showMenu = false
      const colKey = this.columnList[this.curTarget.colIdx].prop
      this.columnList.splice(this.curTarget.colIdx, 1)
      this.testDatas.forEach(p => delete p[colKey])
    },
    // 添加表格行下标
    tableRowClassName({ row, rowIndex }) {
      row.row_index = rowIndex
    },
    subInherit(data){
      // console.log('ddddddddddchildren:',this.entranceData)
      const row = data.row
      let childrenArr = []
      let taskArr = []
      let delPos = -1
      let delTaskPos = -1
      let currentId = data.currentRow.id
      if (row == 'inherit'){
        for (let i = 0; i <this.entranceData.length; i++) {
          if(this.entranceData[i].key==data.key){
            for (let j = 0; j < this.entranceData[i].tableData.length; j++) {
              if(this.entranceData[i].tableData[j].attribute.value=='inherit'){
                childrenArr=this.entranceData[i].tableData[j].children
              }

            }
          }

        }
        for (let i = 0; i < childrenArr.length; i++) {
          if (childrenArr[i].id==currentId){
            delPos=i
            break
          }
        }
        if(childrenArr.length>1){
          childrenArr.splice(delPos,1)
        }
      }
      else{
        for (let i = 0; i <this.entranceData.length; i++) {
          if(this.entranceData[i].key==data.key){
            for (let j = 0; j < this.entranceData[i].tableData.length; j++) {
              if(this.entranceData[i].tableData[j].attribute.value=='task'){
                taskArr=this.entranceData[i].tableData[j].task
              }

            }
          }

        }
        for (let i = 0; i < taskArr.length; i++) {
          if (taskArr[i].id==currentId){
            delTaskPos=i
            break
          }
        }
        if(taskArr.length>1){
          taskArr.splice(delTaskPos,1)
        }
      }




    },
    addInherit(data){
      const column = { id: uuidv4() }
      let tableKey = data.key
      let row = data.row
      // console.log('dsdfdsfdfdfentrance:',this.entranceData)
      if (data.row=='inherit'){
        for (let i = 0; i < this.entranceInnerHead.length; i++) {
          column[this.entranceInnerHead[i].prop] = { value: '', edit: true }
        }
        // console.log(column)
        for (let i = 0; i < this.entranceData.length; i++) {
          if(this.entranceData[i].key==tableKey){
            for (let j = 0; j < this.entranceData[i].tableData.length; j++) {
              if (this.entranceData[i].tableData[j].attribute.value==row){
                this.entranceData[i].tableData[j].children.push(column)
                // break
              }


            }
          }

        }
      }
      else {
        for (let i = 0; i < this.entranceTaskHead.length; i++) {
          if (this.entranceTaskHead[i].prop=='method'){
            column[this.entranceTaskHead[i].prop] = { value: '', edit: true,key:[{
                value: '选项1',
                label: 'GET'
              }, {
                value: '选项2',
                label: 'POST'
              }, {
                value: '选项3',
                label: 'HEAD'
              },  {
                value: '选项4',
                label: 'OPTIONS'
              },{
                value: '选项5',
                label: 'PUT'
              },{
                value: '选项6',
                label: 'PATCH'
              }, {
                value: '选项7',
                label: 'DELETE'
              }, {
                value: '选项8',
                label: 'TRACE'
              },{
                value: '选项9',
                label: 'CONNECT'
              }, ] }
          }
          else {
            column[this.entranceTaskHead[i].prop] = { value: '', edit: true }
          }
        }
        for (let i = 0; i < this.entranceData.length; i++) {
          if(this.entranceData[i].key==tableKey){
            for (let j = 0; j < this.entranceData[i].tableData.length; j++) {
              if (this.entranceData[i].tableData[j].attribute.value==row){
                this.entranceData[i].tableData[j].task.push(column)
                // break
              }


            }
          }

        }

      }


      // console.log('entranceData:',this.entranceData)
    },
    addColumnSender(tableDataItemKey) {
      // console.log('dddd:',tableDataItemKey)
      const column = { id: uuidv4() }
      for (let i = 0; i < this.senderHeader.length; i++) {
        if (this.senderHeader[i].prop=='encoding'){
          column[this.senderHeader[i].prop] = { value: '', edit: true, "key": [
              {
                "value": "选项1",
                "label": "gbk"
              },
              {
                "value": "选项2",
                "label": "utf8"
              },

            ], }
        }
        else{column[this.senderHeader[i].prop] = { value: '', edit: true }}


      }

      for (let j = 0; j < this.senderData.length; j++) {
        if (this.senderData[j].key == tableDataItemKey) {
          this.senderData[j].tableData.push(column)
          return
        }
      }
    },
    addColumnEntrance(tableDataItemKey){
      const column = { id: uuidv4() }
      for (let i = 0; i < this.entranceHeader.length; i++) {
        column[this.entranceHeader[i].prop] = { value: '', edit: true }

      }

      for (let j = 0; j < this.entranceData.length; j++) {
        if (this.entranceData[j].key == tableDataItemKey) {
          this.entranceData[j].tableData.push(column)
          return
        }
      }
    },
    delNextItem(data){
      const name = data['data']['name']
      const parentsChild = data['parentsRow']['children']
      // console.log('before:',parentsChild)
      let delPos = -1
      for (let i = 0; i < parentsChild.length; i++) {
        const  obj = parentsChild[i]

        if (obj['name']==name){
          delPos=i
          break
        }
      }
      parentsChild.splice(delPos, 1)
      // console.log('after:',parentsChild)
    },
    addNext(tableData){
      // console.log(tableData.row)
      if (tableData.row.next.value==true){
        const column = { id: uuidv4(),children:[] }
        const eachtableDataId = tableData.row.id
        const tableDataItemKey = tableData.tableKey
        for (let i = 0; i < this.tableHeader.length; i++) {
          console.log('prop：',this.tableHeader[i].prop)
          if (this.tableHeader[i].prop=='parseType'){
            column[this.tableHeader[i].prop] = { key:[{
                value: '选项1',
                label: 'xpath'
              }, {
                value: '选项2',
                label: 'json'
              }, {
                value: '选项3',
                label: 're'
              }, {
                value: '选项4',
                label: 'str'
              }, {
                value: '选项5',
                label: 'value'
              }, {
                value: '选项6',
                label: 'any'
              }],value: '', edit: true }
          }
          else if (this.tableHeader[i].prop=='out'){
            column[this.tableHeader[i].prop] = { key: [{
                value: '选项1',
                label: 'url'
              }, {
                value: '选项2',
                label: 'html'
              }, {
                value: '选项3',
                label: 'range'
              }, {
                value: '选项4',
                label: 'dom'
              }, {
                value: '选项5',
                label: 'datetime'
              }, {
                value: '选项6',
                label: 'any'
              }, {
                value: '选项7',
                label: 'list'
              }],value: '', edit: true }
          }
          else  if (this.tableHeader[i].prop=='next'){
            column[this.tableHeader[i].prop] = { key:[ {
                value: '选项1',
                label: false
              }, {
                value: '选项2',
                label: true
              }],value: '', edit: true }
          }
          else if (this.tableHeader[i].prop=='fetchall'){
            column[this.tableHeader[i].prop] = { key:[ {
                value: '选项1',
                label: 1
              }, {
                value: '选项2',
                label: 0
              }, {
                value: '选项3',
                label: -1
              },],value: '', edit: true }
          }
          else if (this.tableHeader[i].prop=='target'){
            column[this.tableHeader[i].prop] = { key:[ {
                value: '选项1',
                label: 'parameter'
              }, {
                value: '选项2',
                label: 'res'
              }, {
                value: '选项3',
                label: 'inherit'
              }, {
                value: '选项4',
                label: 'prev'
              },],value: '', edit: true }
          }
          else {
            column[this.tableHeader[i].prop] = { value: '', edit: true }
          }
        }
        console.log('column:',column)

        for (let j = 0; j < this.tableDatas.length; j++) {
          if (this.tableDatas[j].key == tableDataItemKey) {
            for (let i = 0; i < this.tableDatas[j].tableData.length; i++) {
              if (this.tableDatas[j].tableData[i].id == eachtableDataId){
                this.tableDatas[j].tableData[i].children.push(column)
                // console.log(this.tableDatas[j].tableData[i].children)
                return
              }
            }
            // console.log(this.tableDatas[j].tableData)
            // console.log(tableDataItemKey)
            // this.tableDatas[j].tableData.children.push(column)
            // return
          }
        }
      }
      else {
        return;
      }


    },
    delNextTh(dataObj){
      let delPos = -1
      const tableDataItemId = dataObj.tableDataRow.id
      const firstChildId = dataObj.data.id
      const currentChildId = dataObj.currentRow.id
      const currenChildName = dataObj.currentRow.name
      const tableDataItemKey = dataObj.key
      for (let i = 0; i < this.tableDatas.length; i++) {
        if (this.tableDatas[i].key == tableDataItemKey) {
          for (let j = 0; j < this.tableDatas[j].tableData.length; j++) {
            if (this.tableDatas[i].tableData[j].id == tableDataItemId){
              for (let k = 0; k < this.tableDatas[i].tableData[j].children.length; k++) {
                if(this.tableDatas[i].tableData[j].children[k].id==firstChildId){
                  let delobj = this.tableDatas[i].tableData[j].children[k].children
                  // console.log(delobj)
                  for (let l = 0; l < this.tableDatas[i].tableData[j].children[k].children.length; l++) {
                    if (this.tableDatas[i].tableData[j].children[k].children[l].id==currentChildId){
                      for (let m = 0; m < this.tableDatas[i].tableData[j].children[k].children[l].children.length; m++) {
                        if(this.tableDatas[i].tableData[j].children[k].children[l].children[m].name==currenChildName){
                          // console.log(this.tableDatas[i].tableData[j].children[k].children[l].children[m])
                          delPos=m
                          break
                        }
                      }

                    }
                  }
                  delobj.splice(delPos,1)

                }
              }
            }
          }
        }
      }
    },
    delnextFourth(dataObj){
      const tableDataItemId = dataObj.tableDataRow.id
      const firstChildId = dataObj.data2.id
      const secondChildId = dataObj.data3.id
      const currentChildId = dataObj.currentRow.id
      const currenChildName = dataObj.currentRow.name
      const tableDataItemKey = dataObj.key
      let delPos = -1
      for (let i = 0; i < this.tableDatas.length; i++) {
        if (this.tableDatas[i].key == tableDataItemKey) {
          for (let j = 0; j < this.tableDatas[j].tableData.length; j++) {
            if (this.tableDatas[i].tableData[j].id == tableDataItemId){
              for (let k = 0; k < this.tableDatas[i].tableData[j].children.length; k++) {
                if(this.tableDatas[i].tableData[j].children[k].id==firstChildId){
                  for (let l = 0; l < this.tableDatas[i].tableData[j].children[k].children.length; l++) {
                    if (this.tableDatas[i].tableData[j].children[k].children[l].id == secondChildId){
                      let delobj = this.tableDatas[i].tableData[j].children[k].children[l].children
                     console.log(this.tableDatas[i].tableData[j].children[k].children[l].children)
                      for (let m = 0; m < this.tableDatas[i].tableData[j].children[k].children[l].children.length; m++) {
                        if ( this.tableDatas[i].tableData[j].children[k].children[l].children[m].id == currentChildId){
                          for (let n = 0; n < this.tableDatas[i].tableData[j].children[k].children[l].children[m].children.length; n++) {
                            if(this.tableDatas[i].tableData[j].children[k].children[l].children[m].children[n].name==currenChildName){}
                            delPos=n
                            break
                          }
                        }
                      }
                      delobj.splice(delPos,1)
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    delNextFifth(dataObj){
      const tableDataItemId = dataObj.tableDataRow.id
      const firstChildId = dataObj.data2.id
      const secondChildId = dataObj.data3.id
      const thirdChildId = dataObj.data4.id
      const currentChildId = dataObj.currentRow.id
      const currenChildName = dataObj.currentRow.name
      const tableDataItemKey = dataObj.key
      let delPos = -1
      for (let i = 0; i < this.tableDatas.length; i++) {
        if (this.tableDatas[i].key == tableDataItemKey) {
          for (let j = 0; j < this.tableDatas[j].tableData.length; j++) {
            if (this.tableDatas[i].tableData[j].id == tableDataItemId){
              for (let k = 0; k < this.tableDatas[i].tableData[j].children.length; k++) {
                if(this.tableDatas[i].tableData[j].children[k].id==firstChildId){
                  for (let l = 0; l < this.tableDatas[i].tableData[j].children[k].children.length; l++) {
                    if (this.tableDatas[i].tableData[j].children[k].children[l].id == secondChildId){
                      for (let m = 0; m < this.tableDatas[i].tableData[j].children[k].children[l].children.length; m++) {
                        if (this.tableDatas[i].tableData[j].children[k].children[l].children[m].id==thirdChildId){
                          let delobj = this.tableDatas[i].tableData[j].children[k].children[l].children[m].children
                          for (let n = 0; n < this.tableDatas[i].tableData[j].children[k].children[l].children[m].children.length; n++) {
                            if (this.tableDatas[i].tableData[j].children[k].children[l].children[m].children[n].id == currentChildId){
                              for (let o = 0; o < this.tableDatas[i].tableData[j].children[k].children[l].children[m].children[n].children.length; o++) {
                                if (this.tableDatas[i].tableData[j].children[k].children[l].children[m].children[n].children[o]==currenChildName){
                                  delPos=o
                                  break
                                }

                              }
                            }
                          }
                          delobj.splice(delPos,1)
                        }

                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

    },
    addNextThird(dataObj){

      console.log('parentsRow:',dataObj.tableDataRow,'data',dataObj.data,'currentRow',dataObj.currentRow)
      if (dataObj.currentRow.next.value==true){
        const column = { id: uuidv4(),children:[] }
        const tableDataItemId = dataObj.tableDataRow.id
        const firstChildId = dataObj.data.id
        const currentChildId = dataObj.currentRow.id
        const tableDataItemKey = dataObj.key
        for (let i = 0; i < this.tableHeader.length; i++) {
          console.log('prop：',this.tableHeader[i].prop)
          if (this.tableHeader[i].prop=='parseType'){
            column[this.tableHeader[i].prop] = { key:[{
                value: '选项1',
                label: 'xpath'
              }, {
                value: '选项2',
                label: 'json'
              }, {
                value: '选项3',
                label: 're'
              }, {
                value: '选项4',
                label: 'str'
              }, {
                value: '选项5',
                label: 'value'
              }, {
                value: '选项6',
                label: 'any'
              }],value: '', edit: true }
          }
          else if (this.tableHeader[i].prop=='out'){
            column[this.tableHeader[i].prop] = { key: [{
                value: '选项1',
                label: 'url'
              }, {
                value: '选项2',
                label: 'html'
              }, {
                value: '选项3',
                label: 'range'
              }, {
                value: '选项4',
                label: 'dom'
              }, {
                value: '选项5',
                label: 'datetime'
              }, {
                value: '选项6',
                label: 'any'
              }, {
                value: '选项7',
                label: 'list'
              }],value: '', edit: true }
          }
          else  if (this.tableHeader[i].prop=='next'){
            column[this.tableHeader[i].prop] = { key:[ {
                value: '选项1',
                label: false
              }, {
                value: '选项2',
                label: true
              }],value: '', edit: true }
          }
          else if (this.tableHeader[i].prop=='fetchall'){
            column[this.tableHeader[i].prop] = { key:[ {
                value: '选项1',
                label: 1
              }, {
                value: '选项2',
                label: 0
              }, {
                value: '选项3',
                label: -1
              },],value: '', edit: true }
          }
          else if (this.tableHeader[i].prop=='target'){
            column[this.tableHeader[i].prop] = { key:[ {
                value: '选项1',
                label: 'parameter'
              }, {
                value: '选项2',
                label: 'res'
              }, {
                value: '选项3',
                label: 'inherit'
              },{
                value: '选项4',
                label: 'prev'
              },],value: '', edit: true }
          }
          else {
            column[this.tableHeader[i].prop] = { value: '', edit: true }
          }
        }
        for (let i = 0; i < this.tableDatas.length; i++) {
          if (this.tableDatas[i].key == tableDataItemKey) {
            for (let j = 0; j < this.tableDatas[j].tableData.length; j++) {
              if (this.tableDatas[i].tableData[j].id == tableDataItemId){
                for (let k = 0; k < this.tableDatas[i].tableData[j].children.length; k++) {
                  if(this.tableDatas[i].tableData[j].children[k].id==firstChildId){
                    for (let l = 0; l < this.tableDatas[i].tableData[j].children[k].children.length; l++) {
                      if (this.tableDatas[i].tableData[j].children[k].children[l].id==currentChildId){
                        this.tableDatas[i].tableData[j].children[k].children[l].children.push(column)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    addNextFourTh(dataObj){

      console.log('parentsRow:',dataObj.tableDataRow,'data2:',dataObj.data2,'data3:',dataObj.data3,'currentRow:',dataObj.currentRow)

     if (dataObj.currentRow.next.value==true){
       const column = { id: uuidv4(),children:[] }
       const tableDataItemId = dataObj.tableDataRow.id
       const firstChildId = dataObj.data2.id
       const secondChildId = dataObj.data3.id
       const currentChildId = dataObj.currentRow.id
       // const currenChildName = dataObj.currentRow.name
       const tableDataItemKey = dataObj.key
       for (let i = 0; i < this.tableHeader.length; i++) {
         console.log('prop：',this.tableHeader[i].prop)
         if (this.tableHeader[i].prop=='parseType'){
           column[this.tableHeader[i].prop] = { key:[{
               value: '选项1',
               label: 'xpath'
             }, {
               value: '选项2',
               label: 'json'
             }, {
               value: '选项3',
               label: 're'
             }, {
               value: '选项4',
               label: 'str'
             }, {
               value: '选项5',
               label: 'value'
             }, {
               value: '选项6',
               label: 'any'
             }],value: '', edit: true }
         }
         else if (this.tableHeader[i].prop=='out'){
           column[this.tableHeader[i].prop] = { key: [{
               value: '选项1',
               label: 'url'
             }, {
               value: '选项2',
               label: 'html'
             }, {
               value: '选项3',
               label: 'range'
             }, {
               value: '选项4',
               label: 'dom'
             }, {
               value: '选项5',
               label: 'datetime'
             }, {
               value: '选项6',
               label: 'any'
             }, {
               value: '选项7',
               label: 'list'
             }],value: '', edit: true }
         }
         else  if (this.tableHeader[i].prop=='next'){
           column[this.tableHeader[i].prop] = { key:[ {
               value: '选项1',
               label: false
             }, {
               value: '选项2',
               label: true
             }],value: '', edit: true }
         }
         else if (this.tableHeader[i].prop=='fetchall'){
           column[this.tableHeader[i].prop] = { key:[ {
               value: '选项1',
               label: 1
             }, {
               value: '选项2',
               label: 0
             }, {
               value: '选项3',
               label: -1
             },],value: '', edit: true }
         }
         else if (this.tableHeader[i].prop=='target'){
           column[this.tableHeader[i].prop] = { key:[ {
               value: '选项1',
               label: 'parameter'
             }, {
               value: '选项2',
               label: 'res'
             }, {
               value: '选项3',
               label: 'inherit'
             }, {
               value: '选项4',
               label: 'prev'
             },],value: '', edit: true }
         }
         else {
           column[this.tableHeader[i].prop] = { value: '', edit: true }
         }
       }
       for (let i = 0; i < this.tableDatas.length; i++) {
         if (this.tableDatas[i].key == tableDataItemKey) {
           for (let j = 0; j < this.tableDatas[j].tableData.length; j++) {
             if (this.tableDatas[i].tableData[j].id == tableDataItemId){
               for (let k = 0; k < this.tableDatas[i].tableData[j].children.length; k++) {
                 if(this.tableDatas[i].tableData[j].children[k].id==firstChildId){
                   for (let l = 0; l < this.tableDatas[i].tableData[j].children[k].children.length; l++) {
                     if (this.tableDatas[i].tableData[j].children[k].children[l].id == secondChildId){
                       for (let m = 0; m < this.tableDatas[i].tableData[j].children[k].children[l].children.length; m++) {
                         if ( this.tableDatas[i].tableData[j].children[k].children[l].children[m].id == currentChildId){
                           this.tableDatas[i].tableData[j].children[k].children[l].children[m].children.push(column)
                         }
                       }
                     }
                   }
                 }
               }
             }
           }
         }
       }

     }
    },
    addNextItem(dataObj){
      // this.parChildId = dataObj.row
      if (dataObj.row.next.value==true){
        const column = { id: uuidv4(),children:[] }
        const eachtableDataId = dataObj.row.id
        const tableDataItemKey = dataObj.key
        for (let i = 0; i < this.tableHeader.length; i++) {
          if (this.tableHeader[i].prop=='parseType'){
            column[this.tableHeader[i].prop] = { key:[{
                value: '选项1',
                label: 'xpath'
              }, {
                value: '选项2',
                label: 'json'
              }, {
                value: '选项3',
                label: 're'
              }, {
                value: '选项4',
                label: 'str'
              }, {
                value: '选项5',
                label: 'value'
              }, {
                value: '选项6',
                label: 'any'
              }],value: '', edit: true }
          }
          else if (this.tableHeader[i].prop=='out'){
            column[this.tableHeader[i].prop] = { key: [{
                value: '选项1',
                label: 'url'
              }, {
                value: '选项2',
                label: 'html'
              }, {
                value: '选项3',
                label: 'range'
              }, {
                value: '选项4',
                label: 'dom'
              }, {
                value: '选项5',
                label: 'datetime'
              }, {
                value: '选项6',
                label: 'any'
              }, {
                value: '选项7',
                label: 'list'
              }],value: '', edit: true }
          }
          else  if (this.tableHeader[i].prop=='next'){
            column[this.tableHeader[i].prop] = { key:[ {
                value: '选项1',
                label: false
              }, {
                value: '选项2',
                label: true
              }],value: '', edit: true }
          }
          else if (this.tableHeader[i].prop=='fetchall'){
            column[this.tableHeader[i].prop] = { key:[ {
                value: '选项1',
                label: 1
              }, {
                value: '选项2',
                label: 0
              }, {
                value: '选项3',
                label: -1
              },],value: '', edit: true }
          }
          else if (this.tableHeader[i].prop=='target'){
            column[this.tableHeader[i].prop] = { key:[ {
                value: '选项1',
                label: 'parameter'
              }, {
                value: '选项2',
                label: 'res'
              }, {
                value: '选项3',
                label: 'inherit'
              }, {
                value: '选项4',
                label: 'prev'
              },],value: '', edit: true }
          }
          else {
            column[this.tableHeader[i].prop] = { value: '', edit: true }
          }
        }
        // console.log('column:',column)

        for (let j = 0; j < this.tableDatas.length; j++) {
          if (this.tableDatas[j].key == tableDataItemKey) {

            for (let i = 0; i < this.tableDatas[j].tableData.length; i++) {
              if (this.tableDatas[j].tableData[i].id == dataObj.slots.id){

                for (let k = 0; k < this.tableDatas[j].tableData[i].children.length; k++) {
                  if(this.tableDatas[j].tableData[i].children[k].id == eachtableDataId){
                    this.tableDatas[j].tableData[i].children[k].children.push(column)
                  }
                }
                // this.tableDatas[j].tableData[i].children.children.push(column)
                // console.log('level3',this.tableDatas[j].tableData[i].children.children)
                // return
              }
            }
            // this.tableDatas[j].tableData.children.push(column)
            return
          }
        }
      }
      else {
        return;
      }
    },
    addColumnN(tableDataItemKey) {
      const column = { id: uuidv4() , children:[]}
      for (let i = 0; i < this.tableHeader.length; i++) {

        if (this.tableHeader[i].prop=='parseType'){
          column[this.tableHeader[i].prop] = { key:[{
            value: '选项1',
            label: 'xpath'
          }, {
            value: '选项2',
            label: 'json'
          }, {
            value: '选项3',
            label: 're'
          }, {
            value: '选项4',
            label: 'str'
          }, {
            value: '选项5',
            label: 'value'
          }, {
            value: '选项6',
            label: 'any'
          }],value: '', edit: true }
        }
        else if (this.tableHeader[i].prop=='out'){
          column[this.tableHeader[i].prop] = { key: [{
              value: '选项1',
              label: 'url'
            }, {
              value: '选项2',
              label: 'html'
            }, {
              value: '选项3',
              label: 'range'
            }, {
              value: '选项4',
              label: 'dom'
            }, {
              value: '选项5',
              label: 'datetime'
            }, {
              value: '选项6',
              label: 'any'
            }, {
              value: '选项7',
              label: 'list'
            }],value: '', edit: true }
        }
        else if (this.tableHeader[i].prop=='next'){
          column[this.tableHeader[i].prop] = { key:[ {
              value: '选项1',
              label: false
            }, {
              value: '选项2',
              label: true
            }],value: '', edit: true }
        }
        else if (this.tableHeader[i].prop=='fetchall'){
          column[this.tableHeader[i].prop] = { key:[ {
              value: '选项1',
              label: 1
            }, {
              value: '选项2',
              label: 0
            }, {
              value: '选项3',
              label: -1
            },],value: '', edit: true }
        }
        else if (this.tableHeader[i].prop=='target'){
          column[this.tableHeader[i].prop] = { key:[ {
              value: '选项1',
              label: 'parameter'
            }, {
              value: '选项2',
              label: 'res'
            }, {
              value: '选项3',
              label: 'inherit'
            }, {
              value: '选项4',
              label: 'prev'
            },],value: '', edit: true }
        }
        else {
          column[this.tableHeader[i].prop] = { value: '', edit: true }
        }
      }

      for (let j = 0; j < this.tableDatas.length; j++) {
        if (this.tableDatas[j].key == tableDataItemKey) {
          this.tableDatas[j].tableData.push(column)
          return
        }
      }

    },
    subColumnSender(tableDataItemKey, tableDataId) {
      // console.log(tableDataItemKey, tableDataId)
      for (let i = 0; i < this.senderData.length; i++) {
        if (this.senderData[i].key == tableDataItemKey) {
          for (let j = 0; j < this.senderData[i].tableData.length; j++) {
            if (this.senderData[i].tableData[j].id == tableDataId && this.senderData[i].tableData.length > 1) {
              this.senderData[i].tableData.splice(j, 1)
            }
          }
        }
      }
    },
    subColumnEntrance(tableDataItemKey, tableDataId){
      for (let i = 0; i < this.entranceData.length; i++) {
        if (this.entranceData[i].key == tableDataItemKey) {
          for (let j = 0; j < this.entranceData[i].tableData.length; j++) {
            if (this.entranceData[i].tableData[j].id == tableDataId && this.entranceData[i].tableData.length > 1) {
              this.entranceData[i].tableData.splice(j, 1)
            }
          }
        }
      }
    },
    testEntranceColum(data){
      console.log(data)
    },
    subColumnN(tableDataItemKey, tableDataId) {
      console.log(tableDataItemKey, tableDataId)
      for (let i = 0; i < this.tableDatas.length; i++) {
        if (this.tableDatas[i].key == tableDataItemKey) {
          for (let j = 0; j < this.tableDatas[i].tableData.length; j++) {
            if (this.tableDatas[i].tableData[j].id == tableDataId && this.tableDatas[i].tableData.length > 1) {
              console.log(this.tableDatas[i].tableData.length)
              console.log(this.tableDatas[i].tableData)
              this.tableDatas[i].tableData.splice(j, 1)
            }
          }
        }
      }
    },
    blueHandler(row) {
      // console.log(row)
      row.edit = false
    },
    editHandle(row) {
      row.edit = true
    },
    addTable() {
      const tableData = { key: uuidv4(), tableData: [] }
      this.tableDatas.push(tableData)
      // console.log('ssss:',this.tableDatas)
      // console.log('tableDataKey:',tableData.key)
      this.addColumnN(tableData.key)
    },
    addSender() {
      const tableData = { key: uuidv4(), tableData: [] }
      this.senderData.push(tableData)
      // console.log(this.tableDatas)
      // console.log(tableData.key)
      this.addColumnSender(tableData.key)
    },
    delTable() {
      if (this.tableDatas.length > 1) {
        this.tableDatas.pop()
      }
    },
    delSender() {
      if (this.senderData.length > 1) {
        this.senderData.pop()
      }
    }

  }
}
</script>
<style lang="scss">
  /*.inputDeep .el-input--medium .el-input__inner{*/
  /*  border-top: none ;*/
  /*  border-left: none !important;*/
  /*  border-right: none !important;*/
  /* border-radius: 0;*/

  /*}*/


  .el-input__inner {

    border: 0px ;

  }
  #hello {position: relative;}
  #contextmenu {
    position:absolute;
    top: 0;
    left: 0;
    height:auto;
    width:120px;
    border-radius: 3px;
    border: 1px solid #999999;
    background-color: #f4f4f4;
    padding: 10px;
    z-index: 12;
    button {display:block;margin:0 0 5px;}
  }
  .hideContextMenu {position:absolute;top:5px;right:5px;}
</style>
