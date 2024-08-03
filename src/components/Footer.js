import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{backgroundColor:"ButtonShadow"}}>
      <Container>
        <Row>
            <Col style={{fontFamily:"monospace" }} className='text-center py-3'>
                Copyright &copy; SHOPPIE.in
            </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
