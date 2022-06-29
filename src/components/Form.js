import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function Form({authToken}) {
  const url = 'http://c4f2.acsight.com:7710/connect/token'
  const {register, handleSubmit, formState: { errors },} = useForm();
  let navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const resp = await axios.post(url, new URLSearchParams({
        grant_type: "password",
        client_id: "ClientIdWithFullAccess",
        client_secret: "fullAccessSecret",
        username: data.username,
        password: data.password
      }))
      if (resp.status === 200) {
        authToken(resp.data.access_token)
        navigate('providerlist')
      }
    } 
    catch (error) {
      console.log(error.response)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-3/6 grid grid-cols-2 gap-20 p-10 text-white">
      <input className="bg-slate-600 placeholder:text-white" placeholder="Username" type="text" {...register("username")} />
      <input className="bg-slate-600 placeholder:text-white" placeholder="Password" type="password" {...register("password")} />
      <input className="bg-gray-600 w-2/6 cursor-pointer" type="submit" />
    </form>
  );
}
