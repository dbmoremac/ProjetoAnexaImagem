const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const sql = require('mssql');
const connStr = "Server=server;Database=SATLMOREMAC;User Id=dbmoremac;Password=SA_admin!moremac;";
const multer = require('./multer');

var chavef
var num_i
//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json(
    { message: 'Funcionando!' }
    ));

    


    router.get('/clientes', (req, res) =>{
        execSQLQuery('SELECT * FROM Clientes', res);
    })


router.get('/anexo/:id?', (req, res) =>{

    let filter = '';
    let chave = req.url.toString();
    let num_item = chave.substr(1, 20)

    chavef=chave
    num_i=num_item
    
    /*console.log(req.url)
    console.log(chave.substr(7, 9));
    
    console.log(num_item.substr(15, 19));
    */
/*
    if(req.params.id) filter = ' WHERE chave_fato=' + parseInt(chave.substr(7, 9) + ' and num_item='+num_item.substr(15, 19));
    execSQLQuery('SELECT chave_fato FROM tbsaidasitem' + filter, res);
*/
    conn.request()
        .query(`select si.chave_fato,p.desc_produto_est,si.num_item,isnull(a.status,90) as status from tbsaidasitem si
         inner join tbproduto p on si.cod_produto=p.cod_produto
         left join tbzSaidasAnexoItem a on si.chave_fato=a.chave_fato and si.num_item=a.num_item
         where si.chave_fato=`+chave.substr(7, 9)+`and si.num_item=`+num_item.substr(15,19))
        .then(result => {
          
          console.log(result.recordset[0].status)
          /*  console.log(result.recordset[0].chave_fato)
            console.log(result.recordset[0].num_item)
            console.log(result.recordset[0].desc_produto_est)
            */
            
            

             
res.send(`

<html>
    <head> 
   
        <title> Anexar Documentos </title>

        <style>
            .container {
            width: 100vw;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 0;
            margin: 50;

            }

            h1{
                margin:0;
            
                display: flex;
               color:black;
                justify-content: center;
                align-items: center;
                padding: 0;
    
                }


                .circulo {
                  border-radius: 50%;
                  display: inline-block;
                  height: 20px;
                  width: 20px;
                  border: 1px solid #000000;
                  justify-content: center;
                align-items: center;
              }

            .box {
            width: auto;
            height: AUTO;
            background: #6C7A89;
            border-style: solid;
            
            }
            td{
              text-align: center;
              justify-content: center;
              align-items: center;
              height: AUTO;
              
              
            }

            .icone{
              margin:5;
            
                justify-content: top;
                align-items: center;
                padding: 0;

             
              
            }
            body {
                display: table;
                overflow:hidden; 
  padding: 100px 0;
  text-align: center;
  
  background: url('https://th.bing.com/th/id/R.0a405f288f0b19fc1223923720d9c9e6?rik=wPJxTzIj55q6tA&pid=ImgRaw&r=0') no-repeat;
  background-position: 30% 45%;
  background-color: black;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;   
           
            }



            table.blueTable {
                border: 1px solid #1C6EA4;
                background-color: #EEEEEE;
                width: AUTO;
                text-align: left;
                border-collapse: collapse;
              }
              table.blueTable td, table.blueTable th {
                border: 1px solid #AAAAAA;
                padding: 3px 2px;
              }
              table.blueTable tbody td {
                font-size: 13px;
                algin-items:center;
              }
              table.blueTable tr:nth-child(even) {
                background: #D0E4F5;
              }
              table.blueTable thead {
                background: #1C6EA4;
                background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
                background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
                background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
                border-bottom: 2px solid #444444;
              }
              table.blueTable thead th {
                font-size: 15px;
                font-weight: bold;
                color: #FFFFFF;
                border-left: 2px solid #D0E4F5;
              }
              table.blueTable thead th:first-child {
                border-left: none;
              }
              
              table.blueTable tfoot {
                font-size: 14px;
                font-weight: bold;
                color: #FFFFFF;
                background: #D0E4F5;
                background: -moz-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
                background: -webkit-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
                background: linear-gradient(to bottom, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
                border-top: 2px solid #444444;
              }
              table.blueTable tfoot td {
                font-size: 14px;
              }
              table.blueTable tfoot .links {
                text-align: right;
              }
              table.blueTable tfoot .links a{
                display: inline-block;
                background: #1C6EA4;
                color: #FFFFFF;
                padding: 2px 8px;
                border-radius: 5px;
              }
           
            </style>

        </head>
  
    <body>
    <h1>Projeto Anexa Documento a Nivel de Item</h1>
    <form action="/nova-imagem" method="POST" enctype="multipart/form-data">
    <div Class="Container">
    <table class="blueTable">
    <thead>
    <tr>
    <th>Chave Fato</th>
    <th>Num Item</th>
    <th>Desc Produto</th>
    <th>Anexo Item</th>
      <th>Status_Item</th>
      <th>Exclui Anexo</th>
    </tr>
    </thead>
    <!--
      <tfoot>
    
      <tr>
      <td colspan="4">
    <div class="links"><a href="#">&laquo;</a> <a class="active" href="#">1</a> <a href="#">2</a> <a href="#">3</a> <a href="#">4</a> <a href="#">&raquo;</a></div>
    </td>
    </tr>
    </tfoot>
    -->
    <tbody>
    <tr>
    <td>${result.recordset[0].chave_fato}</td>
    <td>${result.recordset[0].num_item}</td>
    <td>${result.recordset[0].desc_produto_est}</td>
    
    <td>

                        <!-- O NAME do input deve ser exatamente igual ao especificado na rota -->

                  
                        <input type="file" disabled name="image">
                        <!--<button type="submit" > Enviar </button>-->
                     

                      
<input type="submit" value="Enviar Anexo" disabled="disabled">
                        
                    </form>
    </td>
    
    <td>
       <div id='1' class='circulo'>
       
      
       <script>
       function colorTween(p) {
        var r1 = 0x50;
        var g1 = 0x50;
        var b1 = 0xff;
        var r2 = 0xff;
        var g2 = 0x33;
        var b2 = 0x00;
        var r3 = (256+(r2-r1)*p/100+r1).toString(16);
        var g3 = (256+(g2-g1)*p/100+g1).toString(16);
        var b3 = (256+(b2-b1)*p/100+b1).toString(16);
        return '#'+r3.substring(1,3)+g3.substring(1,3)+b3.substring(1,3);
      }

      if(${result.recordset[0].status}===90){
        document.querySelector("input[type='submit']").removeAttribute("disabled");
        document.querySelector("input[type='file']").removeAttribute("disabled");
        
            } else 
            if(${result.recordset[0].status}===0){
              document.querySelector("input[type='submit']").setAttribute("disabled", true)
              document.querySelector("input[type='file']").setAttribute("disabled", true)
                  }


    
      //TESTE DA FUNCAO:
      document.getElementById('1').style.backgroundColor = colorTween(${result.recordset[0].status});
       </script>
         
       </div>

    </td>
    <td>
    <form action="/excluir" method="POST" enctype="multipart/form-data">
    <input type="image" class="icone" src="https://th.bing.com/th/id/R.bf8087446f09f75d89eaa7c5264c6940?rik=m74tceOynr%2fmaA&riu=http%3a%2f%2ficon-icons.com%2ficons2%2f37%2fPNG%2f512%2fdelete_4219.png&ehk=f309I7Bx4sg6LgflIhVdHzdeB5d9EbFCh%2biSW9qcScM%3d&risl=&pid=ImgRaw&r=0" height ="20" width="20" />
    </form>
    </td>
    </tr>
    
    </tbody>
    </table>
    </div>
            </form>
    </body>
 
</html>
`)
           
        })


/*
    
res.send(`

<html>
    <head> 
   
        <title> Anexar Documentos </title>

        <style>
            .container {
            width: 100vw;
            height: 200;
            background: #6C7A89;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 0;
            margin: 50;

            }
            .box {
            width: auto;
            height: AUTO;
            background: #6C7A89;
            border-style: solid;
            
            }
            body {
            margin: 0px;
            background: #6C7A89;
            

            }



            table.blueTable {
                border: 1px solid #1C6EA4;
                background-color: #EEEEEE;
                width: AUTO;
                text-align: left;
                border-collapse: collapse;
              }
              table.blueTable td, table.blueTable th {
                border: 1px solid #AAAAAA;
                padding: 3px 2px;
              }
              table.blueTable tbody td {
                font-size: 13px;
              }
              table.blueTable tr:nth-child(even) {
                background: #D0E4F5;
              }
              table.blueTable thead {
                background: #1C6EA4;
                background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
                background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
                background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
                border-bottom: 2px solid #444444;
              }
              table.blueTable thead th {
                font-size: 15px;
                font-weight: bold;
                color: #FFFFFF;
                border-left: 2px solid #D0E4F5;
              }
              table.blueTable thead th:first-child {
                border-left: none;
              }
              
              table.blueTable tfoot {
                font-size: 14px;
                font-weight: bold;
                color: #FFFFFF;
                background: #D0E4F5;
                background: -moz-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
                background: -webkit-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
                background: linear-gradient(to bottom, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
                border-top: 2px solid #444444;
              }
              table.blueTable tfoot td {
                font-size: 14px;
              }
              table.blueTable tfoot .links {
                text-align: right;
              }
              table.blueTable tfoot .links a{
                display: inline-block;
                background: #1C6EA4;
                color: #FFFFFF;
                padding: 2px 8px;
                border-radius: 5px;
              }
           
            </style>

        </head>
  
    </body>
    <h1>Projeto Anexa Documento a Nivel de Item</h1>
    <div Class="Container">
    <table class="blueTable">
    <thead>
    <tr>
    <th>Chave Fato</th>
    <th>Num Item</th>
    <th>Desc Produto</th>
    <th>Anexo Item</th>
      <th>Status Anexo</th>
    </tr>
    </thead>
    <!--
      <tfoot>
    
      <tr>
      <td colspan="4">
    <div class="links"><a href="#">&laquo;</a> <a class="active" href="#">1</a> <a href="#">2</a> <a href="#">3</a> <a href="#">4</a> <a href="#">&raquo;</a></div>
    </td>
    </tr>
    </tfoot>
    -->
    <tbody>
    <tr>
    <td>Chave</td>
    <td>NumITem</td>
    <td>Desc</td>
    <td>
    <form action="/nova-imagem"  method="POST" enctype="multipart/form-data">
                        <!-- O NAME do input deve ser exatamente igual ao especificado na rota -->
                        <input type="file" name="image">
                        <button type="submit"> Enviar </button>
                    </form>
    </td>
    <td>Status</td>
    </tr>
    
    </tbody>
    </table>
    </div>
            </form>
    </body>
 
</html>
`)*/

}


)



