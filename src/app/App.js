import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage';
import Faqpage from './pages/faq';
import Pricespage from './pages/prices';
import Contactpage from './pages/contact';
import Aboutpage from './pages/about';
import BecomeAPropage from './pages/become-a-pro';
import Upcoming from './pages/upcoming_service';
import History from './pages/Servicehistory';
// import Umanagement from './menuitem.tsx/user-management';
import ServiceRequest from './pages/servicerequest';
import Bookservicepage from './pages/book-service';
import UserRegistration from './pages/user-registration';
import Umanagement1 from './components/user-management';

function App() {
  const theme = createTheme({
   
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200
      },
      components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true,
          },
        },
      },
      transitions: {
        create: () => 'none',
      }
    }
   
  });


  return (
    <>

      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
             <Route path="/resetpassword/:token">
               <Homepage/>
             </Route>
             <Route path="/faq" component={Faqpage}></Route>
             <Route path="/prices" component={Pricespage}></Route>
             <Route path="/contact" component={Contactpage}></Route>
             <Route path="/about" component={Aboutpage}></Route>
             <Route path="/pro" component={BecomeAPropage}></Route>
             <Route path="/history" component={History} ></Route>
             <Route path="/upcoming" component={Upcoming}/>
             <Route path="/srequest" component={ServiceRequest}/>
             <Route path="/management" component={Umanagement1}></Route> 
             <Route path="/bookservice" component={Bookservicepage}></Route>
             <Route path="/homepage" component={Homepage}></Route>
             <Route path="/uregistration" component={UserRegistration}></Route>
             
            <Route path="/" exact component={Homepage}></Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
