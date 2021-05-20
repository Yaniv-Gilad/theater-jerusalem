import { Component } from "react"
import '../CSS/Footer.css'

class Footer extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div class="footer-dark">
                <footer>
                    <div class="container">
                        <div class="row">
                            <div class="col item social">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-youtube"></i></a>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                                <a href="#"><i class="fa fa-google"></i></a>
                            </div>
                        </div>
                        {/* <p class="copyright"> © 2021</p> */}
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer