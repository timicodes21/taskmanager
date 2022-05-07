import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import Wallpaper from '../assets/wallpaper.jpg'
import Reveal from 'react-reveal/Reveal';
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <Container className="my-3">
        <div>
          <p className="font36 font700 fst-italic text-green">Task Manager</p>
          <p className="text-center font24 font700 text-navyblue">The future of productivity</p>
        </div>
        <Row>
            <Col sm={12} md={6} className="p-2">
              <Reveal effect="fadeInUp">
                <Image src={Wallpaper} fluid />
              </Reveal>
            </Col>
            <Col sm={12} md={6} className="p-2">
              <Reveal effect="fadeInUp">
                <div className="my-md-5">
                  <div className="my-md-5 py-md-5 my-3">
                    <Link to="/login">
                      <button className="my-2 p-2 font18 font500 bg-green w-100 home-button text-white">Login</button>
                    </Link>
                    <Link to="/register">
                      <button className="my-2 p-2 font18 font500 bg-yellow w-100 home-button text-white">Register</button>
                    </Link>
                  </div>
                </div>
              </Reveal>
            </Col>
        </Row>
    </Container>
  )
}

export default LandingPage