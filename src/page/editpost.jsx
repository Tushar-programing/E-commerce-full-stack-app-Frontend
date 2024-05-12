import React, { useEffect, useState } from 'react'
import { List } from '../component'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import conf from "../component/conf/conf"


function editpost() {
    const navigate = useNavigate();
    const [post, setPost] = useState();
    console.log("editpost", post);
    const {slug} = useParams();
    useEffect(() => {
        if (slug) {
            axios.post(`${conf.apiUrl}/product/getProduct/${slug}`, {}, {
                withCredentials: true
            }).then((post) => {
                setPost(post.data.data);
            })
        }
        else {
            navigate("/")
        }
        // console.log(post)
    }, [slug, navigate])
    
  return post ? (
        <div>
          <List post={post}/>
        </div>
    ) : null

}

export default editpost
