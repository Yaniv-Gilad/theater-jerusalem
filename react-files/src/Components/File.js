import { render } from "@testing-library/react";
import { Component } from "react"
import Production from "./Production.js"
import FileObj from "./FileObj.js"
import { auth, db, storage } from "../Firebase/firebase"
import '../CSS/File.css'
import React from 'react';
// import '../App.css';
import {App} from './base'

class File extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    async componentDidMount() {
        storage.refFromURL("gs://theater-841bd.appspot.com/" + this.props.location.name._name).listAll()
            .then((res) => {
                let p = []
                res.items.forEach((file) => {
                    let name = file.name;
                    let p1 = { "name": name };
                    p.push(p1);
                });
                res.prefixes.forEach((folderRef) => {
                    let name = folderRef.name;
                    let p1 = { "name": name };
                    p.push(p1)
                });
                this.setState({ ...this.state, files: p })
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
    

    render(){
        let _name = this.props.location.name._name;
        let dataToRender = this.getData();

        return (
        <div className="HomePage">
            <h1><u>{_name}</u></h1>
            {dataToRender}
            <div id="wrapper">
            <button id="logout" onClick={() => {
            this.props.history.push(
                {
                pathname: "/home"
                })
                
            }}>למסך הבית</button>
            {<input type="file" onChange={console.log("hi")}></input> }
            </div>
        </div>


        )

    }
   

    getData() {
        let dataToReturn = this.state.files.map((file, index) => <FileObj key={index} prod={file}/>);
        return dataToReturn;
    }
}


export default File;