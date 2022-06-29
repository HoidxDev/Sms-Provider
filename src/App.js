import React, { useState } from "react";
import Form from './components/Form'
import ProviderList from "./components/ProviderList";
import AddProvider from "./components/AddProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [token, setToken] = useState()
  const [data, setData] = useState()
  function handleToken (e) {
    setToken(e)
  }
  function takeData (e) {
    setData(e)
  }
  return (
    <div className="App w-full h-100vh flex items-center justify-center font-poppins">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Form authToken={handleToken}/>} />
            <Route path="providerlist" element={<ProviderList token={token} sendData={takeData} />}/>
            <Route path="addprovider" element={<AddProvider takenData={data} token={token}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
