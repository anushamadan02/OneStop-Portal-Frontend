import React,{useState,useEffect} from 'react'

const useWindowSize=()=>{

    var [size,setSize]=useState([window.innerHeight,window.innerWidth])

    useEffect(()=>{
        const handleListener=()=>{
           setSize([window.innerHeight,window.innerWidth])
        }
      window.addEventListener("resize",handleListener)
      return ()=>{window.removeEventListener("resize",handleListener)}
    },[])
    return size
}
 export default useWindowSize