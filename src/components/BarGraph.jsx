import React from 'react'
import {Box} from '@mui/material';
import {Chart as ChartJS,
BarElement,
CategoryScale,
LinearScale,
Tooltip,
Legend
}  from 'chart.js';

import { Bar} from 'react-chartjs-2'


ChartJS.register(
    BarElement,
CategoryScale,
LinearScale,
Tooltip,
Legend
)

const BarGraph = () => {
    const data={
       labels:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'],
       datasets:[
        {
            label:'Number of hours',
            data:[3,4.5,5,6,7,8,9],
            backgroundColor:'#a4a9fc',
            borderColor:'black'
        }
       ]
    }

    const options={

    }

  return (
    <>
      {/* <Box> */}
        <Bar data={data} options={options}
         style={{padding:'20px',width:'100%' ,height:'100vh'}}
        ></Bar>
      {/* </Box> */}
    </>
  )
}

export default BarGraph