import { Component } from "react"
import { auth } from "../Firebase/firebase"
import '../CSS/Login.css'
import LOGO from "../Photos/logo.jpg"
import curtain from "../Photos/Unt.png"


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }


  render() {

    return (

      <div className="Login">
        <div id="welcome">ברוכים הבאים</div>
        <img src={LOGO} id="logo" alt="logo pic"></img>
        <div class="login">
          <img src={curtain} id="curtain" alt="curtain"></img>
          <input type="text" placeholder="userName@email.com" id="username"
            onChange={(event) => {
              this.setState({ ...this.state, email: event.target.value })
            }}
          />

          <input type="password" placeholder="password" id="password"
            onChange={(event) => {
              this.setState({ ...this.state, password: event.target.value })
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                this.login()
                console.log(this.state)
              }
            }}
          />

          <a href="/" class="forgot">forgot password?</a>

          <input type="submit" value="כניסה למערכת"
            onClick={() => {
              this.login()
              // console.log(this.state)
            }} />

        </div>
        <div class="shadow"></div>
      </div>

    )
  }


  login() {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        // console.log("can login")
        // console.log(res)
        this.props.history.push(
          {
            pathname: "/Home",
            data: res.user
          })

      }).catch((e) => {
        alert("Wrong Email or password")
        //console.log("not found user")
      })
  }
}

export default Login;
