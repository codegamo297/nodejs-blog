const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars').engine;
const methodOverride = require('method-override');
const app = express();
const morgan = require('morgan');
const SortMiddleware = require('./app/middlewares/SortMiddleware')
const port = 3000;
const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// app.use(bacBaoVe)
// function bacBaoVe (req, res, next) {
//     if (['vethuong', 'vevip'].includes(req.query.ve)) {
//         req.face = 'Ngày mốt!'
//         return next()
//     }
//     res.status(403).json({ message: "Access denied" })
// }

// Custom middlewares
app.use(SortMiddleware)

// HTTP logger
// app.use(morgan('combined'))

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'
                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending'
                }
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }


                const icon = icons[sortType]
                const type = types[sortType]
                return `
                    <a href="?_sort&column=${field}&type=${type}">
                        <span class="${icon}"></span>
                    </a>
                `
            }
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Home, search, contact

// Routes init
route(app);

//
app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
