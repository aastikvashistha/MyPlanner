import React from 'react'
import PropTypes from 'prop-types'
import Todoitems from "./Todoitems";
  const Todos = (props) => {
  return (
    <div className='container'>
      <h3>To Dos List</h3>

      {props.todos.length===0? "NO TO DO'S ":
      props.todos.map((todo)=>{
        return <Todoitems todo={todo}key={todo.Sno} onDelete={props.onDelete}/> 
      })
    }

    </div>
  )
}

export default Todos;
