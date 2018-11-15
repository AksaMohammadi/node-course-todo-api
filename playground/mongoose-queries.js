const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose.js')
const {Todo} = require('./../server/models/todo.js')
const {User} = require('./../server/models/user.js')
var id = '5bebf31abdc08a652832714c';

// if(!ObjectID.isValid(id)){
// 	console.log('ID not valid')
// }
// Todo.find({
// 	_id: id
// }).then((todos)=>{

// 	console.log('Todos',todos)
// })

// Todo.findOne({
// 	_id: id
// }).then((todo)=>{
// 	if(!todo){
// 		return console.log('invalid id')
// 	}

// 	console.log('Todo',todo)
// })
User.findById(id).then((any)=>{
	if(!any){
		return console.log('u entered wrog id')
	}
	console.log(JSON.stringify(any,undefined,2))
}).catch((e)=>console.log(e))