app.post('/nova-imagem', multer.single('image'), (req, res, next) => {


    // req.file.originalname - Caminho Arquivo
/*
    console.log(req.file.originalname )    // Se houve sucesso no armazenamento Redirecionar ao caminho \\server\sige\imag
    console.log(chavef.substr(7,9))
    console.log(num_i.substr(15, 19))
*/

    let chave_fato_i=chavef.substr(7,9)
    const num_ii=num_i.substr(15, 19)
  

    if (req.file) {
        // Vamos imprimir na tela o objeto com os dados do arquivo armazenado
       
  
    
    conn.query(`
   
    INSERT INTO tbzSaidasAnexoItem(Chave_fato, Nome_arquivo, num_item,status )  VALUES('${chave_fato_i}','${'\\\\server\\SIGE\\Imagens\\'+req.file.originalname.toString()}',${num_ii},0) `, function (err, result, fields) {
        // if any error while executing above query, throw error1
        if (err) throw err;
        // if there is no error, you have the result
        console.log(result);
      });
      
      return res.send(`
<script>
    window.location = "${chavef}"
</script>
      `)//res.send('Arquivo Anexado com Sucesso');
   
      
    }

    // Se o objeto req.file for undefined, ou seja, não houve sucesso, vamos imprimir um erro!
    return res.send('Houve erro no upload!');


});

