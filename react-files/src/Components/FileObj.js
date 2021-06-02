import { Component } from "react"
import { storage } from "../Firebase/firebase"
import ARCHIVE from "../Photos/archive.png"
import '../CSS/File.css'
import App from "../App"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class FileObj extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.prod.name,
            path: props.path,
            download:""
        }
    }

    componentDidMount() {
        let path = this.state.path + "/";
        path = path + this.state.name;
        storage.ref(path).getDownloadURL().then((url)=>{this.setState({...this.state, download:url})});
    }

    render() {
        // substring the name to fixed length
        let _name = this.state.name;
        let sub = _name;
        let type = null;
        let type_ind = _name.indexOf(".");
        let fixed_name = null;

        // check for file or folder
        if (type_ind != -1) {
            sub = _name.substring(0, type_ind);
            type = _name.substring(type_ind, _name.length);
            sub = sub.substring(0, 20 - type.length);
            fixed_name = sub + type;
        }
        else {
            fixed_name = _name.substring(0, 20);
        }

        // let html = `<Link id="linkName" style="{ color: 'inherit', textDecoration: 'inherit'}" to="{pathname:'/file', name:'${_name}'}">${fixed_name}<span className="tooltiptextname">${_name}</span></Link>`;
        // let html_but = `<button id="but">${fixed_name}<span id="but_span">${_name}</span></button>`;
        //<Link id="linkName" style={{ color: 'inherit', textDecoration: 'inherit' }} to={{ pathname: "/file", name: _name}}>{fixed_name}<span className="tooltiptextname">{_name}</span></Link>
        return (
            <div className="File">   
                {type ? (<button id="but">{fixed_name}<span id="but_span">{_name}</span><br></br><a href={this.state.download} target="_blank">open</a></button>) : (<Link to={{ pathname: "/file", name: _name}} id="linkName" style={{ color: "white", textDecoration: 'inherit' }} >{fixed_name}<span className="tooltiptextname">{_name}</span></Link>)}
                <br></br>
            </div>

        )
    }
}

export default FileObj;