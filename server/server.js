'use strict';
const hapi = require('hapi');

const server = hapi.server({
    host: 'localhost',
    port: Number(process.argv[2] || 5000),
});


const init = async () => {

    try {

        server.route({
            method: 'GET',
            path: '/hd',
            handler: async (request, h) => {
               return 'tada';
            }
        })
    
        await server.start();
    
        console.log(`Server started at: ${server.info.uri}`);
        } catch (err) {
            console.error(err.stack);
            process.exit(1);
        }
    };
    
init();