const {Router} = require('express');
const router = Router()
const Course = require('../models/course')
const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
    const courses = await Course.find().lean()
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses
    })
})

router.get('/:id/edit', auth, async (req, res) => {
    if(!req.query.allow){
        return res.redirect('/')
    }

    const course = await Course.findById(req.params.id).lean()

    res.render('course-edit', {
        title: `Редактирование ${course.title}`,
        course
    })
})

router.post('/edit', auth, async (req, res) => {    
    await Course.updateOne({_id: req.body._id}, {
        title: req.body.title,
        img: req.body.img,
        price: req.body.price
    })
    res.redirect('/courses')
})

router.post('/remove', auth, async (req, res) => {
    try {
        await Course.deleteOne({_id: req.body.id})
        res.redirect('/courses')
    } catch (e) {
        console.log(e);
    }

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