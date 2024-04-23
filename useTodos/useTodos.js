
import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer"


// Estado inicial del hook useReducer
const initialState = [
    // {
    //     id: new Date().getTime(),
    //     description: "Recolectar la piedra del ALMA",
    //     done: false
    // },
  
]

//init 3 param useReduce: calcula el estado inicial de estado.. osea.. tu estado
// al recargar tu app sacara del localstorage los todos y asignara al estado del reducer
const init = ( ) =>{
    return JSON.parse( localStorage.getItem( "todos") ) || [];
}


export const useTodos = (  ) => {

    const [ todosState , dispatchTodo ] = useReducer( todoReducer , initialState, init );
    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify( todosState ) || []);

    }, [todosState] );


    const handleNewTodo = ( newTodo ) =>{
        console.log( newTodo)
        const action = {
            type: "[TODO] add Todo",
            payload: newTodo
        }

        dispatchTodo( action ) // solo debes mandarle laa ccion al dispatch y ya
    }

    const handleDeleteTodo = ( id ) =>{
        console.log( id)
        dispatchTodo({
            type: "[TODO] Remove Todo",
            payload: id
        })
    }

    const handleToggleTodo = (id )=>{
        console.log( id )
        dispatchTodo({
            type: "[TODO] Toggle Todo",
            payload: id
        })
        console.log( todosState )
    }


  return {
    handleDeleteTodo,
    handleNewTodo,
    handleToggleTodo, 
    todosState,

    //10 de 10 tu tarea
    pendingTodosCount:  todosState.filter( todo => !todo.done) .length,
    todosCount: todosState.length
  }
}
