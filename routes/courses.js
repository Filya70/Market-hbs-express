const {Router} = require('express');
const router = Router()
const Course = require('../models/course')

router.get('/', async (req, res) => {
    const courses = await Course.find().lean()
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses
    })
})

router.get('/:id/edit', async (req, res) => {
    if(!req.query.allow){
        return res.redirect('/')
    }

    const course = await Course.findById(req.params.id).lean()

    res.render('course-edit', {
        title: `Редактирование ${course.title}`,
        course
    })
})

router.post('/edit', async (req, res) => {
    await Course.findOneAndUpdate(req.body.id, req.body)
    res.redirect('/courses')
})

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id).lean()
    res.render('course', {
        layout: 'empty',
        title: `Курс ${course.title}`,
        course
    })
})

module.exports = router