const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');
const dboper=require('./operations');


MongoClient.connect('mongodb://localhost:27017/',(err,client)=>{

assert.equal(err,null);

console.log('Conectado correctamente');

const db=client.db("conFusion");
const collection =db.collection('dishes');

dboper.insertDocument(db,{name:"Vadonut",description:"Test"},'dishes',(result)=>{

    console.log("Insertando documento : \n"+  result.ops);

    dboper.findDocument(db,'dishes',(docs)=>{
        console.log("Documento encontrado: \n"+  docs);

        dboper.updateDocument(db,{name:"Vadonut"},{description:"Update test"},'dishes',(result)=>{

             console.log("Actualizando documento : \n"+  result.result);
    
             dboper.findDocument(db,'dishes',(docs)=>{
                console.log("Documento encontrado: \n"+  docs);
                db.dropCollection('dishes',(result)=>{
                    console.log("Eliminando collection: "+  result); 

                    client.close();
                });
             });
        });

    });
}) ;


});
