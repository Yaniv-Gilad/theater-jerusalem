import { Component } from "react"
import { db, storage } from "../Firebase/firebase"
import FileObj from "./FileObj.js"
import '../CSS/FolderObj.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class FolderObj extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            folders: [],
            name: props.folder.name,
            Path: props.folder.path
        }
    }

    componentDidMount() {
        let _path = this.state.path + "/";
        _path = _path + this.state.name;

        storage.refFromURL("gs://theater-841bd.appspot.com/" + _path).listAll()
            .then((res) => {
                let p = []
                res.items.forEach((file) => {
                    let name = file.name;
                    let p1 = { "name": name, "path": _path };
                    p.push(p1);
                });
                let fol = [];
                res.prefixes.forEach((folderRef) => {
                    let name = folderRef.name;
                    let p1 = { "name": name, "path": _path };
                    fol.push(p1);
                });
                this.setState({ ...this.state, files: p, folders: fol, path: _path });
            }
            );
    }

    render() {
        let _name = this.state.name;
        let _path = this.state.path;
        let foldersToRender = this.getFolders();
        let filesToRender = this.getFiles();

        return (
            <div className="Folder">
                <Link id="link"
                    style={{ color: "white", textDecoration: 'inherit' }}
                    to={{ pathname: "/file", name: { _name }, path: { _path }}}>{_name}
                    <span className="tooltiptextname">{_name}</span>
                </Link>

                {foldersToRender}
                {filesToRender}
                <div id="wrapper">
                    <button id="go_home" onClick={() => {
                        this.props.history.push(
                            {
                                pathname: "/home"
                            })
                    }}>למסך הבית</button>
                    {/* {<input type="file" onChange={console.log("hi")}></input>} */}
                </div>
            </div>
        )
    }

    // get all files and folders to show on screen
    getFiles() {
        let _path = this.state.Path;
        let dataToReturn = this.state.files.map((file, index) => <FileObj key={index} prod={file} path={_path} />);
        return dataToReturn;
    }

    getFolders() {
        let dataToReturn = this.state.folders.map((_folder, index) => <FolderObj key={index} folder={_folder} />);
        return dataToReturn;
    }

}

export default FolderObj;