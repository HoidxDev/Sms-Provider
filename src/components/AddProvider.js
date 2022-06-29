import React, {useState} from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function AddProvider({takenData, token}) {
    const [provider, setProvider] = useState(true)
    const {register, handleSubmit, formState: { errors },} = useForm();
    const [data, setData] = useState({
        providerID: takenData.providerID,
        baseURL: takenData.baseURL,
        fromName: takenData.fromName,
        username: takenData.username,
        password: takenData.password,
        vendorCode: takenData.vendorCode,
        apiKey: takenData.apiKey,
        secretKey: takenData.secretKey,
        accountSID: takenData.accountSID,
        authToken: takenData.authToken,
        status: takenData.status,
        updatedWhen: "",
      })
  const onSubmit = async () => {
    try {
      const resp = await axios.post(
        "http://c4f2.acsight.com:7770/api/system/add-partner-sms-provider",
        {
          ID: "0",
          ProviderID: data.providerID,
          PartnerID: "6",
          BaseURL: data.baseURL,
          FromName: data.fromName,
          Username: data.username,
          Password: data.password,
          VenderCode: data.vendorCode,
          ApiKey: data.apiKey,
          SecretKey: data.secretKey,
          AccountSID: data.accountSID,
          AutToken: data.authToken,
          Status: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp);
    } catch (error) {
      console.log(error.response);
    }
  };
  
  function changeHandler(e) {
    setProvider(e.target.value)
  }

  return (
    <React.Fragment>
       <ul className=" w-4/6 grid grid-cols-3 p-5 gap-20">
        <input placeholder={data.providerID} className="placeholder:text-white w-6/6 h-10 bg-gray-600 text-white pt-2 text-left pl-2 text-xl"/>
        <input placeholder={data.baseURL} className="placeholder:text-white w-6/6 h-10 bg-gray-600 text-white pt-2 text-left pl-2 text-xl"/>
        <input placeholder={data.fromName} className="placeholder:text-white w-6/6 h-10 bg-gray-600 text-white pt-2 text-left pl-2 text-xl"/>
        <input placeholder={data.username} className="placeholder:text-white w-6/6 h-10 bg-gray-600 text-white pt-2 text-left pl-2 text-xl"/>
        <input placeholder={data.password} className="placeholder:text-white w-6/6 h-10 bg-gray-600 text-white pt-2 text-left pl-2 text-xl"/>
        <input placeholder={data.vendorCode} className="placeholder:text-white w-6/6 h-10 bg-gray-600 text-white pt-2 text-left pl-2 text-xl"/>
        <input placeholder={data.apiKey} className="placeholder:text-white w-6/6 h-10 bg-gray-600 text-white pt-2 text-left pl-2 text-xl"/>
        <input placeholder={data.secretKey} className="placeholder:text-white w-6/6 h-10 bg-gray-600 text-white pt-2 text-left pl-2 text-xl"/>
        <input placeholder={data.accountSID} className="placeholder:text-white w-6/6 h-10 bg-gray-600 text-white pt-2 text-left pl-2 text-xl"/>
        <input placeholder={data.authToken} className="placeholder:text-white w-6/6 h-10 bg-gray-600 text-white pt-2 text-left pl-2 text-xl"/>
        <select id="provider" onChange={changeHandler} name="Provider" className='bg-gray-600 text-white pl-2'>
            <option value="0">PostaGuvercini</option>
            <option value="1">MobilDev</option>
            <option value="2">JetSMS</option>
            <option value="3">MailJet</option>
            <option value="4">Twilio</option>
            <option value="5">InfoBip</option>
            <option value="6">Vonage</option>
        </select>
        <button className='h-10 w-6/6 bg-black text-white' onClick={onSubmit}> Add New Provider </button>
      </ul>
    </React.Fragment>
 )
}