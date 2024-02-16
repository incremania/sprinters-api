const CaseStudy = require('../models/caseStudyModel');

const createCaseStudy = async (req, res) => {
    try {
      const caseStudy = await CaseStudy.create(req.body);
      res.status(201).json({ caseStudy })
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const getAllCaseStudy = async (req, res) => {
    try {
        const caseStudy = await CaseStudy.find({})
        res.status(200).json({ nbHits: caseStudy.length,caseStudy})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
}

const getSingleCaseStudy = async (req, res) => {
    try {
       const { caseStudyId } = req.params;
       const caseStudy = await CaseStudy.findById(caseStudyId)
       if(!caseStudy) return res.status(404).json({ error: `no casestudy with id  ${caseStudyId}`})

       res.status(200).json({ caseStudy }) 
    } catch (error) {
        res.status(500).json({ error })
    }  
}

const updateCaseStudy = async (req, res) => {
    try {
        const { caseStudyId } = req.params
        const caseStudy = await CaseStudy.findByIdAndUpdate(caseStudyId, req.body, {
            new: true,
            runValidators: true
        })
        if(!caseStudy) return res.status(404).json({ error: `no caseStudy with id  ${caseStudyId}`})

        res.status(200).json({ caseStudy })
    } catch (error) {
        console.log(error);
    }

}

const deleteCaseStudy = async (req, res) => {
    try {
        const { caseStudyId } = req.params;
        const caseStudy = await CaseStudy.findByIdAndDelete(caseStudyId);
        if(!caseStudy) return res.status(404).json({ error: `no caseStudy with id  ${caseStudyId}`})
        res.status(500).json({ msg: 'caseStudy deleted successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
}

module.exports = {
    createCaseStudy,
    getSingleCaseStudy,
    getAllCaseStudy,
    updateCaseStudy,
    deleteCaseStudy

}