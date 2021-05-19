import { Component } from "react"
import ARCHIVE from "../Photos/archive.png"
import '../CSS/Production.css'
import App from "../App"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Production extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.prod.name,
        }
    }

    render() {//Called whenever there is a change in state
        let _name = this.state.name;
        console.log(_name)
        return (
            <div className="Production">
                <Link to={{pathname:"/file", name:{_name}}}>{_name}</Link>
                <p></p>
                <button><img src={ARCHIVE}></img></button>
            </div>
        )
    }
}

export default Production;