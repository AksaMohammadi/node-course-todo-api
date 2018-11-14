// const MongoClient = require('mongodb').MongoClient;
 const {MongoClient , ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/toDoApp1',(err, db)=>{
	if(err){
		return console.log('unable to connect to mongodb server')
	}
	console.log('connected to mongodb')

	// db.collection('data').findOneAndUpdate({
	// 	_id :new ObjectID("5beaac24f8f01d33f30ff0bc")
	// },{
	// 	$set : {
	// 		completed : true
	// 	}
	// },{
	// 		returnOriginal : false

	// }).then((results)=>{

	// 	console.log(results)

	// })


	// db.collection('user').findOneAndUpdate({
	// 	_id : new ObjectID("5bebc31ae770c22f49b894ca")
	// },{
	// 	$set : {
	// 		name : 'aqss reigns'
	// 	}
	// }).then((results)=>{
	// 	console.log(results)
	// })

	db.collection('user').update({
		_id : new ObjectID("5bebc31ae770c22f49b894ca")
	},{
		$inc : {
			age : +2
		}
	}).then((results)=>{
		console.log(results)
	})

	// db.close();
});


