require('dotenv').config()
const express = require('express');
const app = express();
const connectDb = require('./db/connectDb')
const blogRoute = require('./routes/blogRoute');
const caseStudyRoute = require('./routes/caseStudyRoute')
const newsletterRoute = require('./routes/newsLetterRoute')
const userRoute = require('./routes/userRoute')
const cookieParser = require('cookie-parser')
const cloudinary = require('cloudinary').v2
const fileUpload = require('express-fileupload')
const appNotFound = require('./middleware/appNotFound')
const cors = require('cors')
const helmet = require('helmet');
const rateLimit = require('express-rate-limit')


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// security packagess
app.use(cors({
  origin: 'http://example.com'
}));
app.use(helmet())
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);


// middlewares
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.json());
app.use(fileUpload({useTempFiles: true}))


// routes
app.use('/api', userRoute)
app.use('/api/blog', blogRoute)
app.use('/api/case-study', caseStudyRoute)
app.use('/api/subscribe', newsletterRoute)
app.use(appNotFound)

// db connection

const port = process.env.PORT || 6080
const startDb = async () => {
    await connectDb(process.env.MONGODB_URI)

    app.listen(port, () => {
        console.log('db up and running')
    })
}


startDb()
