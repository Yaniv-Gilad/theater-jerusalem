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
            loader:false,
            files: [],
            folders: [],
            path:  this.props.location.name._name
        }
        this.Upload = this.Upload.bind(this);
    }

    componentDidMount() {
        storage.refFromURL("gs://theater-841bd.appspot.com/" + this.state.path).listAll()
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
                this.setState({ ...this.state, files: p, folders: fol , loader:true});
            }
            );
    }
    Upload(e){
            const file = e.target.files[0];
            const storageRef= storage.ref();
            const fileRef=storageRef.child(this.state.path + "/"+file.name);
            fileRef.put(file).then(() => {
                console.log("העלה קובץ",file.name)
            });
     }
    

    render() {
        let _name = this.props.location.name._name;
        let foldersToRender = this.getFolders();
        let filesToRender = this.getFiles();
        
      return (
            <div className="HomePage">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
            {!this.state.loader?<div className="spinner-border" ></div>:<div>
                <p></p>
                <h1>{_name}</h1>
                <p></p>
                <p></p>
                {foldersToRender}
                {filesToRender}
                <div id="wrapper">
                    <button id="go_home" onClick={() => {
                        this.props.history.push(
                            {
                                pathname: "/home"
                            })
                    }}>למסך הבית</button>
                </div>
                   <input type="file" id="upload_but" onChange={this.Upload}></input> 
            </div>}
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