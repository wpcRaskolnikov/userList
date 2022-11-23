import http from 'node:http';
import url from 'node:url';
import querystring from "node:querystring";
import mongoose from "mongoose";
import './connection.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    password: String,
    email: String,
    hobbies: [String]
});

const User = mongoose.model('User', userSchema);

http.createServer(async (request, response) => {
    const method = request.method;
    const {pathname, query} = url.parse(request.url, true);

    if (method === 'GET') {
        response.writeHead(200, {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        if (pathname === '/list') {
            let users = await User.find();
            response.end(JSON.stringify(users));
        } else if (pathname === '/remove') {
            await User.findOneAndDelete({_id: query.id});
            response.end("Delete success");
        }else if(pathname==='/modify'){
            let user = await User.findOne({ _id: query.id });
            response.end(JSON.stringify(user));
        }
    } else if (method === 'POST') {
        if (pathname === '/add') {
            let formData = '';
            request.on('data', param => {
                formData += param;
            })
            request.on('end', async () => {
                let user = querystring.parse(formData)
                await User.create(user);
                response.writeHead(301, {
                    Location: 'http://localhost:3000'
                });
                response.end();
            })

        } else if (pathname === '/modify') {
            let formData = '';
            request.on('data', param => {
                formData += param;
            })
            request.on('end', async () => {
                let user = querystring.parse(formData)
                await User.updateOne({_id: query.id}, user);
                response.writeHead(301, {
                    Location: 'http://localhost:3000'
                });
                response.end();
            })
        }
    }

}).listen(8080);

console.log("Server running at http://127.0.0.1:8080");