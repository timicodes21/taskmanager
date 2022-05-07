import React, { useEffect, useState } from 'react'
import { Form, Button, FloatingLabel, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios'
import Spinner from '../assets/Spinner.gif'
import Moment from 'react-moment';
import moment from 'moment'
import { Link } from 'react-router-dom';

const Createtask = ({ task, setTask, handleSubmit, setData, data, taskDate, setTaskDate, completedTasks, pending, setPending, setCompletedTasks }) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        const config = {
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        };
        const url = 'https://myschedule-api.herokuapp.com/api/v1/tasks';
        setLoading(true);
        axios.get(url, config)
            .then(res => {
                const completed = res.data.tasks.filter(task => task.completed);
                setCompletedTasks(completed)
                const pend = res.data.tasks.filter(task => task.completed === false);
                setPending(pend)
                setLoading(false)
                setData(res.data.tasks);
                setError(false)
            }).catch(err =>{
                setLoading(false)
                setData(data)
                setError(true)
            })

    }, [setData, setPending, setCompletedTasks]) 

  return (
    <div>
        <Form onSubmit={handleSubmit} className="my-2">
            <FloatingLabel>
                <Form.Control as="textarea" placeholder="Drop your task" value={task} required onChange={(e) => setTask(e.target.value)} className="login-input" style={{ height: '200px' }}/>
            </FloatingLabel>
            <div className="my-3">
                <p className="font500 font14 text-danger my-2">Set Deadline</p>
                <input type="date" id="deadline" value={taskDate} onChange={e => setTaskDate(e.target.value)} className="deadline rounded p-3 w-100" required/>
            </div>
            <Button className="my-2 p-3 font18 font500 bg-green w-100 login-button text-white shadow-lg" type="submit">
                Save
            </Button>
        </Form>
        {loading && <Image src={Spinner} />}
        {error && <p className="font14 font500 text-danger">Error fetching your data</p>}
        <Row>
            {
                data ? 
                data.length === 0 ? <div>
                    <p className="font500 font18 text-danger my-2 d-none d-md-block">You have no task</p>
                    <p className="font500 font14 text-danger my-2 d-md-none">You have no task</p>
                    {/* <Button type="submit" className="my-2 py-2 px-3 font14 font700 bg-green login-button text-white shadow-lg">Create task</Button> */}
                </div> : 
                <Row className="my-2" >
                <p className="font500 font18 text-navyblue my-2">You have <span className="fw-bold text-green">{data.length}</span> {data.length === 1 ? "task": "tasks"}</p>
                {data.map(task => (
                    <Col key={task._id} xs={12}>
                        <div className="shadow-sm p-2 bg-grey rounded my-2">
                            <Link to={`/tasks/${task._id}`}>
                                <Row>
                                    <Col xs={12} md={5}>
                                        <p className="font500 font18 text-secondary my-2">{task.task}</p>
                                    </Col>
                                    <Col xs={12} md={5}>
                                        <p className="font500 font12 text-danger my-2">DEADLINE: <span className="font14 text-danger"> {moment(task.date).format("MMM Do")}</span></p>
                                    </Col>
                                    <Col xs={12} md={2}>
                                        {task.completed ? <p className="font500 font16 text-green">completed</p> : <p className="font500 font16 text-danger">Pending</p>}
                                    </Col>
                                </Row>
                            </Link>
                        </div>
                    </Col>
                ))}
                {completedTasks && <div><p className="font500 font18 text-navyblue my-2">You have <span className="fw-bold text-green">{completedTasks.length}</span> completed {completedTasks.length === 1 ? "task": "tasks"}</p>
                {completedTasks.map(task => (
                    <Col key={task._id} xs={12}>
                        <div className="shadow-sm p-2 bg-grey rounded my-2">
                            <Link to={`/tasks/${task._id}`}>
                                <Row>
                                    <Col xs={12} md={5}>
                                        <p className="font500 font18 text-secondary my-2">{task.task}</p>
                                    </Col>
                                    <Col xs={12} md={5}>
                                        <p className="font500 font12 text-blue my-2">DEADLINE: <span className="font14"> {moment(task.date).format("MMM Do")}</span></p>
                                    </Col>
                                    <Col xs={12} md={2}>
                                        {task.completed ? <p className="font500 font16 text-green">completed</p> : <p className="font500 font16 text-danger">Pending</p>}
                                    </Col>
                                </Row>
                            </Link>
                        </div>
                    </Col>
                ))}</div>}
                {pending && <div><p className="font500 font18 text-navyblue my-2">You have <span className="fw-bold text-green">{pending.length}</span> pending {pending.length > 1 ? "tasks": "task"}</p>
                {pending.map(task => (
                    <Col key={task._id} xs={12}>
                        <div className="shadow-sm p-2 bg-grey rounded my-2">
                            <Link to={`/tasks/${task._id}`}>
                                <Row>
                                    <Col xs={12} md={5}>
                                        <p className="font500 font18 text-secondary my-2">{task.task}</p>
                                    </Col>
                                    <Col xs={12} md={5}>
                                        <p className="font500 font12 text-danger my-2">DEADLINE: <span className="font14 text-danger"> {moment(task.date).format("MMM Do")}</span></p>
                                    </Col>
                                    <Col xs={12} md={2}>
                                        <p className="font500 font16 text-blue my-2">{task.completed ? <p className="font500 font16 text-green">completed</p> : <p className="font500 font16 text-danger">Pending</p>}</p>
                                    </Col>
                                </Row>
                            </Link>
                        </div>
                    </Col>
                ))}</div>}
                </Row> 
                : ""
            }
        </Row>
    </div>
  )
}

export default Createtask
