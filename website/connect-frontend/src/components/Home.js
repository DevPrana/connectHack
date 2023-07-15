import bodyStyles from './Home.module.css'
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    
    const navigate=useNavigate();

    const RegisterButtonClicked=()=>{
        // console.log("register button debug");
        navigate("/register");
    };

    const FindMateButtonClicked=()=>{
        console.log("Find Button Clicked");
        navigate("/find");
    };

    return (<>
        <div className={`${bodyStyles.MainBody}`}>
            <div className={`${bodyStyles.ButtonsDiv}`}>
                
                <button 
                    className={`${bodyStyles.FindMateButton}`}
                    onClick={() => {FindMateButtonClicked();} }>Find Team</button>
                
                <button
                    className={`${bodyStyles.RegisterButton}`}
                    onClick={() => {RegisterButtonClicked();}}>Register
                </button>
            </div>
        </div>      
    </>   
    );
}

export default HomePage;