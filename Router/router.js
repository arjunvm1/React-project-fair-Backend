const express = require('express')
const router = new express.Router()
const userController = require('../Controller/userController')
const projectController = require('../Controller/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')


// register api

router.post('/user/register',userController.register)


// login api

router.post('/user/login',userController.login)

//addProject

router.post('/projects/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)


//getUserProjects

router.get('/user/allprojects',jwtMiddleware,projectController.allUserProjects)

//getallProjects

router.get('/projects/all',jwtMiddleware,projectController.getallProjects)

//gethomeProjects

router.get('/projects/homeprojects',projectController.getHomeProjects) 

//editprojects

router.put('/projects/edit/:id', jwtMiddleware, multerConfig.single('projectImage'), projectController.editProjectController)

//deleteProject

router.delete('/projects/remove/:id', jwtMiddleware, projectController.deleteProjectController)





//export router
module.exports=router

