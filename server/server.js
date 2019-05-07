'use strict';

const hapi = require('hapi');
const mongoose = require('mongoose');
const hapiauthjwt2 = require('hapi-auth-jwt2');

const StudentModel = require('./models/studentSchema');

const routes = require('./routes/student');

const server = hapi.server({
    host: 'localhost',
    port: Number(process.argv[2] || 5000),
    routes: {cors: true}
});

mongoose.connect('mongodb://localhost:27017/studentdb', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log(`Error in DB connection : ${err}`)}
});

// bring your own validation function
const validate = async (decoded, request, h) => {

    const student = await StudentModel.findOne({ _id: decoded.id });

    if (student) {
      return { isValid: true, credentials: decoded };
    } else {
      return { isValid: true };
    }
  };

const init = async () => {

    try {

        await server.register(hapiauthjwt2);

        server.auth.strategy('jwt', 'jwt', {
            key: 'secretkey23456',
            validate: validate,
            verifyOptions: { algorithms: ['HS256'] }
          });
          
        server.auth.default('jwt');
       
        server.route(routes);
        await server.start();
    
        console.log(`Server started at: ${server.info.uri}`);
        } catch (err) {
            console.error(err.stack);
            process.exit(1);
        }
    };
    
init();