import { Box, Typography } from "@mui/material";

const ErrorPage = () => {
  return (
    <Box 
      display = "flex" 
      flexDirection = "column" 
      alignItems = "center"
      sx = {{
        pt: "100px",
      }}
    >
      <Box alignItems = "center" sx = {{
        border: 2,
        p: "50px",
        borderColor: "#aeaeab",
        borderRadius: "10px",
        boxShadow: 2
      }}>
      <Typography
        fontSize = "5rem"
      >
        403
      </Typography>
      <Typography fontSize = "3rem">
        Access Denied
      </Typography>
      </Box>
    </Box>
  );
}

export default ErrorPage;