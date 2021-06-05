import { Component } from "react"
import { storage } from "../Firebase/firebase"
import '../CSS/File.css'
import TRASH from "../Photos/trash.png"

class FileObj extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.file.name,
            path: props.file.path,
            download: "",
            updateFiles: props.updateFiles
        }
        this.delete = this.delete.bind(this);
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
                <a href={this.state.download} target="_blank">
                    <button id="but">
                        {fixed_name}<span id="but_span">{_name}</span>
                        <br></br>
                    </button>
                </a>
                <br></br>
                <button id="delete_file">
                    <img src={TRASH} onClick={this.delete}></img>
                    <span className="tooltiptext">מחיקה</span>
                </button>
            </div>

        )
    }

    delete() {
        let name = this.state.name;
        let path = this.state.path;

        if (window.confirm("Delete file " + name + "?") == false)
            return;

        storage.refFromURL(path).delete().then(() => {
            console.log("file " + name + " deleted !");
            this.state.updateFiles();
        }).catch(() => {
            console.log("file " + name + " did NOT delete");
        });
    }
}

export default FileObj;