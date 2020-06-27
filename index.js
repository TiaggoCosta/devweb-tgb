require('dotenv').config();
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    
var todoRoutes = require("./app/routes/todos");
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +'/app/views/public'));
app.use(express.static(__dirname + '/app/views'));

app.get('/', (req, res) => {
 	res.render(__dirname +'/app/views/site/index.ejs');
});

app.use('/api/todos', todoRoutes);

app.listen(process.env.PORT, function(){
	console.log("Aplicação rodando na porta " + process.env.PORT);
});
