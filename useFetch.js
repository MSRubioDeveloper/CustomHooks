import { useEffect } from "react";
import { useState } from "react"


const localCache = {
    
}


export const useFetch = ( url ) => {

    
    const [ state, setState ] = useState({
        data: null,
        isLoading: true,
        hasError: null,
        error: null
    });

    useEffect(()=>{
        getFetch();

    }, [url]) //cuando el url cambia, se ejecuta de nuevo esto

    const setLoadingState = ()=>{
         
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null
        })
    }

    const getFetch = async ()=>{

        //Cache
        if( localCache[url]){
            console.log("Usando cache");
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            })
            return;
        }

        setLoadingState();

        


        const resp = await fetch( url );

        //sleep 2 segundos
        await new Promise( resolve => setTimeout( resolve, 2000))

        if( !resp.ok ){
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText
                }
            })

            return;
        }

        const data = await resp.json();
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null
        })
        // Manejo del cache crea la propiedad! cada peticion se pushea "crea en el obJ"
        //y ya solo la mandas a buscar internamente envez de hacer una peticion HTTP
        localCache[url] = data;
        console.log( localCache)

    }


  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  }
}
