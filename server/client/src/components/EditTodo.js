import React, {Fragment, useState} from "react";

const EditTodo = ({description, id})=>{
    const [newdescription, setnewDescription]=useState(description);
    const  submitEdit = async (newdescription,id) =>{
        try {
            if(newdescription===""){
                newdescription= description;
            }
            const body = {"description":newdescription};
            const response = await fetch(`http://localhost:5000/todos/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });
            if(response){
                window.location="/";
            }
            
        } catch (err) {
            console.error(err.message)
        }
    }
    return(
        <Fragment>
            <button type="button" className="btn btn-success" data-toggle="modal" data-target={`#id${id}`}>
                 Update
            </button>
            <div className="modal fade" id={`id${id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={e=>setnewDescription(description)}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                       
                       <input type="text" className="form-control" value={newdescription} onChange={e=>setnewDescription(e.target.value)}></input>
                       
                       
                       
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-success" onClick={()=>submitEdit(newdescription,id)}>Save changes</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e=>setnewDescription(description)}>Close</button>
                        
                    </div>
                    </div>
                </div>
            </div>
        </Fragment>
        
    )
}

export default EditTodo;