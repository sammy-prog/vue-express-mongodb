const express = require('express');
const cors = require('cors');

//initialize app with express
const app = express();

//Middlewares
//express has now built in body-parser
app.use(express.json());
//allow or restrict requested resources on web server
//eg: in dev phase frontend & backend domain origins/ports differ so use cors
app.use(cors()); 

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

//handle production/routes
if(process.env.NODE_ENV === 'production') {
    //Static folder
    app.use(express.static(__dirname + '/public/'));

    //Handle SPA(single page apps)
    //all routes point to index.html, put below other routes 
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

