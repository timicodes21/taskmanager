import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import usePasswordShow from '../hooks/usePasswordShow';
import AllUsersTasks from './AllUsersTasks';

const Admin = () => {
    const { passwordShow, showPassword } = usePasswordShow();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const config = {
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            }
        };
        const url = 'https://myschedule-api.herokuapp.com/api/v1/admin/tasks';
        const data = {
            username, password
        }
        axios.post(url, data, config)
            .then(res => {
                localStorage.setItem('taskusername', username);
                localStorage.setItem('taskpassword', password);
                setLoading(false)
                console.log(res);
                setData(res.data.allTasks)
            })
            .catch(err => {
                setLoading(false)
                setError(err.response.data.msg)
            })
    }

    useEffect(() => {
        const config = {
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            }
        };
        const url = 'https://myschedule-api.herokuapp.com/api/v1/admin/tasks';
        const localUsername = localStorage.getItem('taskusername');
        const localPassword = localStorage.getItem('taskpassword');
        if(localUsername && localPassword){
            const data = {
                username: localUsername, 
                password: localPassword
            }
            axios.post(url, data, config)
                .then(res => {
                    localStorage.setItem('taskusername', username);
                    localStorage.setItem('taskpassword', password);
                    setLoading(false)
                    console.log(res);
                    setData(res.data.allTasks)
                    setUsername(localUsername);
                    setPassword(localPassword);
                })
                .catch(err => {
                    setLoading(false)
                    setError(err.response.data.msg)
                })
        }
        
    }, [])

  return (
      <div className="login">
        <Container>
            <div className="py-3">
                <p className="font font700 fst-italic text-green">Task Manager Admin</p>
            </div>
            <Row>
                <Col sm={12} md={6} className="p-2 d-flex flex-column justify-content-center">
                    <p className="font36 font700 text-ash">Sign in as an admin <br />View Users Tasks</p>
                    <p className="font16 text-ash mt-3">If you don't have an account <br />You can <Link to="/register" className="font500">Register here!</Link></p>
                </Col>
                <Col sm={12} md={6} className="p-2 mt-3">
                    <div className="px-md-3 py-3 rounded">
                        <div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="admin ID" required value={username} onChange={e => setUsername(e.target.value)} className="login-input p-3" />
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
            <AllUsersTasks data={data} loading={loading} />
        </Container>
    </div>
  )
}

export default Admin