import { Component } from "react"
import { db, storage } from "../Firebase/firebase"
import FileObj from "./FileObj.js"
import '../CSS/FolderObj.css'


class FolderObj extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            files: [],
            folders: [],
            name: props.folder.name,
            Path: props.folder.path
        }
    }

    componentDidMount() {
        let _path = this.state.path + "/";
        _path = _path + this.state.name;
        console.log(this.state.path);

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
                this.setState({ ...this.state, files: p, folders: fol, path: _path, loader: true });
            }
            );
    }

    render() {
        let _name = this.state.name;
        let foldersToRender = this.getFolders();
        let filesToRender = this.getFiles();

        return (
            <div className="Folder">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
                {!this.state.loader ? <div className="spinner-border" ></div> : <div>
                    <h1>{_name}</h1>
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
                </div>}
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
        console.log(this.state.folders);
        let dataToReturn = this.state.folders.map((_folder, index) => <FolderObj key={index} folder={_folder} />);
        return dataToReturn;
    }

}

export default FolderObj;