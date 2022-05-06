import React, { useState } from 'react'
import { Row, Form, Container, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios';
import usePasswordShow from '../hooks/usePasswordShow';
import { useNavigate } from 'react-router';

const Register = () => {
    const { passwordShow, showPassword } = usePasswordShow();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [match, setMatch] = useState(null)
    const [text, setText] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleMatch = () => {
        if(password === confirmPassword){
            setMatch(true)
        } else {
            setMatch(false)
            setText('password does not match')
        }
    }
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        const config = {
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            }
        };
        const url = 'https://myschedule-api.herokuapp.com/api/v1/auth/register';
        const data = {
            name, email, password
        }
        axios.post(url, data, config)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                setLoading(false)
                navigate('/login')
            })
            .catch(err => {
                setLoading(false)
                if(err.response.data.msg === 'Duplicate valued entered for email field, please choose another value'){
                    setError('User already exists')
                }else{
                    setError(err.response.data.msg)
                }
            })
    }

  return (
    <div className="login">
        <Container>
            <div className="py-3">
                <p className="font36 font700 fst-italic text-green">Task Manager</p>
            </div>
            <Row>
                <Col sm={12} md={6} className="p-2 d-flex flex-column justify-content-center">
                    <p className="font36 font700 text-ash">Sign Up to <br />Manage your tasks</p>
                    <p className="font16 text-ash mt-3">If you already have an account <br />You can <Link to="/login" className="font500">Login here!</Link></p>
                </Col>
                <Col sm={12} md={6} className="p-2 mt-2 mb-1">
                    <div className="px-md-3 py-3 rounded">
                        <div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="name" required value={name} onChange={e => setName(e.target.value)} className="login-input p-3" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="email" required value={email} onChange={e => setEmail(e.target.value)} className="login-input p-3" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type={passwordShow ? "text" : "password"} placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} className="login-input p-3" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type={passwordShow ? "text" : "password"} placeholder="confirm password" required value={confirmPassword} onKeyUp={handleMatch} onChange={e => setConfirmPassword(e.target.value)} className="login-input p-3" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" className="font14 text-green" onClick={showPassword} label="show password" />
                                </Form.Group>
                                {match? (<p className="font14 text-success">correct password</p>) : <p className="font14 text-danger">{text}</p>}
                                <p className="font14 text-danger">{error}</p>
                                <Button disabled={match ? false : true} type="submit" className="my-2 p-3 font18 font500 bg-green w-100 login-button text-white shadow-lg">
                                    {loading ? 'Creating account...' : 'Register' }
                                </Button >
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Register