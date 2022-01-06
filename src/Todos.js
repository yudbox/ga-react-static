import React, { useReducer, useState } from "react";

const ACTIONS = {
    ADD_TODO: 'add-todo',
    TOGGLE_TODO: 'toggle-todo',
    DELETE_TODO: 'delete-todo',
}

const reducer = (state, action) => {
    switch(action.type){
        case ACTIONS.ADD_TODO:
             return [...state, newTodo(action.payload.name)]
        case ACTIONS.TOGGLE_TODO:
            return state.map(todo=> {
                if(todo.id === action.payload.id) {
                    return {...todo, complete: !todo.complete}
                }
                return todo
            })
        case ACTIONS.DELETE_TODO:
            return state.filter(todo=> todo.id !== action.payload.id)
        default:
           return state
    }
}

const newTodo = (name) => ({
    id: Date.now(),
    name,
    complete: false
})

export const Todos = () => {
   const [todos, dispatch] = useReducer(reducer, [])
   const [name, setName] = useState('') 
   const handleSubmit = (e) => {
        e.preventDefault()
       dispatch({type: ACTIONS.ADD_TODO, payload: {name}} )
       setName('')
   }
   console.log('todos', todos);
   return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={e=>setName(e.target.value)} />
            </form>
            <div>
                {todos.map(todo=> {
                    return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
                })}
            </div>
        </div>
    )
}

const Todo = ({todo, dispatch}) => {
    const actionToggle = {type: ACTIONS.TOGGLE_TODO, payload: {id: todo.id}}
    const actionDelete = {type: ACTIONS.DELETE_TODO, payload: {id: todo.id}}
 return (
     <div>
        <span style={{color: todo.complete ? '#AAA' : '#000'}}>{todo.name}</span>
        <button onClick={()=>dispatch(actionToggle)}>Toggle</button>
        <button onClick={()=>dispatch(actionDelete)}>Delete</button>
     </div>
 )
}