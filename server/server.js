var express = require('express')
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo.js')
var {User} = require('./models/user.js')
 
 var app=express()

app.use(bodyParser.json());
app.post('/todos',(req,res) => {
	console.log("req")
	console.log(req)
	var todo = new Todo({
		text: req.body.text
	})

	todo.save().then((doc)=>{
		res.send(doc)
	},(e)=>{
		res.status(400).send(e)
	})
})
 app.listen(5000,()=>{
 	console.log('yeah...thats working')
 })

module.exports = {app}