import { useState } from "react"
import "./HallAdd.css"
import { Link } from "react-router"
import axios from "axios"
export function HallAdd () {
const [hallName, sethallName] = useState("")
const [className, setClassName] = useState("hallInput-span-nonActive")
const [classHallIsActive, setClassHallIsActive] = useState("")
const [value, setValue] = useState("")
function onSubmit (e) {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData(target);
    const entries = formData.entries();
    const data = Object.fromEntries(entries);
    formData.append("hallName", hallName);
    axios.post('https://shfe-diplom.neto-server.ru/hall', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
            },
        })
        .then(function(response) {
            console.log(response.data)
            if(hallName) {
                setClassName("hallInput-span-Active")
                setValue(response.data.error)
                setClassHallIsActive("error")
                sethallName("")
            }
            if(!hallName) {
                setClassName("hallInput-span-Active")
                setClassHallIsActive("success")
                sethallName("")
            }
            if(hallName === '') {
            setClassName("hallInput-span-Active")
            setValue(response.data.error)
            setClassHallIsActive("error")
            }
        }).catch(error => (
            console.log(error)
        ))
        console.log(data)
        } 
    return (
        <div className="hallAdd">
            <div className="hallAdd__container">
                <header className="hallAdd__header">
                    <span className="hallAdd__header-span">Добавление зала</span>
                    <Link to="/admin">
                        <button className="hallAdd__header-button">
                            <img className="hallAdd__header-img" src="/close.png" alt="Закрыть" />
                        </button>
                    </Link>
                </header>
                <main className="hallAdd__main">
                    <form className="hallAdd__form" onSubmit={onSubmit}>
                        <label htmlFor="hallInput" className="hallAdd__form-name">Название зала</label>
                        <input type="text" name="hallName" id="hallInput" className="hallAdd__form-input" placeholder={`Например, "Зал 1"`} value={hallName} onChange={(e)=> {
                                sethallName(e.target.value)
                            }}/>
                            <span className={`${className} ${classHallIsActive}`}>{value}</span>
                        <div className="hallAdd__main_buttons">
                            <button className="hallAdd__main_buttons-filmAdd">Добавить зал</button>
                            <Link to="/admin">
                                <button className="hallAdd__main_buttons-close">Отменить</button>
                            </Link>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    )
}