import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Register = () => {
  const [DNI, setDni] = useState('');
  const [name, setName] = useState('');
  const [surname1, setSurname1] = useState('');
  const [surname2, setSurname2] = useState('');
  const [birthyear, setBirthdyear] = useState('');
  const [mail, setMail] = useState('');
  const [gender, setGender] = useState('');
  const [specialCare, setSpecialCare] = useState(false);
  const [dataTutor, setDataTutor] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirmación',
      message: '¿Está seguro de crear el usuario?',
      buttons: [
        {
          label: 'Sí',
          onClick: async () => {
            try {
              await axios.post('/RegisterCustomer', {
                DNI: DNI,
                name: name,
                surname1: surname1,
                surname2: surname2,
                birthyear: birthyear,
                mail: mail,
                gender: gender,
                specialCares: specialCare,
                dataTutor: dataTutor,
              });
              navigate('/dashboard');
            } catch (error) {
              if (error.response) {
                setErrorMsg(error.response.data.msg);
                console.log(errorMsg);
              }
            }
          },
        },
        {
          label: 'No',
          onClick: () => {
          },
        },
      ],
    });
  };
  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-6-desktop">
              <form className="box">
                <div className="field mt-5">
                  <label className="label">DNI</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="12345678A"
                      value={DNI}
                      onChange={(e) => setDni(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                                    <label className="label">Name</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="John"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Surname 1</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Doe"
                                            value={surname1}
                                            onChange={(e) => setSurname1(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Surname 2</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Smith"
                                            value={surname2}
                                            onChange={(e) => setSurname2(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Birthday</label>
                                    <div className="controls">
                                        <input
                                            type="date"
                                            className="input"
                                            placeholder="YYYY-MM-DD"
                                            value={birthyear}
                                            onChange={(e) => setBirthdyear(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Mail</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="john.doe@example.com"
                                            value={mail}
                                            onChange={(e) => setMail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Gender</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Hombre"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Special Cares</label>
                                    <div className="controls">
                                        <label className="radio">
                                            <input
                                                type="checkbox"
                                                checked={specialCare}
                                                onChange={(e) => setSpecialCare(e.target.checked)}
                                            />
                                            <label>Special Cares</label>
                                        </label>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Tutor DNI</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="12345678A"
                                            value={dataTutor}
                                            onChange={(e) => setDataTutor(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <p className="help is-danger">{errorMsg}</p>
                                </div>
                <div className="field mt-5">
                  <div className="controls">
                    <button type="submit" className="button is-link" onClick={handleSubmit}>
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;


                                