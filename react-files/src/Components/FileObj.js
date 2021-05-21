import { Component } from "react"
import ARCHIVE from "../Photos/archive.png"
import '../CSS/File.css'
import App from "../App"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class FileObj extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.prod.name,
        }
    }

    render() {//Called whenever there is a change in state
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
        let html = `<Link  id="linkName" style={{ color: 'inherit', textDecoration: 'inherit'}} to={{pathname:"/file", name:${_name}}}>${fixed_name}<span className="tooltiptextname">${_name}</span></Link>`;
        if(type)
            html = `<button id="but">${fixed_name}<span id="but_span">${_name}</span></button>`;
        return (
            <div>
                <div className="File" dangerouslySetInnerHTML={{__html: html}}>
                </div>
                <br></br>
            </div>
        )
    }
}

export default FileObj;