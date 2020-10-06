const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const hostname='localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes', (req,res,next)=> {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();

});

app.get('/dishes',(req,res,next)=>{
    res.end('will send all the dishes');
});
app.post('/dishes',(req,res,next)=>{
    res.end('Will add the dish: '+req.body.name+'with details:'+ req.body.description);

});
app.put('/dishes',(req,res,next)=> {
    res.statusCode=403;
    res.end("this operation doesn't make any sense");
});
app.delete('/dishes',(req,res,next)=>{
    res.end("Deleting all the dishes");
});
app.get('/dishes/:dishId',(req,res,next)=>{
    res.end('will send details of the dish: '+req.params.dishId+" to you");
});
app.post('/dishes/:dishId',(req,res,next)=>{
    res.end('Post not supported for dishes for dish id: '+req.params.dishId);

});
app.put('/dishes/:dishId',(req,res,next)=> {
    res.write('Updating the dish '+req.params.dishId);
    res.end('will update the dish: '+req.body.name
    +'with details: '+req.body.description);
    res.end("this operation doesn't make any sense");
});
app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end("Deleting all the dishes");
});
app.use(express.static(__dirname + '/public'));
app.use((req,res, next) =>{
    console.log(req.headers);
    res.statusCode=200;
    res.setHeader('content-Type','text/html');
    res.end('<html><body><h1>This is an express server</h1></body></html>');
});
const server= http.createServer(app);

server.listen(port, hostname, ()=>{
    console.log(`server running at http://${hostname}:${port}/`);
});