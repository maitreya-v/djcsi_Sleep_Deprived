import React from 'react'
import { MdInterpreterMode } from 'react-icons/md'
import axios from 'axios'
import { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';

const Otp = () => {
  const [input, setInput] = useState('')
  const navigate = useNavigate();
  const [email,setEmail] = useState('')
  useEffect(()=>{
    setEmail(localStorage.getItem('email'))
  })

  useEffect(() => {
    console.log(input);
  }, [input]);

  const onSubmitHandler = () => {
    // const mergedInput = Object.values(input).join('');
    const email=localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const postObj={
      'email':email,
      // 'password':password,
      'otp':input
    }
    setInput('')
    axios.post('https://django-cloudrun-awg4zxeuca-uc.a.run.app/api/otp/',postObj).then((res)=>{
      console.log(postObj)
      console.log(res)
      navigate('/')
    })
  }



  const handleChange = (event) => {
    // const { id, value } = event.target
    setInput(event.target.value)
    console.log(event)
    console.log(input)
  }

  return (
   <>
<div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
  <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div class="flex flex-col items-center justify-center text-center space-y-2">
        <div class="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div class="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your email {email}</p>
        </div>
      </div>

      <div>
        {/* <form action="" method="post"> */}
          <div class="flex flex-col space-y-16">
            <div class="flex flex-row items-center justify-between mx-auto w-full max-w-sm">
              {/* {
                [1,2,3,4,5,6].map((item,i)=>(
                  <div class="w-20 h-16  ">
                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#a4a9fc] " type="number" name="" id={i}  maxLength={1} onChange={handleChange}  value={input[`input${i}`]} />
              </div>
                ))
              } */}
             <TextField id="outlined-basic" label="Enter OTP" variant="outlined" fullWidth onChange={(e)=>handleChange(e)}/>
            </div>

            <div class="flex flex-col space-y-5 ">
              <div>
                <button class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#a4a9fc]
                hover:bg-[#7e83ec] border-none text-white text-sm shadow-sm" onClick={onSubmitHandler} type='button'> 
                  Verify Account
                </button>
              </div>

              <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p> <a class="flex flex-row items-center text-[#a4a9fc]" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
              </div>
            </div>
          </div>
        {/* </form> */}
      </div>
    </div>
  </div>
</div>
   </>
  )
}

export default Otp