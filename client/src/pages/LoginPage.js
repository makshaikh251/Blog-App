import { useContext, useState } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setUserInfo(response.data);   
        setRedirect(true);
        setRedirect(true);
      } else {
        // Handle non-successful response (e.g., wrong credentials)
        alert('Wrong credentials');
      }
    } catch (error) {
      console.error('Axios error:', error);
    }
  }

  return (
    <>
      {redirect ? (
        <Navigate to={'/'} />
      ) : (
        <form className="login" onSubmit={login}>
          <h1>Login</h1>
          <input type="text" placeholder="username"
            value={username}
            onChange={ev => setUsername(ev.target.value)}
          />
          <input type="password" placeholder="password"
            value={password}
            onChange={ev => setPassword(ev.target.value)} />
          <button>Login</button>
        </form>
      )}
    </>
  );
}
