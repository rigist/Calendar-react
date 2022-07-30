import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

//import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
let nanoid=(t=21)=>
{let e="",r=crypto.getRandomValues(new Uint8Array(t));for(;t--;)
{let n=63&r[t];e+=n<36?n.toString(36):n<62?(n-26)
.toString(36).toUpperCase():n<63?"_":"-"}return e};


ReactDOM.render(
  
     
      <App/>    
   
 ,
  document.getElementById('root')
);

 