import { Component } from "react"
import MASK from "../Photos/mask.png"
import '../CSS/Production.css'
import Card from '@material-ui/core/Card';

class Production extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.prod.name,
            description: props.prod.description,
            lastUpdated: props.prod.lastUpdated,
            href: props.prod.href
        }
    }

    render() {
        return (
            <a href={this.state.href}>
                <div className="Production">
                    <img src={MASK} id="mask" width="120px" height="120px"></img>
                    <p>{this.state.name}</p>
                    <p>{this.state.description}</p>
                    <p>{this.state.lastUpdated}</p>
                </div>
            </a>
        );
    }
}

export default Production