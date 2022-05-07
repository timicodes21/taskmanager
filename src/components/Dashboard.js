import React, { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap';
import axios from 'axios'
import CreateTask from './CreateTask';
import { useNavigate } from 'react-router';

const Dashboard = () => {
    
    const username = localStorage.getItem('username') || '';
    const [taskData, setTaskData] = useState(null);
    const [task, setTask] = useState();
    const [taskDate, setTaskDate]= useState(new Date());
    const [completedTasks, setCompletedTasks] = useState(null);
    const [pending, setPending] = useState(null);

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
            date: taskDate
        }
        axios.post(url, data, config)
            .then(res => {
                console.log(res)
                const newTask = res.data.task;
                setPending([...pending, newTask])
                setTaskData([...taskData, newTask])
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
            </div>
            <CreateTask task={task} setTask={setTask} handleSubmit={handleSubmit} setData={setTaskData} data={taskData} taskDate={taskDate} setTaskDate={setTaskDate} completedTasks={completedTasks} pending={pending} setPending={setPending} setCompletedTasks={setCompletedTasks} />
        </Container>
    </div>
  )
}

export default Dashboard