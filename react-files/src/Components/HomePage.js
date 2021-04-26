import { Component } from "react"
import { auth, db } from "../Firebase/firebase"
import '../CSS/HomePage.css'


class HomePage extends Component {
  constructor(props) {
    super(props);
    console.log(props.location)
    this.state = {
      data: props.location.data,
      allUsers: []
    }

  }

  async componentDidMount() {
    console.log("********* started did mount **********")
    
    let user = auth.currentUser;
    if (user == null) {
      console.log("NOT signed in")
      this.props.history.push(
        {
          pathname: "/"
        })
    }

    else {
      console.log("signed in !!")
      this.setState({ user: user })
      this.props.history.push({
        pathname: '/Home',
        data: user
      })
      console.log(user)
    }

    // var all_users = await db.collection("user").get()//user:name of collection on db
    // this.setState({ allUsers: all_users.docs })
    // console.log(all_users.docs)
  }

  render() {//Called whenever there is a change in state
    return (
      <div className="HomePage">
        <h1>Home Page</h1>
        <button onClick={() => {

        }}>Back</button>
      </div>

    )
  }

}

export default HomePage;