import { Component } from "react"
import { auth, db, storage } from "../Firebase/firebase"
import '../CSS/HomePage.css'
import Production from "./Production.js"
import prodData from "../productionsData.js"
import LOGO from '../Photos/logo.png'
import { NavLink } from 'react-router-dom'
import ARCHIVE from "../Photos/archive.png"
import ADD from "../Photos/add_black_24dp.png"

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.location.data,
      allUsers: [],
      projects: [],
      archive: [] // all the archive projects
    }
    
    this.getProjects = this.getProjects.bind(this);
    this.getArchive = this.getArchive.bind(this)
  }
  
  getIMGdiv() {
    return this.state.images.map((image, index) => (
      <img key={index} width="100" height="100" src={image} />
    ))
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

    // else -> user logged in
    this.setState({ user: user })
    this.props.history.push({
      pathname: '/Home',
      data: user
    })

    this.getProjects();
    this.getArchive();
  }

  render() {
    let dataToRender = this.getData();
    return (
      <div className="HomePage">
        <h1><u>Productions</u></h1>
        {dataToRender}
        <div id="wrapper">
          <button id="archive"><img src={ARCHIVE}></img><span class="tooltiptext">מעבר לארכיון</span></button>
          <button id="add"><img src={ADD}></img><span class="tooltiptext">הוספת הצגה</span></button>

          <button id="logout" onClick={() => {
            this.props.history.push(
              {
                pathname: "/"
              })
          }}>Logout</button>

        </div>

      </div>

    )
  }

  getData() {
    let notArchived = this.state.projects.filter(prod => this.state.archive.indexOf(prod["name"]) == -1);
    let dataToReturn = notArchived.map(production => <Production prod={production} />);
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
    });
    this.setState({ ...this.state, archive: arch });
    // return arch;
  }

}

export default HomePage;