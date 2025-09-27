import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";
import { useState } from "react";
import axios, { Axios } from "axios";
export function Signin () {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [value, setValue] = useState("");
    const [nameClassACtive, setNameClassACtive] = useState("");
    const [nameClass, setNameClass] = useState("autorization__check");
    const navigate = useNavigate();
    function onSubmit (e) {
      e.preventDefault();
      const target = e.target;
      const formData = new FormData(target);
      const entries = formData.entries();
      const data = Object.fromEntries(entries);
        formData.append("login", mail);
        formData.append("password", password);
        axios.post('https://shfe-diplom.neto-server.ru/login', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
            },
        })
        .then(function (response) {
            console.log(response.data);
            if(response.data.success === true) {
                setValue(response.data.result);
                setNameClass("authorization__checkTrue");
                setNameClassACtive("success");
                setTimeout(() => {(navigate("/admin"))}, 1000);
            } else {
                setValue(response.data.error);
                setNameClass("authorization__checkTrue");
                setNameClassACtive("false");
            }
        })
        .catch(error => console.error(error));
            setMail("");
            setPassword ("");
      if (!mail || !password){
        alert("Пожалуйста, заполните все поля");
        setMail("");
        setPassword ("");
        return;
    } 
    console.log(data);
}
    return (
    <div className="auth__container">
        <header className="header">
           <div className="header__logos">
                <div className="header__logos_admin">
                    <img src="/gotocinema.png" alt="Логотип кинотеатра" />
                    <span className="header__adminspan">Администраторская</span>
                </div>
                <  Link to = "/"><button className="backButton"> Вернуться на главную</button></Link>
           </div>
        </header>
        <main className="content">
            <div className="authForm">
                <div className="authForm__header">
                    <span className="authorization">Авторизация</span>
                </div>
                <form className="authForm__inputs" onSubmit={onSubmit}>
                    <div className="authForm__inputs_email">
                        <label htmlFor="emailInput" className="authForm__inputs_email-label">E-mail</label>
                        <input type="text" name="email" id="emailInput"  className="authForm__inputs_email-input" placeholder="example@domain.xyz" value={mail} onChange={(e)=> {
                            setMail(e.target.value)
                        }}/>
                    </div>
                    <div className="authForm__inputs_password">
                        <label htmlFor="passwordInput" className="authForm__inputs_password-label">Password</label>
                        <input type="password" name="password" id="passwordInput" className="authForm__inputs_password-input" value={password} onChange={(e)=> {
                            setPassword(e.target.value)
                        }}/>
                    </div>
                    <div className="send__button-container">
                        <button className="send__button">Авторизоваться</button>
                    </div>
                    <span className={`${nameClass} ${nameClassACtive}`}>{value}</span>
                </form>
            </div>
        </main>
    </div>
    )
}

