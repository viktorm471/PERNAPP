const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();
const pool = require('./db')
// midleware
app.use(cors());
app.use(express.json());

// ROUTES 

// create a todo

app.post("/todos", async (req,res)=>{
    try{
        const {description}=req.body;
        const newTodo = await pool.query(" INSERT INTO todo(description) VALUES($1) RETURNING * ",[description]);
        res.json(newTodo.rows[0]);
        
    }catch(err){
        console.error(err.message);
    }
})



// get all todos
app.get("/todos", async (req,res)=>{
    try{
        const {description}=req.body;
        const newTodo = await pool.query(" SELECT * FROM todo ");
        res.json(newTodo.rows);
        
    }catch(err){
        console.error(err.message);
    }
})
// get a todo
app.get("/todos/:id", async (req,res)=>{
    try{
        const {id} = req.params;
        const {description}=req.body;
        const newTodo = await pool.query(" SELECT * FROM todo WHERE todo_id=$1",[id]);
        res.json(newTodo.rows);
        
    }catch(err){
        console.error(err.message);
    }
})
// update a todo 
app.put("/todos/:id", async (req,res)=>{
    try{
        const {id} = req.params;
        const {description}=req.body;
        const newTodo = await pool.query(" UPDATE todo SET description=$1 WHERE todo_id=$2 RETURNING * ",[description,id]);
        res.json("Successfully updated ");
        
    }catch(err){
        console.error(err.message);
    }
})
// delete todo 
app.delete("/todos/:id", async (req,res)=>{
    try{
        const {id} = req.params;
        const {description}=req.body;
        const newTodo = await pool.query(" DELETE FROM todo WHERE todo_id=$1 RETURNING * ",[id]);
        res.json("Successfully deleted");
        
    }catch(err){
        console.error(err.message);
    }
})
app.listen(5000, ()=>{
    console.log("server listening at 5000");
    console.log
})