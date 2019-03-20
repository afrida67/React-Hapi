'use strict';
const hapi = require('hapi');
const mongoose = require('mongoose');
const routes = require('./routes/student');

const server = hapi.server({
    host: 'localhost',
    port: Number(process.argv[2] || 5000),
});

mongoose.connect('mongodb://localhost:27017/studentdb', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log(`Error in DB connection : ${err}`)}
});

const init = async () => {

    try {

        server.route(routes);
        await server.start();
    
        console.log(`Server started at: ${server.info.uri}`);
        } catch (err) {
            console.error(err.stack);
            process.exit(1);
        }
    };
    
init();