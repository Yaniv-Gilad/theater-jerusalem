import { Component } from "react"
import { auth, db, storage } from "../Firebase/firebase"
import '../CSS/HomePage.css'
import ArchiveObj from "./ArchiveObj.js"

class Archive extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.location.data,
            allUsers: [],
            projects: [],
            archive: [] // all the archive projects
        }

        this.getProjects = this.getProjects.bind(this);
        this.getArchive = this.getArchive.bind(this);
    }

    componentDidMount() {
        let user = auth.currentUser;

        // if user didnt logged in
        if (user == null) {
            this.props.history.push(
                {
                    pathname: "/"
                });
            return;
        }

        //else -> user logged in
        this.setState({ user: user })
        this.props.history.push({
            pathname: '/Archive',
            data: user
        })

        this.getProjects();
        this.getArchive();
    }

    render() {
        let dataToRender = this.getData();
        return (
            <div className="HomePage">
                <h1><u>ארכיון</u></h1>
                {dataToRender}
                <div id="wrapper">
                    <button id="logout" onClick={() => {
                        this.props.history.push(
                            {
                                pathname: "/home"
                            })
                    }}>למסך הבית</button>

                    <button id="logout" onClick={() => {
                        auth.signOut();
                        this.props.history.push(
                            {
                                pathname: "/"
                            })
                    }}>התנתק</button>
                </div>
            </div>

        )
    }

    getData() {
        let archived = this.state.projects.filter(prod => this.state.archive.indexOf(prod["name"]) >= 0);
        let dataToReturn = archived.map((production, index) => <ArchiveObj key={index} getArchive={this.getArchive} prod={production} />);
        return dataToReturn;
    }

    getProjects() {
        storage.refFromURL("gs://theater-841bd.appspot.com").listAll()
            .then((res) => {
                let p = []
                res.prefixes.forEach((folderRef) => {
                    let name = folderRef.name;
                    let p1 = { "name": name }
                    p.push(p1)
                });

                this.setState({ ...this.state, projects: p });
            }
            );
    }

    getArchive() {
        let arch = [];
        db.collection("archive").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                arch.push(doc.data()["name"]);
            });
            this.setState({ ...this.state, archive: arch });
        });
    }

}

export default Archive;