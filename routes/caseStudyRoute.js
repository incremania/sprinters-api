const express = require('express');
const router = express.Router();
const {
    createCaseStudy,
    getSingleCaseStudy,
    getAllCaseStudy,
    updateCaseStudy,
    deleteCaseStudy

} = require('../controllers/caseStudyController')
const { caseStudyImageUpload, caseStudyImageUpdate} = require('../controllers/imageUpload')
const { authenticateUser } = require('../utils/token')


router
.post('/', authenticateUser, createCaseStudy)
.post('/image', authenticateUser, caseStudyImageUpload)
.get('/all', getAllCaseStudy)
.get('/:caseStudyId', getSingleCaseStudy)
.patch('/:caseStudyId', authenticateUser, updateCaseStudy)
.patch('/:caseStudyId/image', authenticateUser, caseStudyImageUpdate)
.delete('/:caseStudyId', authenticateUser, deleteCaseStudy)


module.exports = router