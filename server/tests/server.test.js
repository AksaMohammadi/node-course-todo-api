const _ = require('lodash')
const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')


const {app} = require('./../server.js')
const {Todo} = require('./../models/todo.js')

const todos = [{
	_id: new ObjectID(),
	text: 'First test todo'
},{
	_id: new ObjectID(),
	text: 'second test todo',
	compelete : true,
	compeleted : 333
}]

beforeEach((done)=>{
	Todo.remove({}).then(()=>{
		return Todo.insertMany(todos)
	}).then(()=>done())
})

describe('POST/todos',()=>{
	it('should create a new todo',(done)=>{
		var text = 'Test todo text'

		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res)=>{
			// console.log("*******")
			// console.log(res)
		expect(res.body.text).toBe(text)
	})
	.end((err,res)=>{
		if(err){
			return done(err)
		}

		Todo.find({text}).then((todos)=>{
		expect(todos.length).toBe(1)
		expect(todos[0].text).toBe(text)
		done();
	}).catch((e)=>done(e))
})
})
		it('should not create a new todo with invalid data',(done)=>{
		request(app)
		.post('/todos')
		.send({})
		.expect(400)	
	.end((err,res)=>{
		if(err){
			return done(err)
		}
	
	Todo.find().then((todos)=>{
		expect(todos.length).toBe(2)
		// expect(todos[0].text).toBe(text)
		done();
	}).catch((e)=>done(e))

})
})
})

describe('GET/todos',()=>{
	it('should get all todos',(done)=>{
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res)=>{
			expect(res.body.todos.length).toBe(2)
		})
		.end(done)
	})
})

describe('GET/todos/:id',()=>{
	it('should return todo doc',(done)=>{
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo.text).toBe(todos[0].text)
		})
		.end(done)
	})
	it('should return 404 if todo not found',(done)=>{
		var hexId = new ObjectID().toHexString
		request(app)
		.get(`/todos/${hexId}`)
		.expect(404)
		.end(done)
	})

	it('should return 404 for non-object ids',(done)=>{
		request(app)
		.get(`/todos/123abc}`)
		.expect(404)
		.end(done)
	})
})
describe('DELETE/todos/:id',()=>{
	it('Should remove a todo',(done)=>{
		var hexId = todos[1]._id.toHexString()

		request(app)
		.delete(`/todos/${hexId}`)
		.expect(200)
		// console.log(res.body.todo._id)
		// console.log(hexId)
		.expect((res)=>{
			expect(res.body.todo._id).toBe(hexId)

		})
		.end((err,res)=>{
			if(err){
				return done(err)
			}

			Todo.findById(hexId).then((todo)=>{
				expect(todo).toNotExist();
				done()
			}).catch((e)=>done(e))
		})
	})
	it('should return 404 if todo not found',(done)=>{
	var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('PATCH/todos/:id',()=>{
	it('should update the todo',(done) =>{
		var hexId = todos[0]._id.toHexString();
		var text = 'This shouldbe the new text'
		request(app)
		.patch(`/todos/${hexId}`)
			.send({
			compeleted:true,
			text
		})
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo.text).toBe(text)
			expect(res.body.todo.compeleted).toBe(true)
			expect(res.body.todo.compeletedAt).toBeA('number')
		})
		.end(done)

	})
	
	describe('PATCH/todos/:id',()=>{
	it('should update the todo',(done) =>{
		var hexId = todos[1]._id.toHexString();
		var text = 'This shouldbe the new text...!!'
		request(app)
		.patch(`/todos/${hexId}`)
			.send({
			compeleted:false,
			text
		})
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo.text).toBe(text)
			expect(res.body.todo.compeleted).toBe(false)
			expect(res.body.todo.compeletedAt).toNotExist()
		})
		.end(done)

	})
	
})
})