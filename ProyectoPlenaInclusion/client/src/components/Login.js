import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgImage from '../fotos/fondoWeb.png';
import { Link } from 'react-router-dom';

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/loginCustomer', {
                mail: mail,
                password: password
            });
            history("/dashboard");
        } catch (error) {
            console.log(error);
        setMsg("Error al iniciar sesión. Verifica tus credenciales.");
        }
    }

    return (
        <section 
          className="hero has-background-grey-light is-fullheight is-fullwidth"
          style={{ 
            backgroundImage: `url(${bgImage})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center'
          }}
        >
          <div className="hero-body">
            <div className="row justify-content-center align-items-center vh-100">
              <div className="col-sm-12 col-md-6 col-lg-3">
                <div className="card border shadow-lg p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                  <h2 className="text-center mb-4">PlenaInclusión</h2>
                  <form onSubmit={Auth} className="box">
                    <div className="form-group">
                      <label className="label">Email</label>
                      <div className="controls">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username@gmail.com"
                          value={mail}
                          onChange={(e) => setMail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="label">Password</label>
                      <div className="controls">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="**"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="field mt-5">
                      <button className="btn btn-success btn-block">Login</button>
                    </div>
                    <div className="field mt-3">
                      {msg && <p className="help is-danger">{msg}</p>}
                    </div>
                    <div className="field mt-3">
                      <p className="text-center">
                        <Link as={Link} to="/register">¿No tienes una cuenta? Crea una</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}

export default Login