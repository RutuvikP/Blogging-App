import { Box, Button, Center, FormControl, FormLabel, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Textarea, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, getBlog } from "../redux/blogReducer/action";
import { useSearchParams } from "react-router-dom";

export default function Blogs() {

    const {isOpen,onOpen,onClose} = useDisclosure();
    const toast=useToast();
    const authStore = useSelector((store)=>store.authReducer)
    console.log(authStore,"auth");
    const blogStore=useSelector((store)=>store.blogReducer);
    console.log(blogStore,"blog");
    const dispatch=useDispatch();
    const [searchParams,setSearchParams]=useSearchParams();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [category,setCategory] = useState("");
    const [date,setDate] = useState("");
    const [page,setPage] = useState(1);
    const [filterCategory,setFilterCategory]=useState("");
    const [filterTitle,setFilterTitle] = useState("");
    const [orderBy,setOrderBy]=useState("");
    const avatar="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
    let params={page};
    if(filterCategory){
        params["category"]=filterCategory
    }
    if(orderBy){
        params["sort"]="date"
        params.orderBy=orderBy
    }
    if(filterTitle){
        params["title"]=filterTitle
    }

    const handlePost=()=>{
        const payload={title,content,category,date,avatar,username:authStore.user.username}
        dispatch(addBlog(payload,authStore.token)).then((res)=>{
            toast({
                title:"Blog Posted",
                status:"success",
                isClosable:true,
                duration:3000,
                position:'top'
            })
            onClose()
        })
    }

    useEffect(()=>{
        setSearchParams(params)
        dispatch(getBlog(params,authStore.token))
    },[page,orderBy,filterCategory,filterTitle])

    return (
        <Box>
            <Center mt={'10px'}>
                <Button onClick={onOpen} colorScheme="blue">Create a Blog</Button>
                <FormControl w={'20%'}>
                    <Input type="text" placeholder="Search by title" onChange={(e)=>setFilterTitle(e.target.value)}/>
                </FormControl>
                <FormControl w={'20%'}>
                <Select placeholder="Sort by Date" onChange={(e)=>setOrderBy(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </Select>
                </FormControl>
                <FormControl w={'20%'}>
                <Select placeholder="Filter by Category" onChange={(e)=>setFilterCategory(e.target.value)}>
                    <option value="Business">Business</option>
                    <option value="Tech">Tech</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Entertainment">Entertainment</option>
                </Select>
                </FormControl>
            </Center>
            {/* modal start */}
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your blog</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder='Username' value={authStore.user.username} isReadOnly />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Avatar</FormLabel>
                            <Input placeholder='Avatar' value={avatar} isReadOnly />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Title</FormLabel>
                            <Input placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Date</FormLabel>
                            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Content</FormLabel>
                            <Textarea placeholder="Content of blog" value={content} onChange={(e) => setContent(e.target.value)}></Textarea>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Category</FormLabel>
                            <Select placeholder="Select Category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="Business">Business</option>
                                <option value="Tech">Tech</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Entertainment">Entertainment</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='pink' mr={3} onClick={handlePost}>
                            POST
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* modal finish */}
            {blogStore.blogs && blogStore.blogs.map((el)=>(
                <Box key={el._id} w={'30%'} m={'auto'} p={'10px'} mt={'20px'} mb={'10px'} boxShadow={"rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"}>
                    <HStack w={'60%'} m={'auto'}>
                        <Image src={el.avatar} borderRadius={'50%'} w={'80px'}/>
                        <VStack gap={'1px'}>
                            <Text fontWeight={'bold'}>{el.title}</Text>
                            <Text fontWeight={'semibold'}>{el.category}</Text>
                            <Text fontWeight={'semibold'} color={'gray'}>Date: {el.date}</Text>
                        </VStack>
                    </HStack>
                    <Text mt={'5px'}>{el.content}</Text>
                    <Text mt={'5px'}>{el.likes} ❤️</Text>
                    {el.authorID===authStore.user._id?<Button mt={'5px'} colorScheme="blue">Edit</Button>:null}
                    {el.authorID===authStore.user._id?<Button mt={'5px'} colorScheme="pink">Delete</Button>:null}
                </Box>
            ))}
            <Center>
                <Button colorScheme="pink" isDisabled={page<=1?true:false} variant={'outline'} onClick={()=>setPage(page-1)}>Prev</Button>
                <Button>{page}</Button>
                <Button colorScheme="pink" isDisabled={blogStore.blogs.length<5?true:false} variant={'outline'} onClick={()=>setPage(page+1)}>Next</Button>
            </Center>
        </Box>
    )
}