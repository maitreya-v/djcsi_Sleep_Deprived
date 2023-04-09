import React from 'react'
import { Input ,Button,Box,TextField , Typography , Stack} from '@mui/material';
import { useState ,useEffect} from 'react';
import axios from 'axios';
const Parser = () => {
    // useEffect(() => {

    // })

    const [text,setText] = useState('')
    const [response,setResponse] = useState([])
const [result,setResult] = useState('');
    const onSearchHandler = () =>{
        console.log(text)

        const postObj={
            'url':text
          }
          console.log(postObj)
          axios.post('https://efd8-136-232-1-174.ngrok-free.app/api/web_block/',postObj).then((res)=>{
            setResult(res.data.status)
            console.log(res.data.status)
          })
    }
  return (

    <>
      <Box m='20px' h='100vh' w='100vw'>
        <Box display='flex' justifyContent='center' w=''>
      <TextField id="outlined-basic" label="Search field" variant="outlined" onChange={(e)=>setText(e.target.value)}/>
      <Button variant="contained"  onClick={()=>onSearchHandler()}>Search</Button>
        </Box>
    <Box mt='20px' display='flex' justifyContent='center'>
        <Typography>This website is {result}</Typography>
    </Box>

 
      </Box>
    </>
  )
}

export default Parser