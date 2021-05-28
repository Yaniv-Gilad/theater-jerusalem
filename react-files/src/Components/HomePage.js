import { Component } from "react"
import { auth, db, storage } from "../Firebase/firebase"
import '../CSS/HomePage.css'
import Production from "./Production.js"
import prodData from "../productionsData.js"
import LOGO from '../Photos/logo.png'
import { NavLink } from 'react-router-dom'
import ARCHIVE from "../Photos/archive.png"
import ADD from "../Photos/add_black_24dp.png"
// import Calendar from "reactjs-google-calendar"

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loader:false,
      data: props.location.data,
      allUsers: [],
      projects: [],
      archive: [] // all the archive projects
    }

    this.getProjects = this.getProjects.bind(this);
    this.getArchive = this.getArchive.bind(this);
  }

 async componentDidMount() {
  
  let user=null;
    auth.onAuthStateChanged(_user=>{
      if(_user)
     {// if  user logged in
      this.setState({ user: user })
      this.props.history.push({
        pathname: '/Home',
        data: user
      })

      this.getProjects();
     this.getArchive();
     }
else{
  //  else -> user didnt logged in
    if (user == null) {
      this.props.history.push(
        {
          pathname: "/"
        });
      return;
    }
  }
})
}

  render() {
    let dataToRender = this.getData();
    return (
    
      <div className="HomePage">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
         {!this.state.loader?<div class="spinner-border" role="status"></div>:
         <div>
        <h1>הפקות</h1>
        {dataToRender}
        <div id="wrapper">
          <button id="archive" onClick={() => {
            this.props.history.push(
              {
                pathname: "/Archive"
              })
          }}><img src={ARCHIVE}></img><span className="tooltiptext">מעבר לארכיון</span></button>

          <button id="logout" onClick={() => {
            auth.signOut();
            this.props.history.push(
              {
                pathname: "/"
              })
          }}>התנתק</button>
          {/* <Calendar  /> */}
          <button id="add"><img src={ADD}></img><span className="tooltiptext">הוספת הצגה</span></button>
        </div>
        </div>}
      </div>

    )
  }

  getData() {
    let notArchived = this.state.projects.filter(prod => this.state.archive.indexOf(prod["name"]) == -1);
    let dataToReturn = notArchived.map((production, index) => <Production key={index} getArchive={this.getArchive} prod={production} />);
    return dataToReturn;
  }

  async getProjects() {
   let res =await storage.refFromURL("gs://theater-841bd.appspot.com").listAll()

        let p = []
        res.prefixes.forEach((folderRef) => {
          let name = folderRef.name;
          let p1 = { "name": name }
          p.push(p1)
        });

        this.setState({ ...this.state, projects: p });
  }

  async getArchive() {
    let arch = [];
    let querySnapshot=await db.collection("archive").get()
      querySnapshot.forEach((doc) => {
        arch.push(doc.data()["name"]);
      });
      this.setState({ ...this.state, archive: arch ,loader:true});
  
  }

}

export default HomePage;