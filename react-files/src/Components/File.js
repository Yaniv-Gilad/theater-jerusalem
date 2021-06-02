import { render } from "@testing-library/react";
import { Component } from "react"
import FileObj from "./FileObj.js"
import { auth, db, storage } from "../Firebase/firebase"
import '../CSS/File.css'
import React from 'react';
import '../App.css';

class File extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
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
                this.setState({ ...this.state, files: p, folders: fol, loader: true });
            }
            );
    }
    Upload(e) {
        const file = e.targrt.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then(() => {
            console.log("העלה קובץ")
        });
    }


    render() {
        let _name = this.props.location.name._name;
        let foldersToRender = this.getFolders();
        let filesToRender = this.getFiles();

        return (
            <div className="HomePage">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
                {!this.state.loader ? <div className="spinner-border" ></div> :
                    <div>
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
                            {<input type="file" onChange={console.log("hi")}></input>}
                        </div>
                    </div>
                }
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


} export default File;