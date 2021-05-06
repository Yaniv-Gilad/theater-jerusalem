import { Component } from "react"
import TRASH from "../Photos/trash.png"

class Production extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.prod.name,
            created: props.prod.created,
            href: props.prod.href
        }
    }


    render() {//Called whenever there is a change in state
        return (
            <div className="Production">
                <h4>{this.state.name}</h4>
                {this.state.created}
                <p></p>
                <img src={TRASH}></img>

            </div>

        )
    }

    // render() {
    //     return (
    //         <a href={this.state.href}>
    //             <div className="Production">
    //                 <p>{this.state.name}</p>
    //                 <p>{this.state.created}</p>
    //             </div>
    //         </a>
    //     );
    // }
}

export default Production