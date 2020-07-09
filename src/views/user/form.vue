<!-- 用户管理表单 -->
<template>
<div class="app-container">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form-base">
        <el-form-item label="用户名" prop="username">
            <el-input :disabled="formType === 'edit'" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
            <el-select v-model="form.role" placeholder="请选择角色">
                <el-option v-for="option in roleOptions" :label="option.name" :value="option.value" :key="option.name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="头像">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" :multiple="true" accept="image/*" :on-success="avatarUploadChange" :on-remove="avatarUploadChange" :file-list="avatar" list-type="picture">
                <el-button type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button v-if="formType === 'add'" type="primary" @click="submitAddForm('form')">确定</el-button>
            <el-button v-if="formType === 'edit'" type="primary" @click="submitEditForm('form')">确定</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import {
    addUser,
    editUser,
    getUser
} from '@/api/user'

export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        return {
            roleOptions: [
                {
                    name: 'admin',
                    value: 'admin'
                },
                {
                    name: 'editor',
                    value: 'editor'
                }
            ],
            formType: 'add', // 表单是新增还是编辑
            form: { // 表单
                username: '', // 用户名
                nickname: '', // 昵称
                password: '', // 密码
                role: '', // 角色
                avatar: ''
            },
            rules: { // 表单验证规则
                username: [{
                    required: true,
                    message: '请输入用户名称',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }],
                nickname: [{
                    required: true,
                    message: '请输入昵称',
                    trigger: 'blur'
                }],
                role: [{
                    required: true,
                    message: '请选择角色',
                    trigger: 'change'
                }]
            },
            addQuery: {}, // 新增用户请求参数
            editQuery: {} // 编辑用户请求参数
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {

    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.$route.params.hasOwnProperty('userName') ? this.formType = 'edit' : this.formType = 'add';

        if(this.formType === 'edit') {
            let userName = this.$route.params.userName;
            this.getUser(userName);
        }
    },
    beforeCreate() {}, // 生命周期 - 创建之前
    beforeMount() {}, // 生命周期 - 挂载之前
    beforeUpdate() {}, // 生命周期 - 更新之前
    updated() {}, // 生命周期 - 更新之后
    beforeDestroy() {}, // 生命周期 - 销毁之前
    destroyed() {}, // 生命周期 - 销毁完成
    activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
    // 方法集合
    methods: {
        /**
         * 提交新增表单
         * @param {[string]} formName 表单ref名称
         */
        submitAddForm(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    self.addUser();
                    self.$router.push('/user/list')
                } else {
                    return false;
                }
            });
        },
        /**
         * 提交编辑表单
         * @param {[string]} formName 表单ref名称
         */
        submitEditForm(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    self.editUser()
                } else {
                    return false;
                }
            });
        },
        /**
         * 重置表单
         * @param {[string]} formName 表单ref名称
         */
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        /**
         * 新增用户
         */
        addUser() {
            const self = this;

            self.addQuery = self.form;
            addUser(self.addQuery).then(response => {
                if(response.code === 0) {
                    self.$message({ message: response.msg, type: 'success' });
                }
            })
        },
        /**
         * 编辑用户
         */
        editUser() {
            const self = this;

            self.editQuery = self.form;
            editUser(self.editQuery).then(response => {
                if(response.code === 0) {
                     self.$message({ message: response.msg, type: 'success' });
                }
            })
        },
        /**
         * 根据用户名获取用户信息
         */
        getUser(userName) {
            const self = this;

            getUser(userName).then(response => {
                if(response.code === 0) {
                     self.form = response.data;
                }
            })
        },
        /**
         * 头像附件文件数量发生变化时回调
         */
        avatarUploadChange(file, fileList) {

            const self = this;

            console.log("avatarUploadChange -> fileList", fileList)
            console.log("avatarUploadChange -> file", file)

            self.fileList= [];
            // fileList.forEach(function (el, index) {
            //     if (el.response && el.response.hasOwnProperty('code') && el.response.code == 0) {
            //         var obj = new Object();
            //         obj.name = el.response.data.name;
            //         obj.url = el.response.data.url;
            //         self.fileList.push(obj);
            //     } else {
            //         var obj = new Object();
            //         obj.name = el.name;
            //         obj.url = el.url;
            //         self.fileList.push(obj);
            //     }
            // });
        }
    }
}
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
.form-base {
    width: 460px;

    .el-select {
        display: block;
    }
}
</style>
