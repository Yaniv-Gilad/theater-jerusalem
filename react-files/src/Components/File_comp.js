import { Component } from "react"
import { auth } from "../Firebase/firebase"
import '../CSS/Login.css'
import LOGO from "../Photos/logo.jpeg"
import Card from "./Card.js"
import Data from "../users.json"


class File_comp extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div className="File_comp">
        <h1>{"פה בשביל לעודד"}</h1>
        <p></p>
        {Data.map((data,index) =>(
            <Card name = {data.name} description = {data.description}/>
            // {/* <Card name={data.name}  date ={data.last_update} type ={data.type}/>
            // {console.log(Data.name)} */}
            
        ))}
          
      </div>

    )
  }


  
}

export default File_comp;
