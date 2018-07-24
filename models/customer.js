const Joi = require('joi'); 
const mongoose = require('mongoose'); 

const customerSchema = new mongoose.Schema({
    isGold : { 
        type : Boolean, 
        default : false
    },
    name : {
        type : String, 
        minlength : 5, 
        maxlength : 50, 
        required : true, 
    }, 
    phone : { 
        type : String, 
        length : 20, 
        required : true
    }
});

const Customer = mongoose.model('Customer', customerSchema); 

function validateCustomer(customer){
    const schema = {
        name : Joi.string().min(5).max(50).required(), 
        phoneNumber : Joi.string().min(9).max(20).required(), 
        isGold : Joi.boolean()
    }
    return Joi.validate(customer, schema);
}

exports.customerSchema = customerSchema; 
exports.Customer = Customer; 
exports.validateCustomer = validateCustomer;