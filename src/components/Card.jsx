import { tokens } from "../theme";
import React from 'react'
import {Typography , Box} from '@mui/material'
import { useTheme } from "@mui/material";
import cardImage from '../assets/images/cardImage.png'
const Card = (props) => {


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <>
    <div
      key={props.id}
      className="w-full rounded-xl shadow-lg border relative bg-gray-100"
    >
      <div className="px-4 py-6">
        <h1 className="text-gray-800 text-xl font-bold mb-2">{(props.name)}</h1>
        <h1 className="text-gray-400 text-sm mb-4 flex items-center gap-2"> 
        </h1>
        <Box display='flex' height='100%'>
        <Typography variant='h6' color={colors.grey[600]}>
            {props.testimonial}
        </Typography>
        </Box>
        {/* <div className="border-t border-b p-3 flex justify-between items-center">
          <h1 className="text-gray-400"> Date :</h1>
          <h1 className="text-gray-600 text-2xl font-bold">{data.date}</h1>
        </div> */}
      </div>
     
    </div>
    </>
  )
}

export default Card