router.post('/excluir', (req, res) =>{
  let chave_fato_i=chavef.substr(7,9)
  const num_ii=num_i.substr(15, 19)

  console.log(chave_fato_i)
  conn.query(`
   
  delete tbzSaidasAnexoItem where chave_fato=${chave_fato_i} and num_item=${num_ii} `, function (err, result, fields) {
      // if any error while executing above query, throw error1
      if (err) throw err;
      // if there is no error, you have the result
      console.log(result);
    });

    return res.send(`
    
<script>
alert("Anexo Excluido com Sucesso!!")
window.location = "${chavef}"
</script>
      `)
    
})
  

/*
router.delete('/clientes/:id', (req, res) =>{
    execSQLQuery('DELETE Clientes WHERE ID=' + parseInt(req.params.id), res);
})
*/


/*
router.patch('/clientes/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    execSQLQuery(`UPDATE Clientes SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`, res);
})
*/

app.use('/', router);

//fazendo a conexão global
sql.connect(connStr)
   .then(conn => {
        global.conn = conn;
        //inicia o servidor
        app.listen(port);
        console.log('API funcionando!');
   })
   .catch(err => console.log(err));

function execSQLQuery(sqlQry, res){
    global.conn.request()
               .query(sqlQry)
               .then(result => res.json(result.recordset))
               .catch(err => res.json(err));
}