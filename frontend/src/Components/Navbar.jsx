import { Box, Button, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar(){
    const linkStyles={fontWeight:"bold", color:"whitesmoke"}
    const authStore=useSelector((store)=>store.authReducer)

    const handleLogout=()=>{
        window.location.replace("/")
    }
    return(
        <Box display={'flex'} bgColor={'deeppink'} h={'50px'} alignItems={'center'} justifyContent={'space-around'}>
            <Text fontWeight={'bold'} fontSize={'lg'}>Hello {authStore.user.username?authStore.user.username:"Explorer"}</Text>
            {authStore.token?<Button onClick={handleLogout}>Logout</Button>:<Link style={linkStyles} to={'/'}>Login</Link>}
            <Link style={linkStyles} to={'/register'}>Signup</Link>
            <Link style={linkStyles} to={'/blogs'}>Blogs</Link>
        </Box>
    )
}