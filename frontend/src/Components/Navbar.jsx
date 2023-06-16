import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Navbar(){
    const linkStyles={fontWeight:"bold", color:"whitesmoke"}
    return(
        <Box display={'flex'} bgColor={'deeppink'} h={'50px'} alignItems={'center'} justifyContent={'space-around'}>
            <Link style={linkStyles} to={'/'}>Login</Link>
            <Link style={linkStyles} to={'/register'}>Signup</Link>
            <Link style={linkStyles} to={'/blogs'}>Blogs</Link>
        </Box>
    )
}