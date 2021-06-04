import { Component } from "react"
import FileObj from "./FileObj.js"
import FolderObj from "./FolderObj.js"
import { storage } from "../Firebase/firebase"
import '../CSS/File.css'
import React from 'react';
import '../App.css';

class File extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: "",
            loader: false,
            files: [],
            folders: []
        }
        this.getData = this.getData.bind(this);
        this.Upload = this.Upload.bind(this);
    }

    componentDidMount() {
        let _path = "gs://theater2-d72bc.appspot.com/" + this.props.location.path._name;

        storage.refFromURL(_path).listAll().then((res) => {
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
            this.setState({ ...this.state, path: _path, files: p, folders: fol, loader: true });
        }
        );
    }

    Upload(e) {
        let i = this.state.path.indexOf(".com/");
        i = i + 5;
        let p = this.state.path.substring(i);
        const file = e.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(p + "/" + file.name);
        fileRef.put(file).then(() => {
            console.log("העלה קובץ", file.name);
            this.getData(this.state.path);
        });
    }

    render() {
        let _name = this.props.location.name._name;
        let foldersToRender = this.getFolders();
        let filesToRender = this.getFiles();

        return (
            <div className="HomePage">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
                {!this.state.loader ? <div className="spinner-border" ></div> : <div>
                    <h1>{_name}</h1>
                    {filesToRender}
                    {foldersToRender}
                    <div id="wrapper">
                        <button id="go_home" onClick={() => {
                            this.props.history.push(
                                {
                                    pathname: "/home"
                                })
                        }}>למסך הבית</button>
                        <input type="file" id="upload_but" onChange={this.Upload}></input>
                    </div>
                </div>}
            </div>
        )
    }

    getData(new_path) {
        this.setState({ ...this.state, path: new_path, files: [], folders: [], loader: false });
        storage.refFromURL(new_path).listAll()
            .then((res) => {
                let p = []
                res.items.forEach((file) => {
                    let name = file.name;
                    let p1 = { "name": name, "path": new_path };
                    p.push(p1);
                });
                let fol = [];
                res.prefixes.forEach((folderRef) => {
                    let name = folderRef.name;
                    let p1 = { "name": name, "path": new_path };
                    fol.push(p1);
                });
                this.setState({ ...this.state, path: new_path, files: p, folders: fol, loader: true });
            }
            );
    }

    // get all files and folders to show on screen
    getFiles() {
        let dataToReturn = this.state.files.map((_file, index) => <FileObj key={index} file={_file} />);
        return dataToReturn;
    }

    getFolders() {
        let dataToReturn = this.state.folders.map((_folder, index) => <FolderObj key={index} folder={_folder} updatePath={this.getData} />);
        return dataToReturn;
    }
}


export default File;