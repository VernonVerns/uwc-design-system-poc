import { ArrowRight } from '@carbon/icons-react';
import { Button, Column, FlexGrid, PasswordInput, Row} from '@carbon/react'
import { UWCButton, UWCTextInput } from '@uwc/react';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    useEffect(() => {
        document.title = 'UWC Design System POC - Login Page';
    }, []);

    return (
        <div id='login_page'>
            <div className='header'>
                <img src="https://uwc-za.b-cdn.net/files/images/UWC_logo_full-colour-04.svg" style={{width: "160px"}} alt="UWC Logo" />
            </div>
            <FlexGrid>
                <Row>
                    <Column align={"center"}>
                        <div className='form-container'>
                            <div className='form-header'>
                                <h4>Welcome Back</h4>
                                <p>Enter your credentials to sign in to your account.</p>
                            </div>
                            <div className='spacing-20'></div>
                            <form action="" method="post">
                                <UWCTextInput 
                                    id='email' 
                                    name='email' 
                                    type='email' 
                                    placeholder='Email' 
                                    labelText="Email Address" 
                                    helperText="" 
                                    size='md' 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='uwc-input'
                                    readonly={false}
                                />
                                <PasswordInput 
                                    id='password' 
                                    name='password' 
                                    placeholder='Password' 
                                    labelText="Password" 
                                    helperText="" 
                                    size='md' 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='uwc-input'
                                />
                                <p className='forgot-password'><a href="#">Forgot Password?</a></p>
                                <div className='btn-group'>
                                    <Button kind='primary' type='submit' size='md' renderIcon={ArrowRight} className='login-btn' href={'/dashboard'}>Login</Button>
                                    <p className='btn-divider'>or</p>
                                    <UWCButton kind='secondary' size='md' className='microsoft-btn'>Sign in with Microsoft</UWCButton>
                                    <p className='sign-up'>Don't have an account? <Link to={'/register'}>Sign Up</Link></p>
                                </div>
                            </form>
                        </div>
                    </Column>
                </Row>
            </FlexGrid>
        </div>
    )
}

export default LoginPage