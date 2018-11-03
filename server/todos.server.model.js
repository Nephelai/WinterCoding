var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	var TodosSchema = new Schema({
	  importance: { type: String, default: 'First' },
	  title: { type: String, default: '(Empty Title)' },
	  content: { type: String, default: '(Empty Content)' },
	  retiredate: { type: Date, default: Date.now() + 9*60*60*1000 },
	  done: {type: Boolean, default: false }
	},{ versionKey: false });

mongoose.model('todos', TodosSchema);