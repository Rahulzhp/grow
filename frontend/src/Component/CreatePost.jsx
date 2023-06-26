import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/CreatePost.css'
import Navbar from '../AppRouter/Navbar';
import { useToast } from '@chakra-ui/react';

const CreatePost = () => {
    const toast = useToast()
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        axios.post('https://handsome-pink-squid.cyclic.app/project/add', formData)
            .then((res) => {
                console.log(res)
                setFormData({
                    title: '',
                    content: ''
                });
                if (res.data == "posted") {
                    toast({
                        title: 'Posted Successfully.',
                        description: "You have Posted your Content",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
            .catch((er) => {
                console.log(er);
            })
    }


    return (
        <>
            <Navbar />
            <div className='container'>
                <div className="create-post-container">
                    <h4>Create Post</h4>
                    <div className='form-container'>
                        <form onSubmit={handleSubmit}>
                            <label>Create Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
                            <label>Create Content</label>
                            <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content" required />
                            <button type="submit">Create Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreatePost;
