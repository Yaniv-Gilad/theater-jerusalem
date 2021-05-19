import { Component } from "react"
import TRASH from "../Photos/trash.png"
import ARCHIVE from "../Photos/blackarchives.jpg"
import '../CSS/Production.css'

class Production extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.prod.name,
            created: props.prod.created,
            href: props.prod.href
        }
    }


    render() {//Called whenever there is a change in state
        return (
            <div className="Production">
                <h4>{this.state.name}</h4>
                {this.state.created}
                <p></p>
                <button><img src={ARCHIVE}></img></button>

            </div>
        )
    }
}

export default Production