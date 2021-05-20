import { Component } from "react"
import { db, storage } from "../Firebase/firebase"
import ARCHIVE from "../Photos/archive.png"
import '../CSS/Production.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Production extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.prod.name,
            getArchive: props.getArchive
        }
        this.moveToArchive = this.moveToArchive.bind(this);
    }

    render() {
        let _name = this.state.name;
        return (
            <div className="Production">
                <Link to={{ pathname: "/file", name: { _name } }}>{_name}</Link>
                <p></p>
                <button id="archive"><img src={ARCHIVE} onClick={this.moveToArchive}></img><span className="tooltiptext">העברה לארכיון</span></button>
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