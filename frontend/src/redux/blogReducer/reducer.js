import { FAIL, GET_BLOG_SUCCESS, POST_BLOG_SUCCESS, REQUEST } from "./actionTypes"

const initialState={
    isLoading:false,
    isError:false,
    blogs:[]
}

export const reducer=(state=initialState,{type,payload})=>{
    switch(type){
        case REQUEST: return {...state,isLoading:true}
        case POST_BLOG_SUCCESS: return {...state,isLoading:false}
        case GET_BLOG_SUCCESS: return {...state,isLoading:false, blogs:payload}
        case FAIL: return {...state, isLoading:false, isError:true}
        default: return state
    }
}