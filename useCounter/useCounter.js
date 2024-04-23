
//custom hook ( es una simple funcion )

import { useState } from "react";

//customHooks puede tener mas customhook o hooks de react
export const useCounter = ( initialValue = 10 ) =>{

    const valorInicial = initialValue;
    const [counter, setCounter] = useState( initialValue )

    //incrementar 
    const increment = (value = 1) => {
        setCounter( (current ) => current + value)
    }
    // decrementar
    const decrementar = (value = 1) =>{
        setCounter( current => current - value )
    }
    // reset
    const reset = () =>{
        setCounter( valorInicial )
    }


    return {
        counter: counter,
        incrmentar: increment,
        decrementar,
        reset
    };
}