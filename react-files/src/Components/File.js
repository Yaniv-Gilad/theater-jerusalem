import { render } from "@testing-library/react";
import { Component } from "react"
import FileObj from "./FileObj.js"
import FolderObj from "./FolderObj.js"
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
            folders: []
        }
    }

    componentDidMount() {
        let _path = "gs://theater-841bd.appspot.com/" + this.props.location.name._name;
        console.log(_path);
        storage.refFromURL(_path).listAll()
            .then((res) => {
                let p = []
                res.items.forEach((file) => {
                    let name = file.name;
                    let p1 = { "name": name, "path": _path};
                    p.push(p1);
                });
                let fol = [];
                res.prefixes.forEach((folderRef) => {
                    let name = folderRef.name;
                    let p1 = { "name": name , "path": _path};
                    fol.push(p1);
                });
                this.setState({ ...this.state, files: p, folders: fol , loader:true});
            }
            );
    }
    
    // Upload(e){
    //         const file = e.targrt.files[0];
    //         const storageRef= storage.ref();
    //         const fileRef=storageRef.child(file.name);
    //         fileRef.put(file).then(() => {
    //             console.log("העלה קובץ")
    //         });
    //  }
    

    render() {
        let _name = this.props.location.name._name;
        let foldersToRender = this.getFolders();
        let filesToRender = this.getFiles();
        console.log(foldersToRender);
        console.log(filesToRender);
        
      return (
            <div className="HomePage">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
            {!this.state.loader?<div className="spinner-border" ></div>:<div>
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
                   {<input type="file" onChange={console.log("hi")}></input> }
                </div>
            </div>}
            </div>
        )
    }
   
    // get all files and folders to show on screen
    getFiles() {
        let dataToReturn = this.state.files.map((_file, index) => <FileObj key={index} file={_file}/>);
        return dataToReturn;
    }

    getFolders() {
        let dataToReturn = this.state.folders.map((_folder, index) => <FolderObj key={index} folder={_folder}/>);
        return dataToReturn;
    }
}


export default File;