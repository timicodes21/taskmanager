import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, FloatingLabel, Button, Row, Col } from 'react-bootstrap'
import moment from 'moment'

const UpdateTask = ({ data, setData, id, task, setTask, taskDate, setTaskDate, handleSubmit, completed,setCompleted, handleDelete }) => {

    const [error, setError] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');
        const config = {
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        };
        const url = `https://myschedule-api.herokuapp.com/api/v1/tasks/${id}`;
        axios.get(url, config)
            .then(res => {
                console.log(res)
                setData(res.data.task);
                setTask(res.data.task.task)
                setError(false)
            }).catch(err =>{
                setData(data)
                setError(true)
            })
    }, [setData])

  return (
    <div>
        <Form onSubmit={handleSubmit} className="my-2">
            <FloatingLabel>
                <Form.Control as="textarea" placeholder="Update the task" value={task} required onChange={(e) => setTask(e.target.value)} className="login-input" style={{ height: '200px' }}/>
            </FloatingLabel>
            <div className="my-3">
                <p className="font500 font14 text-danger my-2">Set New Deadline</p>
                <input type="date" id="deadline" value={taskDate} onChange={e => setTaskDate(e.target.value)} className="deadline rounded p-3 w-100"/>
            </div>
            <div className="my-3">
                <p className="font500 font14 text-blue my-2">Status?</p>
                <select value={completed} onChange={e => setCompleted(e.target.value)} className="deadline rounded p-3 w-100 text-navyblue">
                    <option value={false} className="text-danger">Pending</option>
                    <option value={true} className="text-green">Completed</option>
                </select>
            </div>
            <Button className="my-2 p-3 font18 font500 bg-green w-100 login-button text-white shadow-lg" type="submit">
                Update
            </Button>
        </Form>
        {error && <p className="font14 font500 text-danger">Error fetching your data</p>}
        <Row className="my-2" >
            {data ? <div>
                <Col xs={12}>
                    <div className="shadow-sm p-2 bg-grey rounded my-2">
                        <Row>
                            <Col xs={12} md={5}>
                                <p className="font500 font18 text-blue my-2">{data.task}</p>
                            </Col>
                            <Col xs={12} md={5}>
                                <p className="font500 font12 text-blue my-2">DEADLINE: <span className="font14 text-danger"> {moment(data.date).format("MMM Do")}</span></p>
                            </Col>
                            <Col xs={12} md={2}>
                                {data.completed ? <p className="font500 font14 text-green">completed</p> : <p className="font500 font14 text-danger">Pending</p>}
                            </Col>
                        </Row>
                    </div>
                </Col> 
                <div className="my-2 d-flex justify-content-end">
                    <div>
                        <Button onClick={handleDelete} id={data._id} className="my-2 py-2 px-3 font14 font700 create-button bg-danger text-white shadow-lg">Delete</Button>
                    </div>
                </div>
                </div>
                : ""
            }
        </Row>
    </div>
  )
}

export default UpdateTask