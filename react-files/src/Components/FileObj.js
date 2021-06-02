import { Component } from "react"
import { storage } from "../Firebase/firebase"
import ARCHIVE from "../Photos/archive.png"
import '../CSS/File.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class FileObj extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.file.name,
            path: this.props.file.path,
            download: ""
        }
    }

    componentDidMount() {
        let _path = this.state.path + "/";
        _path = _path + this.state.name;
        storage.refFromURL(_path).getDownloadURL().then((url) => { this.setState({ ...this.state, download: url, path: _path }) });
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

        return (
            <div className="File">
                <button id="but">
                    {fixed_name}<span id="but_span">{_name}</span>
                    <br></br>
                    <a href={this.state.download} target="_blank">open</a>
                </button>
                <br></br>
            </div>

        )
    }
}

export default FileObj;