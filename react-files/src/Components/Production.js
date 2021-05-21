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
        let sub = _name;
        let type = null;
        let type_ind = _name.indexOf(".");
        let fixed_name = null;
        if(type_ind != -1){
            sub = _name.substring(0, type_ind);
            type = _name.substring(type_ind, _name.length);
            sub = sub.substring(0, 20-type.length);
            fixed_name = sub + type;
        }else{
            fixed_name = _name.substring(0, 20);
        }
        return (
            <div className="Production">
                <Link  id="linkName" style={{ color: 'inherit', textDecoration: 'inherit'}} to={{pathname:"/file", name:{_name}}}>{fixed_name}<span className="tooltiptextname">{_name}</span></Link>
                <br></br>
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