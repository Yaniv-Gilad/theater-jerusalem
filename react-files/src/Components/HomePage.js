import { Component } from "react"
import { auth, db, storage } from "../Firebase/firebase"
import '../CSS/HomePage.css'
import Production from "./Production.js"
import ARCHIVE from "../Photos/archive.png"
import ADD from "../Photos/add_black_24dp.png"
import Calendar from "./Calendar"
import CALENDAR from "../Photos/calendar.png"
// import Calendar from "reactjs-google-calendar"

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      data: props.location.data,
      allUsers: [],
      projects: [],
      archive: [] // all the archive projects
    }

    this.getProjects = this.getProjects.bind(this);
    this.getArchive = this.getArchive.bind(this);
    this.addProd = this.addProd.bind(this);
  }


  async componentDidMount() {
    auth.onAuthStateChanged(_user => {
      if (_user) {// if  user logged in
        this.setState({ user: _user })
        this.props.history.push({
          pathname: '/Home',
          data: _user
        })

        this.getProjects();
        this.getArchive();
      }
      else {
        //  else -> user didnt logged in
        if (_user == null) {
          this.props.history.push(
            {
              pathname: "/"
            });
          return;
        }
      }
    }
    )
  }

  async addProd() {
    const prod_name = prompt("אנא הכנס את שם ההפקה:");
    const ignore = "ignore.txt";
    if (!prod_name || prod_name == "")
      return;

    console.log(prod_name)
    let def = ["תקציב", "תפאורה", "חזרות", "טקסטים", "סאונד", "מפרטים"];
    for (let i = 0; i < def.length; i++) {
      await storage.ref().child(prod_name).child(def[i]).child(ignore).put();
    }
    window.location.reload();
  }


  render() {
    let id = "dGhlYXRlcmplcnVzYWxlbUBnbWFpbC5jb20";
    let str = "https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FJerusalem&amp;src=" + id + "&amp;color=%23039BE5&amp;showTitle=0"

    let dataToRender = this.getData();
    return (

      <div className="HomePage">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
        {!this.state.loader ? <div className="spinner-border" role="status"></div> :
          <div>
            <p></p>
            <h1><b>הפקות</b></h1>
            <h2 className="line"></h2>
            <h2 className="line"></h2>
            <p></p>
            <p></p>
            {dataToRender}
            <div id="wrapper">
              <button id="archive" onClick={() => {
                this.props.history.push(
                  {
                    pathname: "/Archive"
                  })
              }}><img src={ARCHIVE}></img><span className="tooltiptext">מעבר לארכיון</span></button>
              <button id="calendar" onClick={() => {
                this.props.history.push(
                  {
                    pathname: "/Calendar"
                  })
              }}><img src={CALENDAR}></img><span className="tooltiptext">מעבר ליומן</span></button>

              <button id="logout" onClick={() => {
                auth.signOut();
                this.props.history.push(
                  {
                    pathname: "/"
                  })
              }}>התנתק</button>

              <button id="add" onClick={this.addProd}><img src={ADD}></img><span className="tooltiptext">הוספת הצגה</span></button>
            </div>
          </div>}
      </div>

    )
  }

  // get the relevent projects to show on screen
  getData() {
    let notArchived = this.state.projects.filter(prod => this.state.archive.indexOf(prod["name"]) == -1);
    let dataToReturn = notArchived.map((production, index) => <Production key={index} getArchive={this.getArchive} prod={production} />);
    return dataToReturn;
  }


  async getProjects() {
    let res = await storage.refFromURL("gs://theater2-d72bc.appspot.com").listAll()
    // get all projects on firebase
    let p = []
    res.prefixes.forEach((folderRef) => {
      let name = folderRef.name;
      let p1 = { "name": name }
      p.push(p1)
    });

    this.setState({ ...this.state, projects: p });
  }


  async getArchive() {
    // get archive projects from firestore json

    let arch = [];
    let querySnapshot = await db.collection("archive").get()
    querySnapshot.forEach((doc) => {
      arch.push(doc.data()["name"]);
    });
    this.setState({ ...this.state, archive: arch, loader: true });

  }

}

export default HomePage;