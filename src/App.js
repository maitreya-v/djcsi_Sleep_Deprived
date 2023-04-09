import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import Aos from 'aos';
import "aos/dist/aos.css";
import Testing from './pages/Testing'
import Dashboard from './pages/dashboard';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Profile from './pages/Profile';
import Home from './pages/Home';
import { useEffect } from 'react';
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import alanBtn from "@alan-ai/alan-sdk-web";
import { ALAN_API } from "./constants";
import BarGraph from './components/BarGraph';
import ErrorPage from './pages/ErrorPage';
import WidgetLogin from './pages/WidgetLogin';
import Otp from './pages/otp/Otp';
import Settings from './pages/Settings';
import Parser from './pages/Parser';
// import Card from './pages/OTP/card'
// import Navbar from './components/Navbar'

function App() {

  const [theme, colorMode] = useMode();
  useEffect(() => {
    Aos.init({ duration: 500, once: false });
  }, []);

  useEffect(() => {
    alanBtn({
      key: ALAN_API,
      onCommand: (commandData) => {
        if (commandData.command === "go:back") {
          // Call the client code that will react to the received command
        }
      },
    });
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
     <ThemeProvider theme={theme}>
     <CssBaseline />
    <div className="App">
      <Router>
        
      <Routes>
        {/* <Route exact path="/" element={}/> */}
        {/* <Route path="/profile" element={<Profile/>}/> */}
        {/* <Route path="/otp" element={<Card/>}/> */}
        <Route path="/parser" element={<Parser/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/otp" element={<Otp/>}/>
        <Route path="/bar" element={<BarGraph/>}/>
        <Route path="/testing" element={<Testing/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/widgetlogin" element={<WidgetLogin/>} />
        <Route path="/error" element={<ErrorPage/>} />
      </Routes>
    </Router>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
