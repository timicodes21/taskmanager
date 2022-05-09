import React from 'react'
import { Row, Col, Image } from 'react-bootstrap';
import Spinner from '../assets/Spinner.gif'
import moment from 'moment'

const AllUsersTasks = ({ data, loading }) => {
    
  return (
    <div>
        {loading && <Image src={Spinner} />}
        <Row>
            {
                data ? 
                data.length === 0 ? <div>
                    <p className="font500 font18 text-danger my-2 d-none d-md-block">There are no users tasks at the moment</p>
                    <p className="font500 font14 text-danger my-2 d-md-none">There are no users tasks at the moment</p>
                </div> : 
                <Row className="my-2" >
                <p className="font500 font18 text-navyblue my-2">There are <span className="fw-bold text-green">{data.length}</span> {data.length === 1 ? "task": "tasks"}</p>
                {data.map(task => (
                    <Col key={task._id} xs={12}>
                        <div className="shadow-sm p-2 bg-grey rounded my-2">
                            <Row>
                                <Col xs={12} md={2}>
                                    <p className="font500 font12 text-secondary my-2">user: <span className="font14 text-green">{task.username}</span></p>
                                </Col>
                                <Col xs={12} md={5}>
                                    <p className="font500 font18 text-secondary my-2">{task.task}</p>
                                </Col>
                                <Col xs={12} md={3}>
                                    <p className="font500 font12 text-danger my-2">DEADLINE: <span className="font14 text-danger"> {moment(task.date).format("MMM Do")}</span></p>
                                </Col>
                                <Col xs={12} md={2}>
                                    {task.completed ? <p className="font500 font14 text-green my-2">completed</p> : <p className="font500 font14 my-2 text-danger">Pending</p>}
                                </Col>
                            </Row>
                        </div>
                    </Col>
                ))}
                </Row> 
                : ""
            }
        </Row>
    </div>
  )
}

export default AllUsersTasks
