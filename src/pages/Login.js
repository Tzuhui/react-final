import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    username: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((preState) => ({ ...preState, [name]: value }));
  };
  const submit = async () => {
    const res = await axios.post('/v2/admin/signin', state);
    document.cookie = `reactFinalToken=${res.data.token}; expires=${new Date(res.data.expired).toUTCString()};`;
    document.cookie = `reactFinalUID=${res.data.uid};`;
    if (res.data.success) {
      navigate('/admin/products');
    }
  };
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>登入帳號</h2>
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
