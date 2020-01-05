const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');


MongoClient.connect('mongodb://localhost:27017/',(err,client)=>{

assert.equal(err,null);

console.log('Conectado correctamente');

const db=client.db("conFusion");
const collection =db.collection('dishes');

collection.insertOne({"name":"UthaPizza","description":"test"},(err,result)=>{

    assert.equal(err,null);
    console.log('Despues de insertar:\n');
    console.log(result.ops);

    collection.find({}).toArray((err,docs)=>{
        assert.equal(err,null);
        console.log('Encontrado:\n');
        console.log(docs);

        db.dropCollection('dishes',(err,result)=>{
            assert.equal(err,null);
            client.close();
            
        });
    });
});


});
