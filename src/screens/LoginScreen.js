import React, {useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import { useHistory } from 'react-router-use-history'
import { Form, Button, Row, Col } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {login} from '../sagaActions/sagaUserAction'
import FormContainer from '../components/FormContainer'
import Meta from '../components/Meta'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()

    const dispatch = useDispatch()
    const history = useHistory()

    const userLogin = useSelector(state=>state.userLogin)
    
    const {loading, error, userInfo} = userLogin
    

    const redirect = location.search ? location.search.split("=")[1]:'/'

    useEffect(()=>{
        if(userInfo && userInfo.length !== 0){
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(login(email, password))
        console.log(error)
    }


  return (
    <div style={{backgroundColor:"ButtonShadow", borderRadius:"10px", border:"solid 0.2px grey"}}>
    <Meta title='login' />
    <h1 style={{textAlign:"center", color:"CaptionText", fontFamily:"inherit", fontWeight:"bold", fontStyle:"oblique", textDecoration:"underline"}}>SHOPPIE<span style={{color:"GrayText"}}>.in</span></h1>
    <FormContainer>
      <h1 style={{color:"Highlight"}}>Sign In</h1>
      {error&&<Message variant='danger'>{error}</Message>}
      {loading&&<Loader/>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}>
              
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
            <Form.Label>Password Address</Form.Label>
            <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}>
                
            </Form.Control>
        </Form.Group>
        <Button style={{marginTop:"10px", width:"100%"}} type='submit' variant='primary'>
            Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
        New Customer? <Link to={redirect?`/register?redirect=${redirect}`:'/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
    </div>
  )
}

export default LoginScreen
