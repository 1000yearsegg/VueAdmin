import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// console.log('modulesFiles----', modulesFiles);
// console.log('modulesFiles.keys()----', modulesFiles.keys());

// modulesFiles.keys()
// ["./app.js", "./errorLog.js", "./permission.js", "./settings.js", "./tagsView.js", "./user.js"]

// reduce((累加的值， 当前值)=>{}, 初始值)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default

    // console.log('modulePath----', modulePath);
    // console.log('moduleName----', moduleName);
    // console.log('value----', value);
    // console.log('modules----', modules);
    return modules
}, {})

const store = new Vuex.Store({
    modules,
    getters
})

export default store
