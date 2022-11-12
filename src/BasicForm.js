import React, { useState } from 'react'
import { useEffect } from 'react';
import './style.css'
const BasicForm = () => {
    
    const [input,setInput] = useState({
        email : "",
        password : "",
        id:""
    });

    const [allInput,setAllinput] = useState([]);
    const [inputError,setInputError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) =>{
        setInput(
            {
                ...input, id:new Date().getTime().toString(),[e.target.name] : e.target.value
            }
        )
    }

    const submitForm = (e) =>{
        e.preventDefault();
        setInputError(valid(input));
        setIsSubmit(true);
        console.log(inputError);
        setTimeout(() =>{
            setIsSubmit(false);
        },3000);
    }

    useEffect(() =>{
        if(Object.keys(inputError).length === 0 && isSubmit){
            setAllinput({...allInput,input})
            console.log(allInput);
            setInput(
                {
                email : "",
                password : "",
                id:""
                }
            )
        }
    },[inputError])

    function valid(value){

        let errors = {};
        const regux = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!value.email){
            errors.email = "Email is required!";
        }else if(!regux.test(value.email)){
            errors.email = "This is not valid Email!";
        }
        if(!value.password){
            errors.password = "password is required!";
        }else if(value.password.length < 4){
            errors.password = "password will be more than 4 digit!";
        }else if(value.password.length > 10){
            errors.password = "password will be less than 10 digit!";
        }
        return errors;
    }
  return (
    <>
       {
        Object.keys(inputError).length === 0 && isSubmit ? (<div className='SUCCESSFULLY'>SUCCESSFULLY SUBMITTED!</div>) : ( <pre>
            {JSON.stringify(input,undefined,1)}
        </pre>)
       }
       
        <form action="" onSubmit={submitForm}>
        <h1>LOGIN</h1>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" name='email' id='email' placeholder='Enter Your Email' value={input.email} onChange={handleChange}/>
                <p>{inputError.email}</p>
            </div>
           
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' id='password' placeholder='Enter Your Password' value={input.password} onChange={handleChange}/>
                <p>{inputError.password}</p>
            </div>
          
            <button type='submit'>Login</button>
        </form>

        {/* <div>
            {
                allInput.map((elm) =>{
                    const {id,email,password} = elm;
                    console.log(elm);
                        return(
                            <div key={id}>
                                <p>{email}</p>
                                <p>{password}</p>
                            </div>
                        )
                })
            }
        </div> */}
       
    </>
  )
}

export default BasicForm


