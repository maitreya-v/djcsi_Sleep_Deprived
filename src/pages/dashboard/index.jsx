import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import Navbar from '../../components/Navbar';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { Link } from "react-router-dom";
import BarGraph from "../../components/BarGraph";
import TimeRemaining from '../../components/TimeRemaining';
import BlockedLog from '../BlockedLog.json'
import RecentlyViewed from '../RecentlyVisited.json'
import { useEffect } from "react";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
 
  

  return (
  <>
  {/* <Navbar/> */}
   {/* <div data-aos='zoom-in-up'> */}
   <Box m="20px" >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* <p>hi</p> */}
        <Header title="DASHBOARD" subtitle="Welcome Mr. Aryan Mehta" />

        <Box display='flex' alignItems='center' justifyContent='center'>
          <Link to='/'>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginRight: "20px"
            }}
          >
            
            <KeyboardBackspaceOutlinedIcon sx={{ mr: "10px" }} />
            Go Back
          </Button>
            </Link>
          <Link to='/parser'>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginRight: "20px"
            }}
          >
            
            {/* <KeyboardBackspaceOutlinedIcon sx={{ mr: "10px" }} /> */}
            Parser
          </Button>
            </Link>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        // offset={1}
        gridAutoRows="150px"
        gap="20px"
        // style={{'data-aos':'zoom-in-up'}}
      >
        {/* <h1>hi</h1> */}
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]} 
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Verification Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Total time spent (in minutes)"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="Happy Parents"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Requests received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          {/* <p>hi</p> */}
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            // alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Time Spent Today
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                4 hours 31 minutes
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="90%" m="-20px 0 0 0" width='100%' display='flex' alignItems='center' >
            <BarGraph isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`3px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recently Visited Websites
            </Typography>
          </Box>
          {RecentlyViewed.map((item) => (
            <Box
              key={item.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {item.website_url}
                </Typography>
                {/* <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography> */}
              </Box>
              <Box color={colors.grey[100]}>{item.date}</Box>
              <Box color={colors.grey[100]}>{item.login_time}</Box>
              <Button
              style={{backgroundColor:'#a4a9fc'}}
                // bg={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
                variant='contained'
              >
               Block
              </Button>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
         

         

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          
        >
          <Typography variant="h5" fontWeight="600">
            Time Remaining
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <TimeRemaining size="150" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              2 hours 32 minutes remaining
            </Typography>
            <Typography>Based on </Typography>
          </Box>
        </Box>


        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`3px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            Blocked Site Log
            </Typography>
          </Box>
          {BlockedLog.map((item) => (
            <Box
              key={item.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {item.website_url}
                </Typography>
                {/* <Typography color={colors.grey[100]}> */}
                  {/* {item.user} */}
                {/* </Typography> */}
              </Box>
              <Box color={colors.grey[100]}>{item.date}</Box>
              <Box color={colors.grey[100]}>{item.login_time}</Box>
              <Box color={colors.grey[100]}>{item.attempts} attempts</Box>
              <Button
              style={{backgroundColor:'#a4a9fc'}}
                // bg={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
                variant='contained'
              >
               Allow
              </Button>
            </Box>
          ))}
        </Box>


      
      </Box>
    </Box>
   {/* </div> */}
  </>
  );
};

export default Dashboard;
