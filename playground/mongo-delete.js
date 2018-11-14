// const MongoClient = require('mongodb').MongoClient;
 const {MongoClient , ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/toDoApp1',(err, db)=>{
	if(err){
		return console.log('unable to connect to mongodb server')
	}
	console.log('connected to mongodb')

	db.collection('user').insertOne({
		text : 'hello goa',
		complete : false
	})

	db.collection('user').findOneAndDelete({
		_id : new ObjectID("5bebc315e770c22f49b894c0")
	}).then((result)=>{
		console.log(JSON.stringify(result,undefined,2))
	})
db.collection('user').deleteOne({name : 'Reigns77'}).then((result)=>{
		console.log(result)
	})

	// db.close();
});


// var obj = {name : 'aqsa',age : 22}
// console.log(obj.name)