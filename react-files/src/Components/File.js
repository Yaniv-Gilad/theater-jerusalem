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
            </div>
        </div>

        )
    }

    getData() {
        let dataToReturn = this.state.files.map(file => <FileObj prod={file}/>);
        return dataToReturn;
    }
}


export default File;