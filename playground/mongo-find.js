// const MongoClient = require('mongodb').MongoClient;
 const {MongoClient , ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/toDoApp1',(err, db)=>{
	if(err){
		return console.log('unable to connect to mongodb server')
	}
	console.log('connected to mongodb')

	// db.close();


// db.collection('data').find({
// 	_id : new ObjectID('5beab2867396ed8df8659816') 
// }).toArray().then((docs)=>{
// 	console.log('data')
// 	console.log(JSON.stringify(docs,undefined,2))
// },(err) => {
// 	console.log('unable to fetch data',err)
// })
// var obj = {name : 'aqsa',age : 22}
// console.log(obj.name)

db.collection('data').find({name:'aqsa'}).toArray().then((docs)=>{
	// console.log(`data count: ${count}`)
	console.log(JSON.stringify(docs,undefined,2))
// },(err) => {
// 	console.log('unable to fetch data',err)
})

});