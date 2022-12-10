/* deps */
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
/* validations */
import { loginValidation, postCreateValidation, registerValidation } from './validations.js'
/* middleware */
import checkAuth from './utils/checkAuth.js'
import handleValidationErrors from './utils/handleValidationErrors.js'
/* the functions */
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'


/* vars */
const CLUSTER_ADRESS = 'mongodb+srv://yung:dune@cluster0.6j7kqnf.mongodb.net/blogio?retryWrites=true&w=majority'




/* DB */
mongoose.set('strictQuery', true)

mongoose.connect(CLUSTER_ADRESS)
        .then(() => {
            console.log('DB is alright fam')
        })
        .catch((err) => {
            console.log('DB error cuh, feels bad', err)
        })

/* multer storage for img */
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer ({ storage })



/* Express */
const app = express()

app.use(express.json())

app.get ('/', (req, res) =>{ 
    res.status(200).send('<h1> Chinazus :) <h1>')
})

// register
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
//login
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
//auth/me
app.get('/auth/me', checkAuth, UserController.getMe)
//post 
app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update)
// img uploads
app.use('/uploads', express.static('uploads'))
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})



app.listen(4000, (err) => {
    if(err){
        return(console.log(err))
    }

    console.log('All good cuh')
})