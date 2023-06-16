// blog actions
import axios from "axios"
import { FAIL, GET_BLOG_SUCCESS, POST_BLOG_SUCCESS, REQUEST } from "./actionTypes"

// add blog
export const addBlog = (obj, token) => (dispatch) => {
    dispatch({ type: REQUEST })
   return axios.post(`http://localhost:8080/blogs/add`, obj, {
        headers: { "Authorization": `Bearer ${token}` }
    })
        .then((res) => {
            // console.log(res);
            dispatch({ type: POST_BLOG_SUCCESS })
        })
        .catch((err) => {
            // console.log(err);
            dispatch({ type: FAIL })
        })
}

// get blogs
export const getBlog = (obj, token) => (dispatch) => {
    dispatch({ type: REQUEST })
    let configs={headers: { "Authorization": `Bearer ${token}` }, params:obj}
    axios.get(`http://localhost:8080/blogs`,configs)
        .then((res) => {
            // console.log(res);
            dispatch({type:GET_BLOG_SUCCESS, payload:res.data})
        })
        .catch((err) => {
            // console.log(err);
            dispatch({ type: FAIL })
        })
}

// update blog
export const updateBlog=(obj,blogID,token)=>(dispatch)=>{
    dispatch({ type: REQUEST })
    let configs={headers: { "Authorization": `Bearer ${token}` }}
    return axios.patch(`http://localhost:8080/blogs/update/${blogID}`,obj,configs)
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
        dispatch({ type: FAIL })
    })
}

// delete blog
export const deleteBlog=(blogID,token)=>(dispatch)=>{
    dispatch({ type: REQUEST })
    let configs={headers: { "Authorization": `Bearer ${token}` }}
    return axios.delete(`http://localhost:8080/blogs/delete/${blogID}`,configs)
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
        dispatch({ type: FAIL })
    })
}