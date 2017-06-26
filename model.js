
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var core_use = require('cors');
var pg = require('pg');

app.use(core_use());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
var config = {
  user: 'postgres', //env var: PGUSER 
  database: 'consomeAPI', //env var: PGDATABASE 
  password: 'postgres', //env var: PGPASSWORD 
  port: 5432, //env var: PGPORT 
  max: 10, // max number of clients in the pool 
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
};

var pool = new pg.Pool(config);

// rota com protocolo GET para seleção no banco de dados
app.get('/consulta', function (req, res) {
	
	// to run a query we can acquire a client from the pool, 
	// run a query on the client, and then return the client to the pool 
	pool.connect(function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('SELECT * from produtos order by codigo', 
      function(err, result) {
		//call `done()` to release the client back to the pool 
		done();
	 
		if(err) {
		  return console.error('error running query', err);
		}
		res.setHeader('Access-Control-Allow-Origin','*');
		console.log(result.rows);
    res.json(result.rows); // servidor retorna a consulta em formato json
			
		});
	});
});

// rota com protocolo POST para inserção no banco de dados
app.post('/insere', function (req, res) {

// to run a query we can acquire a client from the pool, 
// run a query on the client, and then return the client to the pool 
//var registro = {codigo:'4', nome:'medalha', qtde:'100', valor: '5.0'};
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('insert into produtos (codigo, nome, telefone, cep, valor) values (' + req.body.codigo + ', \'' 
    + req.body.nome + '\', ' 
    + req.body.tel1 + ',' 
    + req.body.cep + ',' 
    + req.body.valor + ')', function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }

    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});

// rota com protocolo DELETE para remoção no banco de dados
app.delete('/remove/:codigo', function (req, res) {

// to run a query we can acquire a client from the pool, 
// run a query on the client, and then return the client to the pool 
var codigo = req.params.codigo
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('delete from produtos where codigo = ' + 
	codigo, function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }

    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});

// rota com protocolo PUT para atualização no banco de dados
app.put('/atualiza', function (req, res) {

pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('update produtos set nome = \'' + req.body.nome 
    + '\', telefone = ' + req.body.tel1 
    + ', cep = ' + req.body.cep 
    + ', valor = ' + req.body.valor
    + ' where codigo = '+ req.body.codigo , function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});



// rota com protocolo GET para seleção no banco de dados
app.get('/consultaVendas', function (req, res) {
  
  // to run a query we can acquire a client from the pool, 
  // run a query on the client, and then return the client to the pool 
  pool.connect(function(err, client, done) {
    if(err) {
    return console.error('error fetching client from pool', err);
    }
    client.query('SELECT vendas.codigo, vendas.codigoproduto, vendas.valor, vendas.data, produtos.nome from vendas, produtos where vendas.codigoproduto = produtos.codigo', 
      function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
   
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    console.log(result.rows);
    res.json(result.rows); // servidor retorna a consulta em formato json
      
    });
  });
});



// rota com protocolo POST para inserção no banco de dados
app.post('/insereVendas', function (req, res) {

// to run a query we can acquire a client from the pool, 
// run a query on the client, and then return the client to the pool 
//var registro = {codigo:'4', nome:'medalha', qtde:'100', valor: '5.0'};
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('insert into vendas (codigo, codigoproduto, data, valor) values (' + req.body.codigo + 
    ', ' + req.body.codigoproduto + ', \'' + req.body.data + '\',' + req.body.valor + ')', function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      console.log('Codigo do produto ' + req.body.codigoproduto);
      console.log('Nome do produto ' + req.body.nome);
      return console.error('error running query', err);
    }

    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});

// rota com protocolo DELETE para remoção no banco de dados
app.delete('/removeVendas/:codigo', function (req, res) {

// to run a query we can acquire a client from the pool, 
// run a query on the client, and then return the client to the pool 
var codigo = req.params.codigo
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('delete from vendas where codigo = ' + 
  codigo, function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }

    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});

// rota com protocolo PUT para atualização no banco de dados
app.put('/atualizaVendas', function (req, res) {

pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('update vendas set data = \'' + 
    req.body.data + '\', valor = ' + req.body.valor + 
    ', codigoproduto = ' + req.body.codigoproduto + ' where codigo = '+
    req.body.codigo , function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});


app.listen(3000)


