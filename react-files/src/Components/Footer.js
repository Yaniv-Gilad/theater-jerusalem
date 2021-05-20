import { Component } from "react"
import '../CSS/Footer.css'

class Footer extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div className="footer-dark">
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col item social">
                                <a href="#"><i className="fa fa-facebook"></i></a>
                                <a href="#"><i className="fa fa-twitter"></i></a>
                                <a href="#"><i className="fa fa-youtube"></i></a>
                                <a href="#"><i className="fa fa-instagram"></i></a>
                                <a href="#"><i className="fa fa-google"></i></a>
                            </div>
                        </div>
                        {/* <p className="copyright"> © 2021</p> */}
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer