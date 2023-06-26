import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Styles/Home.css"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useToast
} from '@chakra-ui/react'
import Navbar from '../AppRouter/Navbar';

const Home = () => {
    const [data, setData] = useState([]);
    const toast = useToast()
    const [currentPostId, setCurrentPostId] = useState("");
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    };

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = (() => {
        axios.get(`http://localhost:8080/project/`)
            .then((res) => {
                console.log(res.data.post)
                setData(res.data.post)
            })
            .catch((er) => {
                console.log(er)
            })
    })

    const handleedit = () => {
        // console.log("id", currentPostId)
        axios.patch(`http://localhost:8080/project/${currentPostId}`, formData)
            .then((res) => {
                if (res.data == "edited") {
                    toast({
                        title: 'Edited Successfully.',
                        description: "You have Edit your Content",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                }
                console.log(res)
                onClose()
            })
            .catch((er) => {
                console.log(er)
            })

        setTimeout(() => {
            fetchData()
        }, 300)

    }
    const handleDelete = (id) => {
        // console.log(id)
        axios.delete(`http://localhost:8080/project/${id}`)
            .then((res) => {
                if (res.data == "deleted") {
                    toast({
                        title: 'Deleted Successfully.',
                        description: "You have Deleted your Content",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                }
                setTimeout(() => {
                    fetchData()
                }, 300)

            })
            .catch((er) => {
                console.log(er)
            })


    }

    return (
        <>
            <Navbar />
            <div className="login-container">
                <div>
                    <h1>Grow Global Strategies Private Limited</h1>
                </div>

                <div>
                    <div className="post-list-container">
                        <h2>Posts</h2>
                        {data && data.map(post => (
                            <div key={post._id} className="post-card">
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                <div className='btn'>
                                    <button id='utentbtn' onClick={() => {
                                        onOpen(); setCurrentPostId(post._id)
                                    }}>Edit</button>
                                    <button id='dtentbtn' onClick={() => handleDelete(post._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Post</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input ref={initialRef} name="title" value={formData.title} onChange={handleChange} placeholder='Enter Title' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Contet</FormLabel>
                                <Textarea name="content" value={formData.content} onChange={handleChange} placeholder='Enter Content' />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={handleedit} colorScheme='blue' mr={3}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </>
    )
}

export default Home