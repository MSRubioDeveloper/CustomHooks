
export const todoReducer = (initialState = [] , action  ) =>{
    console.log({action})
    switch( action.type ){
        case "[TODO] add Todo":

            return [
                ...initialState,
                action.payload // new Todo
            ]
        case "[TODO] Remove Todo":
            return initialState.filter( data => data.id !== action.payload );

        case "[TODO] Toggle Todo":

            return initialState.map( todo => {
                if( todo.id == action.payload){ //ID
                    return{
                        ...todo,
                        done: !todo.done
                    }
                }
                return todo
            })

        default:
            return initialState
    }


}