'use strict';
const StudentModel = require('../models/studentSchema');

module.exports = [
    { 
        method: 'GET', 
        path: '/',
         config: 
         {
            handler: async (request, h) => {
                try {
                    let student = await StudentModel.find().exec();
                    return h.response(student);
          
                    } catch(err){
                        return h.response(err).code(500);
               }
           } 
        }
    }, 
    { 
        method: 'POST', 
        path: '/add',
        handler: async (request, h) => {
             try {
                let student = new StudentModel(request.payload); //req body on hapi
                let result = await student.save();
                return h.response(result);
          
                } catch(err){
                    return h.response(err).code(500);
            }
        } 
    
    },   
]