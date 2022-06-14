const express = require('express')
const app = express()

//跨域cors 
app.use(require('cors')())
app.use(express.json())
// 创建mongoose数据表
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', {
    // 报错MongoParseError: options usefindandmodify, usecreateindex are not supported取消下面3行注释掉
    // useNewUrlParser: true,
    // useFindAndModify: true,
    // useCreateIndex: true,
})

// mongoose数据存储
const Article = mongoose.model('Article', new mongoose.Schema({
    title: { type: String },
    body: { type: String },
}))

// 测试页
app.get('/', async (req, res) => {
    res.send('测试')
})
//增
app.post('/api/articles', async (req, res) => {
    // 赋值字段
    const article = await Article.create(req.body)
    res.send(article)
})
//列表
app.get('/api/articles/', async (req, res) => {
    const articles = await Article.find()
    res.send(articles)
})
//删
app.delete('/api/articles/:id', async (req, res) => {
    // Delete参数错误 改为Remove跟前端delete同步执行
    await Article.findByIdAndRemove(req.params.id)
        res.send({
            status: true
        })
})

// 查
app.get('/api/articles/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.send(article)
})
// 改
app.put('/api/articles/:id', async (req, res) => {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body)
    res.send(article)
})
// 监听3001
app.listen(3001, () => {
    console.log('http://localhost:3001/')
})