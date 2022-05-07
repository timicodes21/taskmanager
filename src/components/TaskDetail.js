import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Container } from 'react-bootstrap'
import UpdateTask from './UpdateTask';
import { useNavigate } from 'react-router';

const TaskDetail = ({ data, setData }) => {
 
    const [taskData, setTaskData] = useState(null);
    const [task, setTask] = useState('')
    const [taskDate, setTaskDate]= useState(new Date())
    const [completed, setCompleted] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const config = {
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        };
        const url = `https://myschedule-api.herokuapp.com/api/v1/tasks/${id}`;
        const data = {
            task,
            date: taskDate,
            completed
        }
        axios.patch(url, data, config)
            .then(res => {
                navigate('/dashboard')
            }).catch(err => {
                console.log(err);
            })
    }

    const handleDelete =  (e) => {
        const token = localStorage.getItem('token');
        const config = {
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        };
        const url = `https://myschedule-api.herokuapp.com/api/v1/tasks/${id}`;
        axios.delete(url, config)
            .then(res => {
                console.log(res)
                navigate('/dashboard')
            })
    }
    

  return (
    <div className='dashboard'>
        <Container>
            <div className="pt-2 d-flex justify-content-between">
                <div>
                    <p className="font36 font700 fst-italic text-green">Task Manager</p>
                </div>
            </div>
            <UpdateTask data={taskData} setData={setTaskData} id={id} task={task} setTask={setTask} taskDate={taskDate} setTaskDate={setTaskDate} handleSubmit={handleSubmit} completed={completed} setCompleted={setCompleted} handleDelete={handleDelete} />
        </Container>
    </div>
  )
}

export default TaskDetail