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
        {Data.map((data,index) =>(
        <div>
            <Card name={data.name}  date ={data.last_update}/>
            {console.log(Data.name)}
        </div>
        ))}
          
      </div>

    )
  }


  
}

export default File_comp;
