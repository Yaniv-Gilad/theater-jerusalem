import { Component } from "react"
import FileObj from "./FileObj.js"
import FolderObj from "./FolderObj.js"
import { storage } from "../Firebase/firebase"
import folder_upload from "../Photos/add_folder.png"
import back from "../Photos/arrow.png"
import file_upload from "../Photos/add_file.png"
import '../CSS/File.css'
import React from 'react';
import '../App.css';

const ignore = "ignore.txt"; // temp file that will not be shown

class File extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchVal: "",
            path: "",
            loader: false,
            files: [],
            folders: []
        }
        this.getData = this.getData.bind(this);
        this.Upload = this.Upload.bind(this);
        this.backButton = this.backButton.bind(this);
        this.addFolder = this.addFolder.bind(this);
        this.overrideInput = this.overrideInput.bind(this);
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
    overrideInput(e) {
        this.refs.uploader.click();
    }

    Upload(e) {
        let names = this.state.files.map(file => file["name"]);
        let arr = []
        for(let j = 0; j < e.target.files.length; j++)
            arr.push(e.target.files[j]);
        arr.forEach(f => {
            let name = f.name;
            if (names.includes(name)) {
                if (window.confirm("קיים קובץ בשם " + name + "\n" + "האם ברצונך לדרוס אותו?") == false) {
                    this.getData(this.state.path);
                    return;
                }
            }
            let i = this.state.path.indexOf(".com/");
            i = i + 5;
            let p = this.state.path.substring(i);
            const storageRef = storage.ref();
            const fileRef = storageRef.child(p + "/" + name);
            fileRef.put(f).then(() => {
                console.log("העלה קובץ", name);
                this.getData(this.state.path);
            });
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
                    <input className="searchBox" type="text" placeholder="חיפוש.."
                        onChange={(event) => {
                            this.setState({ ...this.state, searchVal: event.target.value })
                        }}>
                    </input>
                    {foldersToRender}
                    <br></br>
                    {filesToRender}
                    {/* <div id="wrapper"> */}
                    <button id="go_home_fromfile" onClick={() => {
                        this.props.history.push(
                            {
                                pathname: "/home"
                            })
                    }}>למסך הבית</button>
                    <button id="go_back" onClick={this.backButton}><img src={back}></img></button>
                    <table id="menu">
                        <tr>
                            <td>
                                <div id="file_up" onClick={this.overrideInput}>
                                    <img id="file_img" src={file_upload} style={{ cursor: "pointer" }}></img><input type="file" id="upload_but" ref="uploader" onChange={this.Upload}></input>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <button id="add_folder" onClick={this.addFolder}><img id="add_img" src={folder_upload}></img></button>

                            </td>
                        </tr>
                    </table>

                    {/* </div> */}
                </div>}
            </div>
        )
    }

    getData(new_path = this.state.path) {
        this.setState({ ...this.state, path: new_path, files: [], folders: [], loader: false });
        storage.refFromURL(new_path).listAll()
            .then((res) => {
                let p = []
                res.items.forEach((file) => {
                    let name = file.name;
                    if (name !== ignore) {
                        let p1 = { "name": name, "path": new_path };
                        p.push(p1);
                    }
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
        let searchVal = this.state.searchVal;
        let filtered = this.state.files.filter(_file => _file["name"].includes(searchVal));
        let dataToReturn = filtered.map((_file) => <FileObj key={_file.name} file={_file} updateFiles={this.getData} />);
        return dataToReturn;
    }

    getFolders() {
        let searchVal = this.state.searchVal;
        let filtered = this.state.folders.filter(_folder => _folder["name"].includes(searchVal));
        let dataToReturn = filtered.map((_folder) => <FolderObj key={_folder.name} folder={_folder} updatePath={this.getData} />);
        return dataToReturn;
    }

    addFolder() {
        let name = prompt("אנא הכנס שם תיקייה:");

        // if cancel
        if (name == null || name === "") {
            this.getData(this.state.path);
            return;
        }

        // if folder already exist
        let folders = this.state.folders.map(folder => folder["name"]);
        if (folders.includes(name)) {
            alert("לא ניתן ליצור תיקייה. \nקיימת תיקייה בשם " + name + ".")
            this.getData(this.state.path);
            return;
        }

        let i = this.state.path.indexOf(".com/");
        i = i + 5;
        let p = this.state.path.substring(i);

        const storageRef = storage.ref();
        const fileRef = storageRef.child(p + "/" + name + "/" + ignore);
        fileRef.put("test").then(() => {
            this.getData(this.state.path);
        });
    }

    backButton() {
        let path = this.state.path;
        let i = 0;
        let counter = 0;
        for (i = 0; i < path.length; i++)
            if (path.charAt(i) === '/')
                counter++;

        console.log(path);
        console.log(counter);
        // go back to home
        if (counter === 3)
            this.props.history.push({ pathname: "/home" });

        // go back to last folder
        let last = path.lastIndexOf("/");
        let newPath = path.substring(0, last);
        this.getData(newPath);
    }
}


export default File;