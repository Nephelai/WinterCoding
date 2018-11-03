var Todo = require('mongoose').model('todos');

exports.getTodo = function(req, res) {
	Todo.find({}, function(err, data) {
		if(err){
	      res.send(err);
	    }
	    else{
	      res.send(data);
	    }
	}).sort('importance');
};

exports.saveTodo = function(req, res) {
	var mod = new Todo(req.body);
	//console.log(req.body);
	if(req.body.mode == "Save") {
	    mod.save(function(err, data) {
	      if(err){
	        res.send(err);
	      }
	      else{
	        res.send({data:"Record has been Inserted..!!"});
	      }
	    });
	}
	else if(req.body.mode == "Update") {
	    Todo.findByIdAndUpdate(req.body.id, {
	        importance: req.body.importance,
	        title: req.body.title,
	        content: req.body.content,
	        retiredate: req.body.retiredate,
	        complete: req.body.done
	    }, function(err, data) {
	        if (err) {
	          res.send(err);
	        }
	        else{
	          res.send({data:"Record has been Updated..!!"});
	        }
	    });
	}
};

exports.deleteTodo = function(req, res) {
	Todo.findByIdAndRemove(req.body.id , function(err) {
    if(err){
      res.send(err);
    }
    else{
      res.send({data:"Record has been Deleted..!!"});
    }
  });
};

exports.revertTodo = function(req, res) {
	Todo.findByIdAndUpdate(req.body.id, { done: req.body.done },
    function (err, data) {
      if(err){
        res.send(err);
      }
      else{
        res.send({data:"Change Not yet Todos..!!"});
      }
    });
};