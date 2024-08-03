import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-use-history'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    const history = useHistory()

    const submitHandler=(e)=>{
        e.preventDefault()

        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }




  return (
    <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control type='text' name='q' onChange={(e)=>setKeyword(e.target.value)}
        placeholder='Search Products...' className='mr-sm-2 ml-sm-5'>
        </Form.Control>
        <Button type='submit' variant='success' className='p-2' style={{backgroundColor:"#f76c6c"}}>
        <FontAwesomeIcon icon={faSearch} />
        </Button>
    </Form>
  )
}

export default SearchBox
