var app = require('koa')();
var router = require('koa-router')();
const serve   = require('koa-static');
const send    = require('koa-send');

app.use(serve(__dirname + '/../statics'));
app.use(serve(__dirname + '/../build'));

// homepage - Ad
var homeAdData = require('./home/ad.js')
router.get('/api/homead', function *(next) {
    console.log('homepage - Ad')

    this.body = homeAdData
});

// homepage - list
var homeListData = require('./home/list.js')
router.get('/api/homelist/:city/:page', function *(next) {
    console.log('homepage - list')

    // parameter
    const params = this.params
    const paramsCity = params.city
    const paramsPage = params.page

    console.log('current city:' + paramsCity)
    console.log('current page:' + paramsPage)

    this.body = homeListData
});

// search page - three parameters
var searchListData = require('./search/list.js')
router.get('/api/search/:page/:city/:category/:keyword', function *(next) {
    console.log('search page - result')

    // parameter
    const params = this.params
    const paramsPage = params.page
    const paramsCity = params.city
    const paramsCategory = params.category
    const paramsKeyword = params.keyword

    console.log('current page:' + paramsPage)
    console.log('current city:' + paramsCity)
    console.log('category:' + paramsCategory)
    console.log('keyword:' + paramsKeyword)

    this.body = searchListData
})
// search page - two parameters
router.get('/api/search/:page/:city/:category', function *(next) {
    console.log('search page - result')

    // parameter
    const params = this.params
    const paramsPage = params.page
    const paramsCity = params.city
    const paramsCategory = params.category

    console.log('current page:' + paramsPage)
    console.log('current city:' + paramsCity)
    console.log('category:' + paramsCategory)

    this.body = searchListData
})

// detail page - rasteraunt
const detailInfo = require('./detail/info.js')
router.get('/api/detail/info/:id', function *(next) {
    console.log('detail page - rasteraunt')

    const params = this.params
    const id = params.id

    console.log('rasteraunt id: ' + id)

    this.body = detailInfo
})
// detail page - comments
const detailComment = require('./detail/comment.js')
router.get('/api/detail/comment/:page/:id', function *(next) {
    console.log('detail page - comments')

    const params = this.params
    const page = params.page
    const id = params.id

    console.log('rasteraunt id: ' + id)
    console.log('current page:' + page)

    this.body = detailComment
})

// order
const orderList = require('./orderlist/orderList.js')
router.get('/api/orderlist/:username', function *(next) {
    console.log('order list')

    const params = this.params
    const username = params.username
    console.log('username' + username)

    this.body = orderList
})

// submit comments
router.post('/api/submitComment', function *(next) {
    console.log('submit comments')

    // get paremeter
    this.body = {
        errno: 0,
        msg: 'ok'
    }
})

app.use(router.routes())
    .use(router.allowedMethods());

app.use(function* index() {
    yield send(this, '/index.html');
});      

app.listen(3000);
console.log('server runs on 3000');
