import { Box, Button, TextField, Typography, MenuItem, Slider } from "@mui/material";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import { useTheme } from "@mui/system";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
const Settings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const ageGroups = [
    {value: "3+", label: "3+"},
    {value: "7+", label: "7+"},
    {value: "12+", label: "12+"},
    {value: "16+", label: "16+"},
    {value: "18+", label: "18+"}
  ]
  const days = [
    {value: "Monday", label: "Monday"},
    {value: "Tuesday", label: "Tuesday"},
    {value: "Wednesday", label: "Wednesday"},
    {value: "Thursday", label: "Thursday"},
    {value: "Friday", label: "Friday"},
    {value: "Saturday", label: "Saturday"},
    {value: "Sunday", label: "Sunday"},
  ]
  const timeSessions = [ "0min", "15min", "30min", "45min", "1hr", "1hr 15min", "1hr 30min", "1hr 45min", "2hr", "2hr 15min", "2hr 30min", "2hr 45min", "3hr", "3hr 15min", "3hr 30min", "3hr 45min", "4hr",]
  return (
    <Box m = "20px">
      <Box display='flex' justifyContent='space-between'>
      <Header title = "SETTINGS" />
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
      </Box>
       <Box 
        display = "grid"
        gridTemplateColumns = "repeat(12, 1fr)"
        gap = "20px"
        minChildWidth = "500px"
      >
        <Box
          gridColumn="span 12"
          backgroundColor = "#f2f0f0" 
          borderRadius = "5px"
          p = "40px"
        >
          <Box display = "flex" flexDirection = "column">
          <Typography fontSize = "1.5rem" fontWeight = "bold" mb = "4px">
            Set Daily Session Time Limit
          </Typography>
          <Typography mb = "15px">
            Set a daily session screen time limit for your child.
          </Typography>
          </Box>
          <TextField
            id="outlined-select-currency"
            select
            defaultValue="Monday"
          >
            {days.map((day) => (
              <MenuItem key={day.value} value={day.value}>
                {day.label}
              </MenuItem>
            ))}
          </TextField>
          <Box display = "grid" gridTemplateColumns = "repeat(15, 1fr)" mt = "5px">
            <Box 
              gridColumn = "span 3" 
              minChildWidth = "200px" 
              display = "flex" 
              flexDirection = "column"
              sx = {{ backgroundColor: "#fff", p: "15px", borderRadius: "5px", mr: "5px", mb: "5px", mt: "5px" }}
              justifyContent = "space-around"
            >
              <Typography mb = "5px">11pm - 7am</Typography>
              <Slider
                aria-label="Small steps"
                disabled
                defaultValue={0}
                step={15}
                min={0}
                max={240}
                valueLabelDisplay="auto"
                backgroundColor = "#a4a9fc"
                sx = {{
                  '& .MuiSlider-thumb': {
                    color: "#a4a9fc"
                  },
                  '& .MuiSlider-track': {
                    color: "#a4a9fc"
                  },
                  '& .MuiSlider-rail': {
                    color: "#a4a9fc"
                  }
                }}
              />
              <Button disabled sx = {{ mt: "10px", backgroundColor: "#a4a9fc"}}>Set</Button>
            </Box>
            <Box 
              gridColumn = "span 3" 
              minChildWidth = "200px" 
              display = "flex" 
              flexDirection = "column"
              sx = {{ backgroundColor: "#fff", p: "15px", borderRadius: "5px", m: "5px" }}
            >
              <Typography mb = "5px">7am - 11am</Typography>
              <Slider
                aria-label="Small steps"
                defaultValue={0}
                step={15}
                min={0}
                max={240}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => timeSessions[value/15]}
                backgroundColor = "#a4a9fc"
                sx = {{
                  '& .MuiSlider-thumb': {
                    color: "#a4a9fc"
                  },
                  '& .MuiSlider-track': {
                    color: "#a4a9fc"
                  },
                  '& .MuiSlider-rail': {
                    color: "#a4a9fc"
                  }
                }}
              />
              <Button sx = {{ mt: "10px", backgroundColor: "#a4a9fc"}}>Set</Button>
            </Box>
            <Box 
              gridColumn = "span 3" 
              minChildWidth = "200px" 
              display = "flex" 
              flexDirection = "column"
              sx = {{ backgroundColor: "#fff", p: "15px", borderRadius: "5px", m: "5px" }}
            >
              <Typography mb = "5px">11am - 3pm</Typography>
              <Slider
                aria-label="Small steps"
                defaultValue={0}
                step={15}
                min={0}
                max={240}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => timeSessions[value/15]}
                backgroundColor = "#a4a9fc"
                sx = {{
                  '& .MuiSlider-thumb': {
                    color: "#a4a9fc"
                  },
                  '& .MuiSlider-track': {
                    color: "#a4a9fc"
                  },
                  '& .MuiSlider-rail': {
                    color: "#a4a9fc"
                  }
                }}
              />
              <Button sx = {{ mt: "10px", backgroundColor: "#a4a9fc"}}>Set</Button>
            </Box>
            <Box 
              gridColumn = "span 3" 
              minChildWidth = "200px" 
              display = "flex" 
              flexDirection = "column"
              sx = {{ backgroundColor: "#fff", p: "15px", borderRadius: "5px", m: "5px" }}
            >
              <Typography mb = "5px">3pm - 7pm</Typography>
              <Slider
                aria-label="Small steps"
                defaultValue={0}
                step={15}
                min={0}
                max={240}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => timeSessions[value/15]}
                backgroundColor = "#a4a9fc"
                sx = {{
                  '& .MuiSlider-thumb': {
                    color: "#a4a9fc"
                  },
                  '& .MuiSlider-track': {
                    color: "#a4a9fc"
                  },
                  '& .MuiSlider-rail': {
                    color: "#a4a9fc"
                  }
                }}
              />
              <Button sx = {{ mt: "10px", backgroundColor: "#a4a9fc"}}>Set</Button>
            </Box>
            <Box 
              gridColumn = "span 3" 
              minChildWidth = "200px" 
              display = "flex" 
              flexDirection = "column"
              sx = {{ backgroundColor: "#fff", p: "15px", borderRadius: "5px", m: "5px" }}
            >
              <Typography mb = "5px">7pm - 11pm</Typography>
              <Slider
                aria-label="Small steps"
                defaultValue={0}
                step={15}
                min={0}
                max={240}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => timeSessions[value/15]}
                backgroundColor = "#a4a9fc"
                sx = {{
                  '& .MuiSlider-thumb': {
                    color: "#a4a9fc"
                  },
                  '& .MuiSlider-track': {
                    color: "#a4a9fc"
                  },
                  '& .MuiSlider-rail': {
                    color: "#a4a9fc"
                  }
                }}
              />
              <Button sx = {{ mt: "10px", backgroundColor: "#a4a9fc"}}>Set</Button>
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn="span 12"
          backgroundColor = "#f2f0f0" 
          display="flex"
          borderRadius = "5px"
          p = "40px"
          justifyContent = "space-between"
        >
          <Box display = "flex" flexDirection = "column">
            <Typography fontSize = "1.5rem" fontWeight = "bold" mb = "4px">
              Set Age Group
            </Typography>
            <Typography>
              Set the age group of your child.
            </Typography>
          </Box>
          <Box pt = "3px">
            <TextField
              id="outlined-select-currency"
              select
              defaultValue="3+"
            >
              {ageGroups.map((group) => (
                <MenuItem key={group.value} value={group.value}>
                  {group.label}
                </MenuItem>
              ))}
            </TextField>
            <Button sx = {{ml: "15px", mt: "10px", backgroundColor: "#a4a9fc"}}>Set</Button>
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor = "#f2f0f0"
          display="flex"
          borderRadius = "5px"
          p = "40px"
          justifyContent = "space-between"
          flexDirection = "column"
        >
          <Typography fontSize = "1.5rem" fontWeight = "bold" mb = "4px">
            Change Password
          </Typography>
          <TextField placeholder = "New Password" id = "outlined-basic" sx = {{mb: "16px"}} />
          <TextField placeholder = "Confirm New Password" id = "outlined-basic" sx = {{ mb: "16px" }} />
          <Button sx = {{ backgroundColor: "#a4a9fc" }}>Set</Button>
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor = "#f2f0f0"
          display="flex"
          borderRadius = "5px"
          p = "40px"
          justifyContent = "space-between"
          flexDirection = "column"
        >
          <Typography fontSize = "1.5rem" fontWeight = "bold" mb = "4px" sx = {{ mb: "16px" }}>
            Manage Blocked Websites
          </Typography>
          <TextField placeholder = "Type URL to add/remove" id = "outlined-basic" />
          <Button sx = {{ backgroundColor: "#a4a9fc" }}>Add</Button>
          <Button sx = {{ backgroundColor: "#a4a9fc" }}>Remove</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Settings;
