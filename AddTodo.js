import React, { useState } from "react";

const AddTodo = (props) => { 
   const [title,setTitle] =  useState("");
   const [desc , setDesc] = useState("");
    
    const submit = (e)=>{
       e.preventDefault();
       if(!title || !desc ){
        alert("Title or Description can't be empty")
       }
       props.addTodo(title , desc)
    }
  return (
    <div className="container my-3">
      <h3>Add a To Do</h3>

      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            To Do Title
          </label>
          <input
            type="text"
            value={title} onChange={(e)=>{setTitle(e.target.value)}}
            className="form-control"
            id="title"
            placeholder="Enter todo title"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            type="text"
            value={desc}  onChange={(e)=>{setDesc(e.target.value)}}
            className="form-control"
            id="desc"
            placeholder="Enter todo description"
          />
        </div>

        <button type="submit" className="btn btn-sm btn-success">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
