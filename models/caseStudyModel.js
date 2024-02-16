const { Schema, default: mongoose } = require('mongoose');
//     solution: string;
//     clientName: string;


const caseStudySchema = new Schema({
    projectTitle: {
        type: String,
        required: [true, 'project title required']
    },
    projectSubtitle: {
        type: String,
        required: [true, 'project subtitle is required']
    },
    projectDescription: {
        type: String,
        required: [true, 'project description is required']
    },
    projectOverview: {
        type: String,
        required: [true, 'project overview is required']
    },
    problem: {
        type: String,
        required: [true, 'problem is required']
    },
    solution: {
        type: String,
        required: [true, 'solution is required']
    },
    clientName: {
        type: String,
        required: [true, 'client name is required']
    },
    projectTimeline: {
        type: String,
        required: [true, 'project timeline is required']
    },
    projectCategory: {
        type:  String,
        required: [true, 'project category is required']
    },
    servicesProvides: {
        type: String,
        required: [true, 'services provided fields is required']
   },
   coverPhoto: {
    type: String,
    required: [true, 'cover photo is required']
   }
}, 
{ timestamps: true}
)


module.exports = mongoose.model('CaseStudy', caseStudySchema)