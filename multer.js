const multer = require('multer');



// Vamos exportar nosso módulo multer, executando com as nossas configurações em um objeto.
module.exports = (multer({
  
    storage: multer.diskStorage({
       
        destination:(req,file,cb)=>{
            cb(null,'\\\\server\\SIGE\\Imagens\\' )
        },

        filename: (req, file, cb) => {
            
            // Setamos o nome do arquivo que vai ser salvado no segundo paramêtro
            // Apenas concatenei a data atual com o nome original do arquivo, que a biblioteca nos disponibiliza.
            cb(null,  file.originalname);
            
        }
    }

    ),

    fileFilter: (req, file, cb) => {
     
        // Procurando o formato do arquivo em um array com formatos aceitos
           // A função vai testar se algum dos formatos aceitos do ARRAY é igual ao formato do arquivo.
        const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find( formatoAceito => formatoAceito == file.mimetype );

        // O formato do arquivo bateu com algum aceito?
        if(isAccepted){
            // Executamos o callback com o segundo argumento true (validação aceita)
            return cb(null, true);
        }
        
        // Se o arquivo não bateu com nenhum aceito, executamos o callback com o segundo valor false (validação falhouo)
        return cb(null, false);
}

    

})

);