import { Component } from "react"
import '../CSS/Production.css'

class Production extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.prod.name,
            created: props.prod.created,
            href: props.prod.href
        }
    }

    

    render() {
        return (
            <a href={this.state.href}>
                <div className="Production">
                    <p>{this.state.name}</p>
                    <p>{this.state.created}</p>
                </div>
            </a>
        );
    }
}

export default Production