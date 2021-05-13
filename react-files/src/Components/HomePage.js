import { Component } from "react"
import { auth, db, storage } from "../Firebase/firebase"
import '../CSS/HomePage.css'
import Production from "./Production.js"
import prodData from "../productionsData.js"
import LOGO from '../Photos/logo.jpg'
import { NavLink } from 'react-router-dom'

class HomePage extends Component {
  constructor(props) {
    super(props);

    // console.log(props.location)
    this.state = {
      data: props.location.data,
      allUsers: [],
      projects: []
    }
  }
  getIMGdiv() {
    return this.state.images.map((image, index) => (
      <img key={index} width="100" height="100" src={image} />
    ))
  }

  async componentDidMount() {
    console.log("********* started did mount **********")

    let user = auth.currentUser;
    if (user == null) {
      this.props.history.push(
        {
          pathname: "/"
        })
    }

    else {
      this.setState({ user: user })
      this.props.history.push({
        pathname: '/Home',
        data: user
      })

      storage.refFromURL("gs://theater-841bd.appspot.com").listAll()
        .then((res) => {
          let p = []
          res.prefixes.forEach((folderRef) => {
           
            let name = folderRef.name;
            // var forestRef = storage.ref().child(name + "/");
            // forestRef.getMetadata()
            //   .then((metadata) => {
            //     console.log(metadata)
            //   })

            let p1 = { "name": name }
            p.push(p1)
          });

          this.setState({ ...this.state, projects: p })
          console.log(this.state.projects)
        }
        );
      
    }

  }

  render() {//Called whenever there is a change in state
    let dataToRender = this.getData();
    return (
      <div className="HomePage">
        <h1><u>Productions</u></h1>
        {dataToRender}
        <div id="wrapper">
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
    let dataToReturn = this.state.projects.map(production => <Production prod={production} />);
    return dataToReturn;
  }

}

export default HomePage;