import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./style.css";
const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/loginProfessional', {
                mail: mail,
                password: password
            });
            history("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            } 
                try {
                    await axios.post('/loginCustomer', {
                        mail: mail,
                        password: password
                    });
                    history("/dashboard");
                } catch (error) {
                    window.alert("Error de autenticación. Verifique sus credenciales e inténtelo de nuevo.");
                }
        }
    }

    const renderForm = (
        <div className="form">
        <form onSubmit={Auth}>
            <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" required />

            </div>
            <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />

            </div>
            <div className="button-container">
                <input type="submit" />
            </div>
        </form>
        </div>
    );
    
    return (
    <div className="app">
        <div className="login-form">
        <div className="title">Sign In</div>
            {renderForm}
        </div>
    </div>
    );
    // return (
    //     <section className="hero has-background-grey-light is-fullheight is-fullwidth">
    //         <div className="hero-body">
    //             <div className="container">
    //                 <div className="columns is-centered">
    //                     <div className="box is-flex justify-content-center">
    //                         <form onSubmit={Auth} className="box">
    //                             <div className="field mt-5 has-text-centered">
    //                                 <p className="has-text-centered" style={{ fontSize: 45, color: '#201ad8' }}>PlenaInclusión</p>
    //                             </div>
    //                             <div className="field mt-5">
    //                                 <label className="label">Email</label>
    //                                 <div className="controls">
    //                                     <input type="text" className="input" placeholder="Username" value={mail} onChange={(e) => setMail(e.target.value)} />
    //                                 </div>
    //                             </div>
    //                             <div className="field mt-5">
    //                                 <label className="label">Password</label>
    //                                 <div className="controls">
    //                                     <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
    //                                 </div>
    //                             </div>
    //                             <div className="field mt-5">
    //                                 <button className="button is-success is-fullwidth">Login</button>
    //                             </div>
    //                         </form>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </section>
    // )
}

export default Login
