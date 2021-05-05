
import { Component } from "react"
import { auth, db } from "../Firebase/firebase"
import '../CSS/Card.css'
import LOGO from "../Photos/logo.jpeg"
import TRASH from "../Photos/trash.png"


class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name : props.name,
        description : props.description
    }
  }

  render() {//Called whenever there is a change in state
    return (
      <div className="Card">
      {/* <img src={LOGO}></img> */} 
      <h1>{this.state.name}</h1>
      {this.state.description}
      {/* <button id="imgButton"> */}
      <p></p>
          <img src={TRASH}></img>
          {/* </button> */}

      </div>

    )
  }

}

export default Card;