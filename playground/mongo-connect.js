// const MongoClient = require('mongodb').MongoClient;
 const MongoClient = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/toDoApp1',(err, db)=>{
	if(err){
		return console.log('unable to connect to mongodb server')
	}
	console.log('connected to mongodb')

	db.close();
});


// var obj = {name : 'aqsa',age : 22}
// console.log(obj.name)