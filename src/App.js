import React from 'react'
import './App.css';
import { useState } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer,NotificationManager } from 'react-notifications';
import { upper,lower,num,sym } from './Data';

export default function App() {
  let [passwordlen, setPasswordlen] = useState(10)
  let [uppercase, setUppercase] = useState(false)
  let [lowercase, setLowercase] = useState(false)
  let [number, setNumber] = useState(false)
  let [symbols, setSymbols] = useState(false)
  let [fpass, setFpass] = useState('')

  let passgenrate = () => {
    let setchar = ''
    let finalpass = ''
    if (uppercase || lowercase || number || symbols) {
      if (uppercase) setchar += upper;
      if (lowercase) setchar += lower;
      if (number) setchar += num;
      if (symbols) setchar += sym;
      for (let i = 0; i <= passwordlen-1; i++) {
        finalpass += setchar.charAt(Math.floor(Math.random() * setchar.length))
      }
      setFpass(finalpass)
      NotificationManager.success("Password Generated Sucessfully....");

    }
    else {
      NotificationManager.error("Please Select Any 1 CheckBox");
    }
  }

  let copyText = () => {
    navigator.clipboard.writeText(fpass)
    if(fpass.length>=1){
      NotificationManager.success("Password Copy Sucessfully....");
      setFpass('')

    }
    else{
      NotificationManager.error("Password Not Avaliable");
    }
    

  }
  let clear=()=>{
    setFpass('')

  }

  return (
    <>
      <NotificationContainer/>
      <div class="container">
        <h1>Password Generator</h1>
        <form id="passwordForm">
          <div class="form-group">
            <label for="passwordLength">Password Length:</label>
            <input type="number" id="passwordLength" min={10} max={20} value={passwordlen} onChange={(e) => setPasswordlen(e.target.value)} />
          </div>
          <div class="form-group">
            <label for="uppercase">Include Uppercase:</label>
            <input type="checkbox" id="uppercase" checked={uppercase} onChange={(e) => setUppercase(!uppercase)} />
          </div>
          <div class="form-group">
            <label for="lowercase">Include Lowercase:</label>
            <input type="checkbox" id="lowercase" checked={lowercase} onChange={(e) => setLowercase(!lowercase)} />
          </div>
          <div class="form-group">
            <label for="numbers">Include Numbers:</label>
            <input type="checkbox" id="numbers" checked={number} onChange={(e) => setNumber(!number)} />
          </div>
          <div class="form-group">
            <label for="symbols">Include Symbols:</label>
            <input type="checkbox" id="symbols" checked={symbols} onChange={(e) => setSymbols(!symbols)} />
          </div>
          <button type="button" onClick={passgenrate} id="generateBtn">Generate Password</button>
          <div class="form-group">
            <label for="generatedPassword">Generated Password:</label>
            <input type="text" value={fpass} id="generatedPassword" />
            <button onClick={clear}>Clear</button>
            <button type="button" id="copyBtn" onClick={copyText}>Copy</button>
          </div>
        </form>
      </div>
    </>
  )
}
