const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const graphql = require('express-graphql');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const { graphqlUploadExpress } = require('graphql-upload');
const cors = require('cors');
const typeDefs = importSchema('./graphQL/schema/index.graphql');
const resolvers = require('./graphQL/resolvers/index.js');
const isAuth = require('./middleware/isAuth');

app.use(cors());
app.use(bodyParser.json());
app.use(isAuth);
app.use('/uploads', express.static('uploads'))
app.use('/graphql', 
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    graphql({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true
}));

app.get('/',(req, res) => {
    res.sendStatus(200);
});

io.sockets.on('connection',(socket) => {
    let urlRoom;
    
    socket.on('message',(data) => {
        io.to(urlRoom).emit('getMessage',data)
    });

    socket.on('connectToRoom',(url) => {
        urlRoom = url;
        socket.join(urlRoom);
    })
});

mongoose.connect("mongodb://localhost:27017/SalePlace", { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) throw new Error(error)
    http.listen(2001,() => console.log('Server has started'))
})