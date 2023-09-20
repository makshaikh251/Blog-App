import { useEffect, useState } from "react";
import Post from "../Post";
import axios from "axios";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Use a function to set the posts state
    axios.get('http://localhost:4000/posts')
      .then(response => {
        setPosts(response.data); // Assuming the response contains an array of posts
      })
      .catch(error => {
        console.error('Axios error:', error);
      });
  }, []); // The empty dependency array means this effect runs only once

  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post key={post.id} {...post} /> // Assuming each post has a unique "id" property
      ))}
    </>
  );
}