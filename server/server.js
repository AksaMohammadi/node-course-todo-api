const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo.js')
var {User} = require('./models/user.js')
 
 var app=express()
 const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.post('/todos',(req,res) => {
	// console.log("req")
	// console.log(req)
	var todo = new Todo({
		text: req.body.text
	})

	todo.save().then((doc)=>{
		res.send(doc)
	},(e)=>{
		res.status(400).send(e)
	})
})

app.get('/todos',(req,res)=>{
	Todo.find().then((todos)=>{
		res.send({todos})
	},(e)=>{
		res.status(400).send(e)
	})
})

app.get('/todos/:id',(req,res)=>{
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(404).send()
	}
	Todo.findById(id).then((todo)=>{
		if(!todo){
			return res.status(404).send()
		}
		res.send({todo})
	}).catch((e)=>{
		res.status(404).send()
	})
})

app.patch('/todos/:id',(req,res)=>{
	var id = req.params.id;
	// compeleted
	var body = _.pick(req.body,['text','compeleted'])
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	console.log("1. "+_.isBoolean(body.compeleted))
	console.log("2. "+body.compeleted)
	if(_.isBoolean(body.compeleted)&& body.compeleted){
		console.log("in if loop")
		body.compeleted = true;
		body.compeletedAt = null;
	}
	console.log(body)
	console.log("******")
	Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
		console.log(todo)
		if(!todo){
			return res.status(404).send();
		}
		res.send({todo})
	}).catch((e)=>{
		res.status(400).send();
	})
	})

app.post('/users',(req,res)=>{
	var body = _.pick(req.body, ['email','password'])
	var user = new User(body)

	user.save().then(()=>{
		return user.generateAuthToken()
	}).then((token)=>{
		res.header('s-auth',token).send(user)
	}).catch((e)=>{
		res.status(400).send(e)
	})
})


 app.listen(port,()=>{
 	console.log(`started up at port ${port}`)
 })

module.exports = {app}