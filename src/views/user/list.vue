<!-- 用户列表 -->
<template>
<div class="app-container">
    <div class="filter-container">
        <el-input v-model="listQuery.username" clearable placeholder="用户名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" @clear="handleFilter" @blur="handleFilter" />
        <el-input v-model="listQuery.role" clearable placeholder="角色" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" @clear="handleFilter" @blur="handleFilter" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 10px" @click="forceRefresh">
            查询
        </el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin-left: 5px" @click="handleCreate">
            新增
        </el-button>
    </div>
    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
        <el-table-column label="用户名" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.username | valueFilter }}</span>
            </template>
        </el-table-column>
        <el-table-column label="头像" width="150" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.avatar" target="_blank">
            <img :src="scope.row.avatar" style="width:60px;height:60px">
          </a>
        </template>
      </el-table-column>
        <el-table-column label="角色" prop="role" align="center" />
        <el-table-column label="昵称" prop="nickname" align="center" />
        <el-table-column label="操作" align="center" width="120" fixed="right">
            <template slot-scope="{ row }">
                <el-button type="text" icon="el-icon-edit" @click="handleUpdate(row)" />
                <el-button type="text" icon="el-icon-delete" style="color:#f56c6c" @click="handleDelete(row)" />
            </template>
        </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="refresh" />
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import {
    listUser,
} from '@/api/user'
import waves from '@/directive/waves'
import {
    parseTime
} from '@/utils'
import Pagination from '@/components/Pagination'
// import PreviewDialog from './components/PreviewDialog'

export default {
    name: 'UserList',
    components: {
        Pagination
        // PreviewDialog
    },
    directives: {
        waves
    },
    filters: {
        timeFilter(time) {
            if (time) {
                return parseTime(time, '{y}-{m}-{d} {h}:{i}')
            } else {
                return '无'
            }
        },
        valueFilter(value) {
            if (value) {
                return value
            } else {
                return '无'
            }
        }
    },
    data() {
        // 这里存放数据
        return {
            tableKey: 0,
            list: null,
            total: 0,
            listLoading: true,
            downloadLoading: false,
            listQuery: {}
        }
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.parseQuery()
    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.getList()
    },
    beforeRouteUpdate(to, from, next) {
        if (to.path === from.path) {
            const newQuery = Object.assign({}, to.query)
            const oldQuery = Object.assign({}, from.query)
            if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
                this.getList()
            }
        }
        next()
    },
    // 方法集合
    methods: {
        wrapperKeyword(k, v) {
            function highlight(value) {
                return '<span style="color: #1890ff">' + value + '</span>'
            }
            if (!this.listQuery[k]) {
                return v
            } else {
                return v.replace(new RegExp(this.listQuery[k], 'ig'), v => highlight(v))
            }
        },
        parseQuery() {
            // 收集查询条件
            const query = Object.assign({}, this.$route.query)
            let listQuery = {
                page: 1,
                pageSize: 10,
                sort: '-id'
            }
            if (query) {
                query.page && (query.page = Number(query.page))
                query.pageSize && (query.pageSize = Number(query.pageSize))
                listQuery = {
                    ...listQuery,
                    ...query
                }
            }
            this.listQuery = listQuery
        },
        refresh() {
            this.$router.push({
                path: '/person/user/list',
                query: this.listQuery
            })
        },
        getList() {
            this.listLoading = true
            listUser(this.listQuery).then(response => {
                const {
                    data,
                    total
                } = response
                this.list = data
                this.total = total
                this.listLoading = false
                this.list.forEach(book => {
                    book.usernameWrapper = this.wrapperKeyword('username', book.username)
                    book.roleWrapper = this.wrapperKeyword('role', book.role)
                })
            })
        },
        handleFilter() {
            this.listQuery.page = 1
            this.refresh()
        },
        forceRefresh() {
            // window.location.reload()
            this.refresh()
        },
        sortChange(data) {
            const {
                prop,
                order
            } = data
            if (prop === 'id') {
                this.sortByID(order)
            }
        },
        sortByID(order) {
            if (order === 'ascending') {
                this.listQuery.sort = '+id'
            } else {
                this.listQuery.sort = '-id'
            }
            this.handleFilter()
        },
        handleCreate() {
            this.$router.push('/person/user/form')
        },
        handleUpdate(row) {
            this.$router.push(`/book/edit/${row.fileName}`)
        },
        handleDelete(row) {
            this.$confirm('此操作将永久删除该电子书, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteBook(row.fileName).then(response => {
                    this.$notify({
                        title: '成功',
                        message: response.msg || '删除成功',
                        type: 'success',
                        duration: 2000
                    })
                    this.handleFilter()
                })
            })
        },
        getSortClass: function (key) {
            const sort = this.listQuery.sort
            return sort === `+${key}` ?
                'ascending' :
                sort === `-${key}` ?
                'descending' :
                ''
        }
    }
}
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
