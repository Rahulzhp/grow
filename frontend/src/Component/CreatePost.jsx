import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/CreatePost.css'

const CreatePost = () => {
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
        axios.post('http://localhost:8080/posts', formData)
            .then((res) => {
                console.log(res)
                setFormData({
                    title: '',
                    content: ''
                });
            })
            .catch((er) => {
                console.error(error.response.data);
            })




    }


    return (
        <div className="create-post-container">
            <h2>Create Post</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
                    <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content" required />
                    <button type="submit">Create Post</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
