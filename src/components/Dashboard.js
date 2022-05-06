import React, { useState, useEffect } from 'react'
import { Container, Button, Row, Col, Image, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios'
import Spinner from '../assets/Spinner.gif'
import CreateTask from './CreateTask';

const Dashboard = () => {
    
    const username = localStorage.getItem('username') || '';
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState(null);
    const [task, setTask] = useState('');

    

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const config = {
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        };
        const url = 'https://myschedule-api.herokuapp.com/api/v1/tasks';
        const data = {
            task,
        }
        axios.post(url, data, config)
            .then(res => {
                console.log(res)
                const newTask = res.data.task;
                setData([...data, newTask])
            }).catch(err => {
                console.log(err);
            })
        setTask('')
    } 

  return (
    <div className='dashboard'>
        <Container>
            <div className="pt-2 d-flex justify-content-between">
                <div>
                    <p className="font36 font700 fst-italic text-green">Task Manager</p>
                    <p className="font16 font500 text-navyblue mt-1">Hi <span className="text-blue fw-bold">{username},</span> Manage your task here</p>
                </div>
                <div className="">
                    <Button className="my-2 py-2 px-3 font14 font700 create-button text-white shadow-lg">New task</Button>
                </div>
            </div>
            <CreateTask task={task} setTask={setTask} handleSubmit={handleSubmit} setLoading={setLoading} setData={setData} setError={setError} />
            {loading && <Image src={Spinner} />}
            {error && <p className="font14 font500 text-danger">Error fetching your data</p>}
            <Row>
            {
                data ? 
                data.length === 0 ? <div>
                    <p className="font500 font18 text-danger my-2 d-none d-md-block">You have no task</p>
                    <p className="font500 font14 text-danger my-2 d-md-none">You have no task</p>
                    <Button type="submit" className="my-2 py-2 px-3 font14 font700 bg-green login-button text-white shadow-lg">Create task</Button>
                </div> :
                data.map(task => (
                    <Row className="my-2" key={task._id}>
                        <Col className="font-500 font-18 d-none d-md-block text-secondary">{task.task}</Col>
                    </Row>
                )) : ""
            }
            </Row>
        </Container>
    </div>
  )
}

export default Dashboard