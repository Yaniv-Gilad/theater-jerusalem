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
      allUsers: []
    }
    let get = this.fetch('productions.json');
    console.log(get);
    
  }

  fetch(wanted_name){
    let reff = storage.ref('');
    let ret = 'aaaa';
    reff.list().then(function (res) {
      res.prefixes.forEach(function (fix) {
        // console.log(fix.name)
      })
      res.items.forEach(function (item){
        if (item.name == wanted_name) {
          ret = item.toString()
        }
        
      })
    })
    return ret;

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
      // console.log(user)
    }

    // var all_users = await db.collection("user").get()//user:name of collection on db
    // this.setState({ allUsers: all_users.docs })
    // console.log(all_users.docs)
  }

  render() {//Called whenever there is a change in state
    // this.fetch();
    return (
      <div className="HomePage">
        <nav className='home_nav'>
          <ul>
            <li>
            <NavLink className='navlink1' to='/' exact>
            הפקה חדשה
            </NavLink>
            </li>
            <li>
            <NavLink className='navlink2' to='/' exact>
            מחיקת הפקה
            </NavLink>
            </li>
            <li>
            <NavLink className='navlink3' to='/' exact>
            navlink3
            </NavLink>
            </li>
            <li>
            <NavLink className='navlink4' to='/' exact>
            navlink4
            </NavLink>
            </li>
          </ul>
        </nav>
        <img id='home_logo' src={LOGO} alt=""></img>
      </div>

    )
  }

}

export default HomePage;