import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import RegisterFormStyles from './RegisterForm.module.css';


const RegisterPage = () => {
    
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData]=useState({
        Fname: "",
        Lname: "",
        email: "",
        githubID:""
    });

    /**
     * State that holds the validation errors for form fields.
     * Each property represents a form field name, and its value represents the corresponding error message.
    */
    const [errors, setErrors]=useState({
        Fname: "",
        Lname: "",
        email: "",
        githubID:""
    });

    /**
     * Handle change event for form input fields.
     * Updates the form data state with the new value for the specified field.
     * 
     * @param {object} event - The event object
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    
    /**
     * Handles form submission by validating form data and sending a POST request to the server.
     * @param {Event} event - The event object.
     * @returns {void}
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPerson = { ...formData };
        
        const validation = {
            Fname: validateFname,
            Lname: validateLname,
            email: validateEmail,
            githubID: validateGithubID,
        };

        const newErrors = {};
        let isValid = true;

        Object.keys(formData).forEach((fieldName) => {
            const value = formData[fieldName];
            const validationRule = validation[fieldName];
            
            if (validationRule) {
                const error = validationRule(value);
    
                if (error) {
                    newErrors[fieldName] = error;
                    isValid = false;
                }
            }
        });

        if(!isValid) {
            setErrors(newErrors);
            console.log(errors);
            return;
        }

        setIsLoading(true);     //Wait for server to process request (for button animation)
        await fetch("http://localhost:5050/record",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
        .then((response) => {
            if(response.ok) {   //request was successful
                // TODO: add successfull response animation
                return response.json;   
            }
            else if (response.status === 400){
                // TODO: add bad data sent error
                
            }
        })
        .catch(error => {
            window.alert(error);
            setIsLoading(false);
            return;
        })

        
        
        // Reset form data
        setFormData({
            Fname: "",
            Lname: "",
            email: "",
            githubID:""
        });
        setIsLoading(false);    //server successfully sends response
        navigate("/");
    };

    useEffect(() => {   // On changes in the errors array log the errors to the console
        console.log(errors);
    }, [errors]);
    
    const validateFname = (value) => {
        if (!value) {
          return 'Last name is required';
        }
        if(/[^a-zA-Z]+/.test(value)){
            return "No special symbols allowed";
        }
        if(value.length > 50) {
            return "First name cannot be more than 50 characters"
        }
        // Add more validation rules for Fname if needed
        return '';
    };

    const validateLname = (value) => {

        if (!value) {                       //Check for empty value
          return 'Last name is required';
        }

        if(/[^a-zA-Z]+/.test(value)) {
            return "No special symbols allowed";
        }

        if(value.length > 70) {
            return "Last name cannot be more than 70 characters"
        }
        // Add more validation rules for Lname if needed
        return '';
    };
    
    const validateEmail = (value) => {
        if (!value) {
          return 'Email is required';
        }
        if(!/[^@]+@[^@]+/.test(value)){     //Email regex to check <string1>@<string2> format of addresses.
            return "Enter a valid email address!";
        }
        if(value.length > 70) {
            return "Email address cannot be more than 70 characters";
        }
        // Add more validation rules for email if needed
        return '';
    };
    
    const validateGithubID = (value) => {
        if (!value) {
          return 'Github ID is required';
        }
        if(value.length > 39){      //Max github ID length is 39
            return "Enter valid github ID";
        }
        // Add more validation rules for githubID if needed
        return '';
    };

    return(
        <>
        <h1>This is the register form page</h1>
        <form 
            className={`${RegisterFormStyles.formBody}`}
            onSubmit={handleSubmit}>
                <div className={`${RegisterFormStyles.nameForm}`}>

                    <div className={`${RegisterFormStyles.grid_item_Fname}`}>
                        <label htmlFor='Fname'>First name:</label>
                        <input type="text" id="Fname" name="Fname" value={formData.Fname} onChange={handleChange}/>  
                    </div>

                    <div className={`${RegisterFormStyles.grid_item_Lname}`}>
                        <label htmlFor='Lname'>Last name:</label>
                        <input type="text" id="Lname" name="Lname" value={formData.Lname} onChange={handleChange}/>
                    </div>
                </div>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}/>

                <label htmlFor="message">Github ID:</label>
                <input id="githubID" name="githubID" value={formData.githubID} onChange={handleChange}/>

                <button type="submit">
                    {isLoading ?(<div className={`${RegisterFormStyles.outsideLoad}`}>
                                    <div className={`${RegisterFormStyles.load}`}></div>
                                </div>)
                    : (
                        "Submit"
                    )}
                </button>
        </form>
        </>
    )
}

export default RegisterPage;