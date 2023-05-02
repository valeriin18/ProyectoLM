import React, { useState } from "react";
import axios from "axios";

function UserInformation() {
    const [mail, setMail] = useState("");
    const [customers, setCustomers] = useState([]);
    const [professionals, setProfessionals] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const [customersRes, professionalsRes] = await Promise.all([
                axios.post("/GetUsers", { mail }),
                axios.post("/GetProfessionals", { mail })
            ]);
            setCustomers(customersRes.data);
            setProfessionals(professionalsRes.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Mail:
                    <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
            {customers.map((user) => (
                <div key={user.idCustomer}>
                    <h2>{user.name} {user.surname1} {user.surname2}</h2>
                    <p>ID: {user.idCustomer}</p>
                    <p>DNI: {user.DNI}</p>
                    <p>Birth Year: {user.birthyear}</p>
                    <p>Mail: {user.mail}</p>
                    <p>Gender: {user.gender}</p>
                    <p>Special Cares: {user.specialCares}</p>
                    <p>Tutor Data: {user.dataTutor}</p>
                </div>
            ))}
            {professionals.map((user) => (
                <div key={user.idProfessional}>
                    <h2>{user.name} {user.surname1} {user.surname2}</h2>
                    <p>DNI: {user.DNI}</p>
                    <p>Birth Year: {user.birthyear}</p>
                    <p>Mail: {user.mail}</p>
                    <p>Availability: {user.availability}</p>
                </div>
            ))}
        </div>
    );
}

export default UserInformation;
