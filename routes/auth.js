const {Router} = require('express')
const User = require('../models/user')
const router = Router()

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    })
})

router.post('/login', async (req, res) => {
    const user = await User.findById('5f06fafb7bf03668347778ef')
    req.session.user = user
    req.session.isAuthenticated = true
    req.session.save(err => {
        if(err){
            throw err
        }

        res.redirect('/')
    })
})

router.get('/logout', async (req, res) => {
    // Clear session
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })
})

module.exports = router
