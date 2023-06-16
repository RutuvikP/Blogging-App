// auth actions here

import { FAIL, LOGIN_SUCCESS, REQUEST } from "./actionTypes"
import axios from 'axios';

export const registerAction=(obj)=>(dispatch)=>{
    dispatch({type:REQUEST})
   return axios.post(`http://localhost:8080/user/register`,obj)
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
        dispatch({type:FAIL})
    })
}

export const loginAction=(obj)=>(dispatch)=>{
    dispatch({type:REQUEST})
    return axios.post(`http://localhost:8080/user/login`,obj)
    .then((res)=>{
        console.log(res);
        dispatch({type:LOGIN_SUCCESS, payload:{"token":res.data.token,"user":res.data.user}})
    })
    .catch((err)=>{
        console.log(err);
        dispatch({type:FAIL})
    })
}