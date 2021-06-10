import { Component } from "react"
import { storage } from "../Firebase/firebase"
import '../CSS/File.css'
import TRASH from "../Photos/trash.png"
import PDF from "../Photos/pdf.png"
import WORD from "../Photos/word.png"
import EXCEL from "../Photos/excel.png"
import DEF_FILE from "../Photos/file.png"

const TEXT_A = ["txt"]
const WORD_A = ["docx", "docm", "dotx", "dotm"]
const PDF_A = ["pdf"]
const EXCEL_A = ["xlsx", "xlsm", "xltx", "xltm", "xlsb", "xlam"]
const POWERPOINT_A = ["pptx", "pptm", "potx", "potm", "ppam", "ppsx", "ppsm", "sldx", "sldm"]

class FileObj extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.file.name,
            path: props.file.path,
            download: "",
            updateFiles: props.updateFiles
        }
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        let _path = this.state.path + "/";
        _path = _path + this.state.name;
        storage.refFromURL(_path).getDownloadURL().then((url) => { this.setState({ ...this.state, download: url, path: _path }) });
    }

    render() {
        // substring the name to fixed length
        let _name = this.state.name;
        let sub = _name;
        let type = null;
        let type_ind = _name.indexOf(".");
        let fixed_name = null;

        // check for file or folder
        if (type_ind != -1) {
            sub = _name.substring(0, type_ind);
            type = _name.substring(type_ind + 1, _name.length);
            sub = sub.substring(0, 20 - type.length);
            fixed_name = sub + type;
        }
        else {
            fixed_name = _name.substring(0, 20);
        }

        // pic the right image
        let im_url;
        console.log(type);
        if (TEXT_A.includes(type))
            im_url = WORD; // change to text pic
        else if (WORD_A.includes(type))
            im_url = WORD;
        else if (PDF_A.includes(type))
            im_url = PDF;
        else if (EXCEL_A.includes(type))
            im_url = EXCEL;
        else if (POWERPOINT_A.includes(type))
            im_url = DEF_FILE; // change to POWERPIONT pic
        else
            im_url = DEF_FILE;


        return (
            <div className="File" style={{ backgroundImage: `url(${im_url})` }}>
                <br></br>
                <a href={this.state.download} target="_blank">
                    <button id="but">
                        {fixed_name}<span id="but_span">{_name}</span>
                        <br></br>
                    </button>
                </a>
                <br></br>
                <button id="delete_file">
                    <img src={TRASH} onClick={this.delete}></img>
                    <span className="tooltiptext">מחיקה</span>
                </button>
            </div>


            // <div className="File">
            //     <a href={this.state.download} target="_blank">
            //         <button id="but">
            //             {fixed_name}<span id="but_span">{_name}</span>
            //             <br></br>
            //         </button>
            //     </a>
            //     <br></br>
            //     <button id="delete_file">
            //         <img src={TRASH} onClick={this.delete}></img>
            //         <span className="tooltiptext">מחיקה</span>
            //     </button>
            // </div>
        )
    }

    delete() {
        let name = this.state.name;
        let path = this.state.path;

        if (window.confirm("למחוק את הקובץ \"" + name + "\" ?") == false)
            return;

        storage.refFromURL(path).delete().then(() => {
            console.log("file " + name + " deleted !");
            this.state.updateFiles();
        }).catch(() => {
            console.log("file " + name + " did NOT delete");
        });
    }
}

export default FileObj;