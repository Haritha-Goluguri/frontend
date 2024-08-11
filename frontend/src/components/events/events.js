import {useState} from "react"
export const event=()=>{
    const [name,setname]=useState()
    const ChangeName=()=>{
        //setName("haritha")
        alert("haritha")
            console.log("working ok")
        
    return(
        <div>
            <h1>Hello:{name}</h1>
            
        </div>
    )
    }
}