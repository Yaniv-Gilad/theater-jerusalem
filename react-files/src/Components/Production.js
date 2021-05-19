import { Component } from "react"
import TRASH from "../Photos/trash.png"
import ARCHIVE from "../Photos/archive.png"
import '../CSS/Production.css'

class Production extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.prod.name
        }
    }

    render() {//Called whenever there is a change in state
        return (
            <div className="Production">
                <button id={this.state.name} onClick={() => {
          this.props.history.push(
            {
              pathname: "/"
            })
                }}>{this.state.name}</button>
                <p></p>
                <button><img src={ARCHIVE}></img></button>
            </div>
        )
    }
}

export default Production