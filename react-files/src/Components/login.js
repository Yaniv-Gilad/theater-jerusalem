import { Component } from "react"
import { auth } from "../Firebase/firebase"
import '../App.css'


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
      <div>
        <h1>Login</h1>
        <input type="email"
          id="email"
          placeholder="userName@email.com"
          title="email"
          //required = {true}
          onChange={(event) => {
            this.setState({ email: event.target.value })
            //console.log((event.target.value))
          }}
        />

        <br />
        <input type="password"
          id="password"
          placeholder="password"
          title="password"
          //required = {true}
          onChange={(event) => {
            this.setState({ password: event.target.value })
            //console.log((event.target.value))
          }}
        />

        <br />
        <button onClick={() => {
          this.login()
          console.log(this.state)
        }}>Login</button>
      </div>

    )
  }

  login() {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log("can login")
        console.log(res)
        this.props.history.push(
          {
            pathname: "/newPage",
            data: res.user
          })

      }).catch((e) => {
        console.log("not found user")
      })
  }
}

export default Login;