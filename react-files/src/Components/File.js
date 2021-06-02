import { render } from "@testing-library/react";
import { Component } from "react"
import Production from "./Production.js"
import FileObj from "./FileObj.js"
import { auth, db, storage } from "../Firebase/firebase"
import '../CSS/File.css'

class File extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            folders: []
        }
    }

    componentDidMount() {
        storage.refFromURL("gs://theater-841bd.appspot.com/" + this.props.location.name._name).listAll()
            .then((res) => {
                let p = []
                res.items.forEach((file) => {
                    let name = file.name;
                    let p1 = { "name": name };
                    p.push(p1);
                });
                let fol = [];
                res.prefixes.forEach((folderRef) => {
                    let name = folderRef.name;
                    let p1 = { "name": name };
                    fol.push(p1);
                });
                this.setState({ ...this.state, files: p, folders: fol });
            }
            );
    }

    render() {
        let _name = this.props.location.name._name;
        let foldersToRender = this.getFolders();
        let filesToRender = this.getFiles();
        return (
            <div className="HomePage">
                <h1><u>{_name}</u></h1>
                {foldersToRender}
                {filesToRender}
                <div id="wrapper">
                    <button id="logout" onClick={() => {
                        this.props.history.push(
                            {
                                pathname: "/home"
                            })
                    }}>למסך הבית</button>
                </div>
            </div>

        )
    }

    // get all files and folders to show on screen
    getFiles() {
        let _path = this.props.location.name._name;
        let dataToReturn = this.state.files.map((file, index) => <FileObj key={index} prod={file} path={_path} />);
        return dataToReturn;
    }

    getFolders() {
        let _path = this.props.location.name._name;
        let dataToReturn = this.state.folders.map((folder, index) => <FileObj key={index} prod={folder} path={_path} />);
        return dataToReturn;
    }
}


export default File;