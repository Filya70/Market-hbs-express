const {Router} = require('express');
const router = Router()
const Courses = require('../models/course')

router.get('/', async (req, res) => {
    const courses = await Courses.getAll()
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses
    })
})

module.exports = router