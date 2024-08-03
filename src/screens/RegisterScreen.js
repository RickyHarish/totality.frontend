import React, {useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import { useHistory } from 'react-router-use-history'
import { Form, Button, Row, Col } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register} from '../sagaActions/sagaUserAction'
import FormContainer from '../components/FormContainer'
import Meta from '../components/Meta'


const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const location = useLocation()

    const dispatch = useDispatch()
    const history = useHistory()

    const userRegister = useSelector(state=>state.userRegister)
    
    const {loading, error, userInfo} = userRegister
    

    const redirect = location.search ? location.search.split("=")[1]:'/'

    useEffect(()=>{
        if(userInfo && userInfo.length !== 0){
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const submitHandler=(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("Entered passwords didn't match")
        }else{
            dispatch(register(name, email, password))
        }
        
    }


  return (
    <div style={{backgroundColor:"ButtonShadow", borderRadius:"10px", border:"solid 0.2px grey"}}>
        <h1 style={{textAlign:"center", color:"CaptionText", fontFamily:"inherit", fontWeight:"bold", fontStyle:"oblique", textDecoration:"underline"}}>SHOPPIE<span style={{color:"GrayText"}}>.in</span></h1>
    <FormContainer>
      <h1 style={{color:"Highlight"}}>Sign Up</h1>
      <Meta title='Register' />
      {error&&<Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      {loading&&<Loader/>}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}>
            </Form.Control>
        </Form.Group>
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
        <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}>
                
            </Form.Control>
        </Form.Group>
        <Button style={{marginTop:"10px", width:"100%"}} type='submit' variant='primary'>
            Register
        </Button>
        
      </Form>
      <Row className='py-3'>
        <Col>
        Already Have an Account? <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>Login Here!</Link>
        </Col>
      </Row>
    </FormContainer>
    </div>
  )
}

export default RegisterScreen
