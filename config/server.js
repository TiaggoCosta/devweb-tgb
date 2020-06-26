require('dotenv').config();
module.exports = function(){
    var express = require('express');

    var app = express();
    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    
    var rotas= require('../app/routes/web');
    rotas(app);
    
    app.listen(process.env.PORT, function(){
        console.log('localhost: ' + process.env.PORT);
    });

};

