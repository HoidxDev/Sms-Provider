import React, {useEffect, useCallback, useState, useReducer} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function reducer (state, action) {
  switch (action.type) {
    case 1: 
      return "PostaGuvercini";
    case 2:
      return "MobilDev";
    case 3:
      return "JetSMS";
    case 4:
      return "MailJet";
    case 5:
      return "Twilio";
    case 6:
      return "InfoBip";
    case 7:
      return "Vonage";
  }
}

export default function ProviderList({token, sendData}) {
  let navigate = useNavigate()
  const [status, setStatus] = useState(true)
  const [provider, dispatch] = useReducer(reducer, )
  const [data, setData] = useState({
    providerID: provider,
    baseURL: "",
    fromName:"",
    username: "",
    password: "",
    vendorCode:"",
    apiKey: "",
    secretKey: "",
    accountSID: "",
    authToken: "",
    status: "",
    updatedWhen: ""
  })
  const accessToken = token
  const apiUrl = 'http://c4f2.acsight.com:7770/api'

  const authAxios = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded"
    },
  })

  const fetchData = async () => {
    try {
        const result = await authAxios.get(`${apiUrl}/system/sms-provider-list`)
        console.log(result.data)
        const data = result.data.data.partnerProviders[0]
        setStatus(data.status)
        const providerID = data.providerID
        if (providerID === 1) {
          dispatch({type: 1})
        }
        if (providerID === 2) {
          dispatch({type: 2})
        }
        if (providerID === 3) {
          dispatch({type: 3})
        }
        if (providerID === 4) {
          dispatch({type: 4})
        }
        if (providerID === 5) {
          dispatch({type: 5})
        }
        if (providerID === 6) {
          dispatch({type: 6})
        }
        if (providerID === 7) {
          dispatch({type: 7})
        }
        setData({
          providerID: provider,
          baseURL: data.baseURL,
          fromName: data.fromName,
          username: data.username,
          password: data.password,
          vendorCode: data.vendorCode,
          apiKey: data.apiKey,
          secretKey: data.secretKey,
          accountSID: data.accountSID,
          authToken: data.authToken,
          updatedWhen: data.updatedWhen,
        })
        sendData(data)
    } catch (err) {
        console.log(err)
    }
  };


  useEffect(() => {
    fetchData()
    // onSubmit()
  },[])
  
  return (
      <ul className=" w-4/6 grid grid-cols-3 p-5 gap-20">
        <li className="w-6/6 h-10 bg-zinc-800 text-white pt-2 text-left pl-2 text-xl">
          {provider}
        </li>
        <li className="w-6/6 h-10 bg-zinc-800 text-white pt-2 text-left pl-2 text-xl">
          {data.baseURL}
        </li>
        <li className="w-6/6 h-10 bg-zinc-800 text-white pt-2 text-left pl-2 text-xl">
          {data.fromName}
        </li>
        <li className="w-6/6 h-10 bg-zinc-800 text-white pt-2 text-left pl-2 text-xl">
          {data.username}
        </li>
        <li className="w-6/6 h-10 bg-zinc-800 text-white pt-2 text-left pl-2 text-xl">
          {data.password}
        </li>
        <li className="w-6/6 h-10 bg-zinc-800 text-white pt-2 text-left pl-2 text-xl">
          {data.vendorCode}
        </li>
        <li className="w-6/6 h-10 bg-zinc-800 text-white pt-2 text-left pl-2 text-xl">
          {data.apiKey}
        </li>
        <li className="w-6/6 h-10 bg-zinc-800 text-white pt-2 text-left pl-2 text-xl">
          {data.secretKey}
        </li>
        <li className="w-6/6 h-10 bg-zinc-800 text-white pt-2 text-left pl-2 text-xl">
          {data.accountSID}
        </li>
        <li className="w-6/6 h-10 bg-zinc-800 text-white pt-2 text-left pl-2 text-xl">
          {data.authToken}
        </li>
        <select name="status" className='bg-zinc-800 text-white pl-2 outline-none'>
          <option value="true">{status ? "Aktif" : "Pasif"}</option>
          <option value="false">{!status ? "Aktif" : "Pasif"}</option>
        </select>
        <li className="w-6/6 h-10 bg-zinc-800 text-white pt-2 text-left pl-2 text-xl">
          {data.updatedWhen}
        </li>
        <button className='h-12 w-4/6 bg-black text-white' onClick={() => navigate('/addprovider')}> Add a new Provider </button>
      </ul>
  );
}
