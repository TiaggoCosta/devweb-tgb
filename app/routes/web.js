var clienteModel = require('../models/clientesModel')();//importa e executa

module.exports = function(app){
    app.get('/contato', function(req,res){
        res.render('site/contato.ejs');
    });
    
    app.get('/', function(req,res){
        //console.log(clienteModel.all());
        var listaClientes = clienteModel.all();//pega a lista de clientes
        res.render('site/home',{clientes:listaClientes}); //envia como objeto para view
    });

};

