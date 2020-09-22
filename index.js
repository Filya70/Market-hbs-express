require('dotenv').config()
const express = require('express');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const path = require('path')
const mongoose = require('mongoose')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')
const User = require('./models/user')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main', 
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

const store = new MongoStore({
    collection: 'sessions',
    uri: process.env.URL
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}))

app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000


async function start () {
    try {
        const url = process.env.URL
        await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
        })
        
        app.listen(PORT, () => {
        console.log(`Sever has been started on port ${PORT}`);
    })
    } catch (e) {
        console.log(e);
    }
}

start()


