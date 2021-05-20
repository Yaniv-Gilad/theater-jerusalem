import { Component } from "react"
import { db, storage } from "../Firebase/firebase"
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

    render() {
        let _name = this.state.name;
        return (
            <div className="Production">
                <Link  id="linkName" style={{ color: 'inherit', textDecoration: 'inherit'}} to={{pathname:"/file", name:{_name}}}>{_name}<span class="tooltiptextname">{_name}</span></Link>
                <p></p>
                <button id="archive"><img src={ARCHIVE}></img><span class="tooltiptext">העברה לארכיון</span></button>
            </div>
        )
    }

    // need to fix !!!!!!!!!!!!!!! //
    moveToArchive() {
        let _name = this.state.name.toString();
        db.collection("archive").doc(_name).set({ name: _name }).then(() => {
            console.log("Document '" + _name + "' added to archive!");
            this.state.getArchive();
        });
    }
}

export default Production;