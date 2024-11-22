var express = require('express');
var router = express.Router();
let Task = require('../model/task')
let taskController = require('../controllers/task.js')


/*Read Operation --> Get route for displaying the tasks list*/
router.get('/',async(req,res,next)=>{
    try{
        const TaskList = await Task.find();
        res.render('Task/list',{
            title:'Assignments',
            TaskList:TaskList
        })
    }
    catch(err){
        console.error(err)
        res.render('Task/list',{
            error:'Error on Server'})
    }
})

/*Create Operation --> Get route for displaying add page*/
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Task/add',{
            title: 'Add Assignment'});
    }
    catch(err){
        console.error(err)
        res.render('Task/list',{
            error:'Error on Server'})
    }
});

/*Create Operation --> Post route for processing the Add Page*/
router.post('/add',async(req,res,next)=>{
    try{
        let newTask = Task({
            "task":req.body.task,
            "course":req.body.course,
            "weight":req.body.weight,
            "deadline":req.body.deadline,
            "complete":req.body.complete
        });
        Task.create(newTask).then(()=>{
            res.redirect('/tasklist') /*Once created route back to tasks*/
        })
    }
    catch(err){
        console.error(err)
        res.render('Task/list',{
            error:'Error on Server'})
    }
});
/*Update Operation --> Get route for displaying edit page*/
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const taskToEdit=await Task.findById(id);
        res.render('Task/edit',
            {
                title: 'Edit Assignment',
                Task:taskToEdit
            }
        )
    }
    catch(err){
        console.error(err)
        next(err); //Keep passing the error
        res.render('Task/list',{
            error:'Error on Server'})
    }
});
/*Update Operation --> Post route for processing the edit Page*/
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedTask = Task({
            "_id":id,
            "task":req.body.task,
            "course:":req.body.course,
            "weight":req.body.weight,
            "deadline":req.body.deadline,
            "complete":req.body.complete
        })
        Task.findByIdAndUpdate(id,updatedTask).then(()=>{
            res.redirect('/tasklist')
        })

    }
    catch(err){
        console.error(err)
        res.render('Task/list',{
            error:'Error on Server'})
    }

});
/*Delete Operation --> Ge route to perform lead opertion*/
router.get('/delete/:id',async(req,res,next)=>{
try{
    let id=req.params.id;
    Task.deleteOne({_id:id}).then(()=>{
        res.redirect('/tasklist')
    })
}
    
catch(err){
    console.error(err)
    res.render('Task/list',{
        error:'Error on Server'})
}
});


module.exports = router;