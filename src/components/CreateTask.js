import React, { useEffect } from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import axios from 'axios'

const Createtask = ({ task, setTask, handleSubmit, setLoading, setData, setError }) => {

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
                console.log(res)
                setLoading(false)
                setData(res.data.tasks);
                setError(false)
            }).catch(err =>{
                setLoading(false)
                setError(true)
            })
    }, [setData]) 

  return (
    <Form onSubmit={handleSubmit} className="my-2">
        <FloatingLabel>
            <Form.Control as="textarea" placeholder="Drop your task" value={task} required onChange={(e) => setTask(e.target.value)} className="login-input" style={{ height: '200px' }}/>
        </FloatingLabel>
        <Button className="my-2 p-3 font18 font500 bg-green w-100 login-button text-white shadow-lg" type="submit">
            Save
        </Button>
    </Form>
  )
}

export default Createtask