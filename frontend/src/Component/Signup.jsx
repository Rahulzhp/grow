import React, { useState } from 'react';
import '../Styles/Signup.css'; // import CSS file for styling

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { Box, Image, useToast } from '@chakra-ui/react';
const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast()
    const navigate = useNavigate()
    const [name, setname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setusernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [signsucess, setsignsucess] = useState(false)
    const [disable, setdisable] = useState(false)
    const payload = {
        name,
        email,
        password
    }

    const onHendell = (e) => {
        if (email === '') {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
        if (name === "") {
            setusernameError(true)
        } else {
            setusernameError(false)
        }

        if (password === '') {
            setPasswordError(true);
        } else {
            setPasswordError(false);
            setdisable(true)
            axios.post("https://handsome-pink-squid.cyclic.app/users/register", payload)
                .then((res) => {
                    if (res.data === "success") {
                        setsignsucess(true)
                        toast({
                            title: 'Account created.',
                            description: "We've created your account for you.",
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        })
                        setTimeout(() => {
                            navigate("/login")
                            setdisable(false)
                            setsignsucess(false)
                        }, 1000)

                    } else {
                        setsignsucess(false)
                        setdisable(false)
                        toast({
                            title: 'Invalid Account.',
                            description: "Your account is not created.",
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                        })
                    }
                })
                .catch(err => setdisable(false))

        }
        e.preventDefault()


    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="container">
                <div className="logo-container">
                    <h4>Best Content App</h4>
                </div>
                <div className="form-container">
                    <form onSubmit={onHendell}>
                        <h3>Create Account</h3>
                        <span style={{ color: emailError ? "red" : '' }}>Username</span>
                        <div className="Username-input-container">
                            <input
                                type="text"
                                placeholder="Create Username"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                className={emailError ? 'error' : ''}

                            />
                        </div>
                        {usernameError && <span className="error-text">Username is required</span>}
                        <span style={{ color: emailError ? "red" : '' }}>Email</span>
                        <div className="Username-input-container">
                            <input
                                type="text"
                                placeholder="Enter Email-id"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={emailError ? 'error' : ''}

                            />
                        </div>
                        {emailError && <span className="error-text">Email is required</span>}
                        <span style={{ color: passwordError ? "red" : '' }}>Password</span>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={passwordError ? 'error' : ''}

                            />
                            <span
                                className={`password-toggle ${showPassword ? 'visible' : ''}`}
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? (
                                    <FontAwesomeIcon icon={faEye} />
                                ) : (
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                )}
                            </span>
                        </div>
                        {passwordError && <span className="error-text">Password is required</span>}


                        <button type="submit" disabled={disable} style={{ backgroundColor: disable ? "gray" : "rgb(4, 115, 215)" }}>Signup</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Signup;