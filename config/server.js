
module.exports = function(){
    var express = require('express');

    var app = express();
    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    
    var rotas= require('../app/routes/web');
    rotas(app);;
    
    app.listen(3000, function(){
        console.log('localhost: 3000');
    });

};

