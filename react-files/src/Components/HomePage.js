import { Component } from "react"
import { auth, db, storage} from "../Firebase/firebase"
import '../CSS/HomePage.css'
import LOGO from '../Photos/logo.jpeg'
import {NavLink} from 'react-router-dom'

class HomePage extends Component {
  constructor(props) {
    super(props);

    // console.log(props.location)
    this.state = {
      data: props.location.data,
      allUsers: [],
      images : []
    }
  }
  getIMGdiv(){
    return this.state.images.map((image,index)=>(
      <img key ={index} width="100" height="100" src={image}/>
    ))
  }

  async componentDidMount() {
    // console.log("********* started did mount **********")
    
    let user = auth.currentUser;
    if (user == null) {
      // console.log("NOT signed in")
      this.props.history.push(
        {
          pathname: "/"
        })
    }

    else {
      // console.log("signed in !!")
      this.setState({ user: user })
      this.props.history.push({
        pathname: '/Home',
        data: user
      })
      storage.refFromURL("gs://theater-841bd.appspot.com").listAll().then(res=>{
        // res.prefixes.forEach(async file=>{
        //   var typeFile = file.name.split(".")
        //   console.log(file.list())
        //     // if(typeFile[typeFile.length-1]=="png"||typeFile[typeFile.length-1]=="jpeg") {
        //         var image = await file.getDownloadURL()
        //         images.push(image)
        // })
        let arr = []
        res.items.forEach(async file=>{
            var typeFile = file.name.split(".")
            //if(typeFile[typeFile.length-1]=="png"||typeFile[typeFile.length-1]=="jpeg") {
            var image = await file.getDownloadURL()
              arr.push(image);
        })
        this.setState({...this.state, images: arr})
      })
    }

    // var all_users = await db.collection("user").get()//user:name of collection on db
    // this.setState({ allUsers: all_users.docs })
    // console.log(all_users.docs)
  }

  render() {//Called whenever there is a change in state
    return (
      <div className="HomePage">
        {/* {console.log(this.getIMGdiv())} */}
        <img id='home_logo' src={LOGO} alt=""></img>
      </div>

    )
  }

}

export default HomePage;