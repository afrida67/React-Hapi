'use strict';
const joi = require('joi');
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
        options: {
            validate: {
                payload: {
                    username: joi.string().alphanum().min(3).max(7).required(),
                    name: joi.string().required(),
                    email: joi.string().email({ minDomainAtoms: 2 }),
                    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
                },
                failAction: (request, h, err) => {
                    return err.isJoi ? h.response(err.details[0]).takeover() : h.response(err).takeover();
                }
            }, 
        },
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
    //update
    { 
        method: 'POST', 
        path: '/update/{id}',
        handler: async (request, h) => { 
            try {
                
                let student = await StudentModel.findById(request.params.id);
                student.username = request.payload.username;
                student.name = request.payload.name;
                student.email= request.payload.email;
                student.password = request.payload.password;

                let result = await student.save();
                return h.response(result);

            } catch (err) {
                return h.response(err).code(500);
            }
        }
    }, 
    //delete
    { 
        method: 'GET', 
        path: '/delete/{id}',
        handler: async (request, h) => { 
            try {
                
                let result = await StudentModel.findByIdAndDelete(request.params.id);
                return h.response(result);

            } catch (err) {
                return h.response(err).code(500);
            }
        }
    },

]