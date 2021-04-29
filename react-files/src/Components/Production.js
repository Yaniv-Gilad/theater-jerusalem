import { Component } from "react"
import MASK from "../Photos/mask.png"
import '../CSS/Production.css'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
            <Card className="Production">
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        width="100"
                        image={MASK}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.state.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.state.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.state.lastUpdated}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                {/* <CardActions>
                    <Button size="small" color="primary">
                        Share
        </Button>
                    <Button size="small" color="primary">
                        Learn More
        </Button>
                </CardActions> */}
            </Card>
        );
    }

    // render() {
    //     return (
    //         <a href={this.state.href}>
    //             <div className="Production">
    //                 <img src={MASK} id="mask" width="120px" height="120px" alt="producation logo"></img>
    //                 <p>{this.state.name}</p>
    //                 <p>{this.state.description}</p>
    //                 <p>{this.state.lastUpdated}</p>
    //             </div>
    //         </a>
    //     );
    // }
}

export default Production