import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: '',
    password: '',
  });
  const [loginState, setLoginState] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((preState) => ({ ...preState, [name]: value }));
  };
  const submit = async () => {
    try {
      const res = await axios.post('/v2/admin/signin', state);
      document.cookie = `reactFinalToken=${res.data.token}; expires=${new Date(res.data.expired)};`;
      if (res.data.success) {
        navigate('/admin/products');
      }
    } catch (error) {
      setLoginState(error?.response?.data);
    }
  };
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>登入帳號</h2>

          <div className={`alert alert-danger ${!loginState.message ? 'd-none' : ''}`} role="alert">
            {!loginState.success && loginState.message }
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label w-100">
              Email
              <input id="email" value={state.username} onChange={handleChange} className="form-control" name="username" type="email" placeholder="Email Address" />
            </label>
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label w-100">
              密碼
              <input type="password" className="form-control" value={state.password} name="password" onChange={handleChange} id="password" placeholder="name@example.com" />
            </label>
          </div>
          <button type="button" className="btn btn-primary" onClick={submit}>登入</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
