import { Component } from "react"
import { db, storage } from "../Firebase/firebase"
import RECYCLE from "../Photos/recycle.png"
import TRASH from "../Photos/trash.png"
import '../CSS/Production.css'

class ArchiveObj extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.prod.name,
            getArchive: props.getArchive
        }
        this.moveToHome = this.moveToHome.bind(this);
        this.delete = this.delete.bind(this);
    }

    render() {

        // substring the name to fixed length
        let _name = this.state.name;
        let sub = _name;
        let type = null;
        let type_ind = _name.indexOf(".");
        let fixed_name = null;

        // check for file or folder
        if (type_ind !== -1) {
            sub = _name.substring(0, type_ind);
            type = _name.substring(type_ind, _name.length);
            sub = sub.substring(0, 20 - type.length);
            fixed_name = sub + type;
        }

        else {
            fixed_name = _name.substring(0, 20);
        }

        return (
            <div className="Production">
                <button>{fixed_name}
                    <span className="tooltiptextname">{_name}</span>
                </button>
                    

                <br></br>
                <button className="smallButton">
                    <img src={RECYCLE} alt="" onClick={this.moveToHome}></img>
                    <span className="tooltiptext">החזרה להפקות</span>
                </button>

                <button className="smallButton">
                    <img src={TRASH} alt="" onClick={this.delete}></img>
                    <span className="tooltiptext">מחיקת קבצים</span>
                </button>

            </div>
        )
    }

    // remove project from archive to home
    moveToHome() {
        let _name = this.state.name.toString();
        db.collection("archive").doc(_name).delete().then(() => {
            this.state.getArchive();
        });
    }

    // delete project content
    delete() {
        let _name = this.state.name.toString();
        if (window.confirm("למחוק את הקבצים של פרויקט \"" + _name + "\" ?") === false)
            return;

        this.deleteFolderContents(_name);
        this.state.getArchive();
    }

    // delete using BFS
    deleteFolderContents(path) {
        const ref = storage.ref(path);
        ref.listAll()
            .then(dir => {
                dir.items.forEach(fileRef => {
                    this.deleteFile(ref.fullPath, fileRef.name);
                });
                dir.prefixes.forEach(folderRef => {
                    this.deleteFolderContents(folderRef.fullPath);
                })
            })
            .catch(error => {
                console.log(error);
            });

    }

    deleteFile(pathToFile, fileName) {
        const ref = storage.ref(pathToFile);
        const childRef = ref.child(fileName);
        childRef.delete()
    }
}

export default ArchiveObj;