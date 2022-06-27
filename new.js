const fs = require('fs')
const readline = require('readline')
let filePath
let reactCom,style
let rlcount = 0
fs.readFile('src/pages/auto/index.js', function (err, data) {
    if (err) {
        throw err
    }
    reactCom = data.toString()
})
fs.readFile('src/pages/auto/index.less', function (err, data) {
    if (err) {
        throw err
    }
    style = data.toString()
})
function writeAuthor(name){
    if (name) {
        reactCom = reactCom.replace('yourName', name)
    }
}
function writeReact(name) {
    if (name) {
        reactCom = reactCom.replace(/AutoCom/g, name)
    }
    fs.mkdir(`src/pages/${filePath}`, function () {
            fs.writeFile(`src/pages/${filePath}/index.js`, reactCom, function (err, data) {
                 if (err) { throw err }
                 })
            fs.writeFile(`src/pages/${filePath}/index.less`, style, function (err, data) {
                 if (err) { throw err }
                 })
    })
}
console.log('此工具会自动帮你生成一个极为基础的列表页面以便进行后续开发')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.question('请输入页面目录名称> ', (input) => {
    rlcount++
    if (rlcount === 1) {
        fs.exists(`src/view/${input}`, function (exists) {
            if (exists) {
                console.log('目录已经存在，无法创建')
            } else {
                filePath = input
                pop0()
            }
        })
    }
})
function pop0() {
    rl.question('请输入作者名', (input) => {
        rlcount++
        if (rlcount === 2) {
            writeAuthor(input)
            pop1()
        }
    })
}
function pop1() {
    rl.question('请输入组件的name（首字母请大写）> ', (input) => {
        rlcount++
        if (rlcount === 3) {
            writeReact(input)
            rl.close()
        }
    })
}


