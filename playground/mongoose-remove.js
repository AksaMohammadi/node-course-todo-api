const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose.js')
const {Todo} = require('./../server/models/todo.js')
const {User} = require('./../server/models/user.js')

// Todo.remove({}).then((result)=>{
// 	console.log(result)
// })

Todo.findByIdAndRemove('5bed49ed601189c8a1913f68').then((result)=>{
	console.log(result)
})