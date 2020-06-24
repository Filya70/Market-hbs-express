const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная',
        isHome: true
    })
})

app.get('/courses', (req, res) => {
    res.render('courses', {
        title: 'Курсы',
        isCourses: true
    })
})

app.get('/add', (req, res) => {
    res.render('add', {
        title: 'Добавить курсы',
        isAdd: true
    })
})




const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Sever has been started on port ${PORT}`);
})