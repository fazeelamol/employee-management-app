const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})

const EmployeeModel = mongoose.model('Employee', EmployeeSchema); //Employee collection is connecting to EmployeeSchema
module.exports = EmployeeModel; //Exporting Employee model to use in other files