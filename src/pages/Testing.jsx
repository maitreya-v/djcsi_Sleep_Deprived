import React from 'react'
import {Typography , useTheme , Box} from '@mui/material'
import {tokens} from '../theme';
import { height } from '@mui/system';


const Testing = () => {
const theme = useTheme()
const colors=tokens(theme.palette.mode)

  return (
    <>
      <Box p='20px' display='flex' justifyContent='center' alignItems='center' height='100%'>
          <Box display='grid' gridTemplateColumns='repeat(7,1fr)' height='50%' width='70%'> 
                   <Box gridColumn='span 3'  backgroundColor={colors.primary[400]}></Box>
                   <Box gridColumn='span 2' backgroundColor={colors.redAccent[400]}></Box>
                   <Box backgroundColor={colors.blueAccent[400]}> </Box>
                   <Box backgroundColor={colors.grey[400]}></Box>
          </Box>
      </Box>
    </>
  )
}

export default Testing