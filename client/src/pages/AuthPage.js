import { useState } from 'react';
import { useHttp } from '../hooks/http.hook';

export const AuthPage = () => {
  const { loading, request, error } = useHttp();

  const [ form, setForm ] = useState({
    email: '', password: ''
  });

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      console.log(data);
    } catch (err) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>URL Shortener</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  onChange={ changeHandler }
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  onChange={ changeHandler }
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-1"
              style={{ marginRight: 10 }}
              disabled={ loading }
            >
              Log in
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={ registerHandler }
              disabled={ loading }
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}