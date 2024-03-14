const newsRouter = require('./news')
const meRouter = require('./me')
const siteRouter = require('./site')
const coursesRouter = require('./courses')

function route(app) {
    // Đăng kí một middleware (route)
    app.use('/news', newsRouter)
    app.use('/me', meRouter)
    app.use('/courses', coursesRouter)

    app.use('/', siteRouter)
}

module.exports = route
