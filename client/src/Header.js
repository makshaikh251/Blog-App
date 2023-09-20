import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
    const {setUserInfo, userInfo} = useContext(UserContext);
  useEffect(() => {
    axios.get('http://localhost:4000/profile', {
      withCredentials: true,
    })
    .then((response) => {
        setUserInfo(response.data);
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
  }, []); 

  function logout() {
    axios.post('http://localhost:4000/logout', null, {
      withCredentials: true,
    })
    .then(() => {
      setUserInfo(null);
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
  }

  const username = userInfo?.username;
  return (
    <header>
      <Link to='/' className='logo'>MyBlog</Link>
      <nav>
        {username ? (
          <>
            <Link to='/create'>Create new Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
