import {Component} from "react"
import {auth, db} from "../Firebase/firebase"
import '../App.css'


class NewPage extends Component
{
    constructor(props) {
        super(props);
        console.log(props.location)
        this.state ={
          data:props.location.data,
          allUsers:[]
        }
        
    }

    async componentDidMount(){
        // auth.onAuthStateChanged(user=>{
        //The function is called the first time you upload the page and this is the opportunity to upload things you want or view the page in case the user already exists, etc.
        //   if(user)
        //   {
        //     this.setState({user:user})
        //     this.props.history.push({
        //     //   pathname:'/newPage',
        //       data:user
        //     })
        //   }
        // })
        var all_users = await db.collection("user").get()//user:name of collection on db
        this.setState({allUsers:all_users.docs})
        console.log(all_users.docs)
    }

   render() {//Called whenever there is a change in state
    return( 
        <div> 
           <h1>newPage</h1>
           <button onClick={()=>{

           }}>Back</button>
        </div>
           
      )
   }

 
   
}

export default NewPage;