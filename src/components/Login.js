import React, { useState } from 'react'
import axios from 'axios'
import { Container, Row, Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import usePasswordShow from '../hooks/usePasswordShow';
import { useNavigate } from 'react-router';

const Login = () => {
    const { passwordShow, showPassword } = usePasswordShow();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const config = {
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            }
        };
        const url = 'https://myschedule-api.herokuapp.com/api/v1/auth/login';
        const data = {
            email, password
        }
        axios.post(url, data, config)
            .then(res => {
                setLoading(false)
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("username", res.data.user.name);
                console.log(res);
                navigate('/dashboard')
            })
            .catch(err => {
                setLoading(false)
                setError(err.response.data.msg)
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
                    <p className="font36 font700 text-ash">Sign in to <br />Manage your tasks</p>
                    <p className="font16 text-ash mt-3">If you don't have an account <br />You can <Link to="/register" className="font500">Register here!</Link></p>
                </Col>
                <Col sm={12} md={6} className="p-2 mt-3">
                    <div className="px-md-3 py-3 rounded">
                        <div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="email" required value={email} onChange={e => setEmail(e.target.value)} className="login-input p-3" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type={passwordShow ? "text" : "password"} placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} className="login-input p-3" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" className="font14 text-green" onClick={showPassword} label="show password" />
                                </Form.Group>
                                <p className="font14 text-danger">{error}</p>
                                <button type="submit" className="my-2 p-3 font18 font500 bg-green w-100 login-button text-white shadow-lg">
                                    {loading ? 'Logging in...' : 'Login' }
                                </button>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Login