import React, {Fragment, useEffect, useState} from "react";
import EditTodo from "./EditTodo";


const ListTodos= ()=>{
    const [todoList,setTodoList]= useState([]);

    const getAll = async (e)=>{
        
         try {
             
             const response = await fetch("http://localhost:5000/todos");
             var data = await response.json();
             
           
             setTodoList(data)
             
         } catch (err) {
             console.error(err.message)
         }
     }
     
    
     useEffect(()=>{
        getAll();
     },[])
    return(
        <div className="container">
            
            <Fragment >
            <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Todo</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  
  <tbody>
    
    {todoList.map((x)=>(<Row description={x.description} id={x.todo_id} key={x.todo_id} getAll={getAll}/>))}
    
    </tbody>
    </table>
            </Fragment>
        </div>
        
    )
}

const Row=({description,id,getAll})=>{
    async function  deleteTodo(id){
        try {
            const response= await fetch(`http://localhost:5000/todos/${id}`,{
                method:"DELETE"
               
                
            });
            getAll()
            console.log(response);
        } catch (err) {
            console.error(err.message)
        }
    }
    
    return(
       
       <Fragment >
        <tr >
        <th scope="row" >{id}</th>
        <td >{description}</td>
        <td >< EditTodo key={id} id={id} description={description}/></td>
        <td ><button className="btn btn-danger" onClick={()=>deleteTodo(id)}>Delete</button></td>
        </tr>
       </Fragment>
       
    )
}

export default ListTodos; 