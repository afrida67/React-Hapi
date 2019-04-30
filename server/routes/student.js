'use strict';
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secretkey23456';

const StudentModel = require('../models/studentSchema');

module.exports = [
    { 
        method: 'GET', 
        path: '/',
        config: {
            auth : {
                strategy : 'jwt',
                mode     : 'optional'
                }
         },
        handler: async (request, h) => {
             try {
                let student = await StudentModel.find().exec();
                    return h.response(student);
          
                } catch(err){
                     return h.response(err).code(500);
            }
        } 
    }, 
    { 
        method: 'GET', 
        path: '/add',
        handler: async (request, h) => {
            try {
                return 'hi';
               } catch(err){
                   return h.response(err).code(500);
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
            auth : {
                strategy : 'jwt',
                mode     : 'required'
                }

        },
        handler: async (request, h) => {
             try {
                let salt = bcrypt.genSaltSync(10);
                request.payload.password = bcrypt.hashSync(request.payload.password, salt);

                let student = new StudentModel(request.payload); //req body on hapi
                let result = await student.save();
                return h.response(result);
          
                } catch(err){
                    return h.response(err).code(500);
            }
        } 
    
    },  
    //delete
    { 
        method: 'GET', 
        path: '/delete/{id}',
        config: {
            auth : {
                strategy : 'jwt',
                mode     : 'optional'
                }
         },
         handler: async (request, h) => { 
            try {
                
                let student = await StudentModel.findByIdAndDelete({_id:request.params.id});
                   return h.response(student);
              
            } catch (err) {
                return h.response(err).code(500);
            }
        }
    },
    //update
    { 
        method: 'POST', 
        path: '/update/{id}',
        config: {
            auth : {
                strategy : 'jwt',
                mode     : 'optional'
                }
         },
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
     //login
     {
        method: 'GET',
        path: '/login',
        options: {
            auth : {
                strategy : 'jwt',
                mode     : 'optional'
            }
            },
            handler: async (request, h) => {

                if (request.auth.isAuthenticated) {
                    return h.redirect('/');     
                }
               //return error msg
            }
    },
    {
        method: 'POST',
        path: '/login',
        options: {
            auth: {
                strategy : 'jwt',
                mode     : 'optional'
            },
            handler: async (request, h) => {

                let message = 'Invalid username or password';
           
                const { username, password } = request.payload;
                if (!username || !password) {
                    //give an error message on front
                }
        
                let user = await StudentModel.findOne({
                  username
                });
               // console.log(user);
                let account = user && (await bcrypt.compareSync(password, user.password));

                if (!account) {
                     //give an error message on front
                }
                //create token
            const  expiresIn  =  24  *  60  *  60;
            const  token  =  jwt.sign({ id:  account.id }, SECRET_KEY, {
                expiresIn:  expiresIn
            });
               console.log(`token= ${token}`);
            //console.log(user.username);
            return {token, uname: user.username};
           //  return h.response({token: token}).code(201);
            }
        }
    },
]