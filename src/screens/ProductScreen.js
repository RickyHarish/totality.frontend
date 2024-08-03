import React, {useState, useEffect }from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Button, Image, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams} from 'react-router-dom'
import { useHistory } from 'react-router-use-history'
import {useDispatch, useSelector} from 'react-redux'
import {listProductDetails, createProductReview} from '../sagaActions/sagaProductAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'
// import { addToCart } from '../sagaActions/sagaCartAction'

const ProductScreen = ({match}) => {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const productDetails = useSelector(state=>state.productDetails)
    const {loading, product, error} = productDetails

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state=>state.productReviewCreate)
    const {success:successProductReview, error:errorProductReview} = productReviewCreate


    const {id} = useParams()
    const history = useHistory();

    const dispatch = useDispatch()

    useEffect(()=>{
        if(successProductReview){
            alert('Review Submitted')
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(id))
    }, [id, dispatch, successProductReview])

    const addToCartHandler=()=>{
        history.push(`/cart/${id}?qty=${qty}`);
        
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(createProductReview(id, {rating, comment}))

    }

    
 //  const product =  products.find(p=> p._id===id)
    
  return (
    <div style={{backgroundColor:"transparent"}}>
        <Link className='btn btn-light my-3' to='/'>Go Back</Link>
        {loading?<Loader />:error?<Message variant="danger"/>:
        <>
        <Meta title={product.name} />
        <Row >
            <Col md={5} style={{backgroundColor:"transparent", border:"solid 1px lightgrey", borderRadius:"10px"}}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3} style={{border:"solid 1px lightgrey", borderRadius:"10px", margin:"2px"}}>
                <ListGroup style={{backgroundColor:"transparent"}} variant='flush'>
                    <ListGroup.Item style={{backgroundColor:"transparent"}}>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor:"transparent"}}> 
                        <Rating  value={product.rating} text={` ${product.numReviews} reviews`}/>
                    </ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor:"transparent"}}>
                        Price: {`\u20B9 `}{product.price}
                    </ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor:"transparent"}}>
                        Description: {product.description}
                    </ListGroup.Item>
                    </ListGroup>
            </Col>
            <Col md={3} >
                <Card style={{backgroundColor:"transparent"}}>
                    <ListGroup style={{backgroundColor:"transparent"}}  variant='flush'>
                        <ListGroup.Item style={{backgroundColor:"transparent"}}>
                            <Row style={{backgroundColor:"transparent"}}>
                                <Col style={{backgroundColor:"transparent"}}>
                                    Price: 
                                </Col>
                                <Col style={{backgroundColor:"transparent"}}>
                                <strong>{`\u20B9 `}{product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup variant='flush'>
                        <ListGroup.Item style={{backgroundColor:"transparent"}}>
                            <Row>
                                <Col>
                                    Status: 
                                </Col>
                                <Col>
                                {product.countInStock>0? "In Stock":"Out Of Stock"}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {product.countInStock >0 && (
                            <ListGroup.Item style={{backgroundColor:"transparent"}}>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                    <Form.Control as='select' value={qty} onChange={(e)=>setQty(parseInt(e.target.value))} >
                                        {[...Array(product.countInStock).keys()].map(x => (
                                            <option key={x+1} value={x+1} >{x+1}</option>
                                        ))}
                                    </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                        <ListGroup variant='flush'>
                        <ListGroup.Item style={{backgroundColor:"transparent"}}>
                            <Button 
                            disabled={product.countInStock===0} 
                            className='btn-block' 
                            type='button'
                            onClick={addToCartHandler}
                            >
                                Add To Cart 
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        <Row >
            <Col md={6} style={{border:"solid 1px lightgrey", borderRadius:"10px", margin:"5px"}}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                    {product.reviews.map(review=>(
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating}/>
                            <p>{review.createdAt && review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item style={{backgroundColor:"transparent"}}>
                        <h2>Write a Customer Review</h2>
                        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                        {userInfo ? (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='rating'>
                                <Form.Label>
                                    Rating
                                </Form.Label>
                                <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                                    <option value=''>Select...</option>
                                    <option value='1'>1 - Poor</option>
                                    <option value='2'>2 - Fair</option>
                                    <option value='3'>3 - Good</option>
                                    <option value='4'>4 - Very Good</option>
                                    <option value='5'>5 - Excellent</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='comment'>
                                <Form.Label>
                                    Comment
                                </Form.Label>
                                <Form.Control  onChange={(e)=>setComment(e.target.value)} as='textarea' row='3' value={comment}>

                                </Form.Control>
                            </Form.Group>
                            <Button type='submit' variant='primary'>Submit</Button>
                        </Form>):<Message>Please <Link to='/login'>Sign in</Link> to write a review</Message>}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        </>
        }
    </div>
  )
}

export default ProductScreen 
