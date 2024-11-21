// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')

// create a model class
let taskModel = mongoose.Schema({
    task:String,
    course:String,
    weight:String,
    deadline:String,
    complete:String
},
{
    collection:"tasks"
}
)
module.exports = mongoose.model('task',taskModel)