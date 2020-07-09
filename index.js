const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path')
const mongoose = require('mongoose')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000


async function start () {
    try {
        const url = `mongodb+srv://Filya:Q1w2e3r4@cluster0.pabpm.mongodb.net/MarketHbs`
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


