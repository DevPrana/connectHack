import TestStyles from './Navbar.module.css'
import { Link } from "react-router-dom"
const Navbar = () => {
    return ( 
        <div className={`${TestStyles.navbar}`}>
            <div>
                <button className={`${TestStyles.IconButtonDiv}`} title="Home">
                    <Link to="/">
                        <img src="./assets/favicons/favicon-48.png" alt="Err: img not found" style={{display: 'block', margin: '0 auto'}}/>
                    </Link>
                </button>
            </div>
            <div>
                <h2>|connectHack</h2>
            </div>
            <div className={`${TestStyles.NavbarButtonContainer}`}>
                <button className={`${TestStyles.SignUpButton}`}>Sign Up</button>
                <button className={`${TestStyles.SignInButton}`}>Sign In</button>
            </div>
        </div>
    );
}
 
export default Navbar;