import {  use, useEffect, useState } from "react";
import axios from "axios";
import "./ConfigurePrice.css"
export function ConfigurePrice (props) {
    const [activeHall, setActiveHall] = useState(null);
    const [priceStandart, setPriceStandart] = useState("");
    const [priceVip, setPriceVip] = useState("");

    useEffect (()=> {
      if(activeHall)  {
        axios.get("https://shfe-diplom.neto-server.ru/alldata").then(response => {
            let selectedHall = response.data.result.halls.find((h)=> h.id === activeHall);
            setPriceStandart(selectedHall.hall_price_standart);
            setPriceVip(selectedHall.hall_price_vip)
        })
      }
    },[activeHall])

     function CheckValueInput (value) {
        if(!/^\d*\.?\d*$/.test(value)) {
            return ""
        }
        if (value.length > 3) {
            return value.slice(0,3)
        }
        return value
    }

    return (
        <div className="configurePrice__content">
            <div className="configurePrice__content-wrapper">
                <span className="configurePrice__content-paragraph">Выберите зал для конфигурации:</span>
            </div>
            <div className="configurePrice__content-hallsButtons">
                {props.hall.map((h,index)=> (
                    <button key={index} onClick={() => {setActiveHall(h.id)
                        // console.log(h.id)
                    }}
                     className={activeHall === h.id ? "hallPrice__content_hall-isActive" : "hallPrice__content_hall"}
                     >{h.hall_name}</button>
                ))}
            </div>
            <div className="configurePrice__main">
                {props.hall.map((h,index)=> (
                    <div className="configurePrice__main-prices" key={index}>
                        {activeHall === h.id ? 
                        <form className="configurePrice__form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const target = e.target
                            const formData = new FormData(target);
                            const entries = formData.entries();
                            const data = Object.fromEntries(entries);
                            console.log(data);
                            formData.append('priceStandart',String(priceStandart));
                            formData.append('priceVip', String(priceVip));
                            axios.post(`https://shfe-diplom.neto-server.ru/price/${activeHall}`,formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            }).then((response => {
                            console.log(response.data)}              
                            )).catch(error => {
                            console.log(error)
                            })
                        }}
                        >
                            <span className="configurePrice__form-paragraph">Установите цены для типов кресел:</span>
                            <div className="configurePrice__inputs">
                                <div className="configurePrice__form-standart">
                                    <label htmlFor="priceStandart" className="configurePrice__form-standart-label">Цена, рублей</label>
                                    <div className="configurePrice__form-standart-input-wrapper">
                                        <input type="text" name="priceStandart" id="priceStandart" className="configurePrice__form-standart-input" value={priceStandart} onChange={(e) => {
                                            setPriceStandart(CheckValueInput(e.target.value))
                                        }}/>
                                        <span className="inputPrefix">за</span>
                                        <span className="places__classes-standartPlace-button"></span>
                                        <span className="places__classes-standartPlace-span"> — обычные кресла </span>
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="priceVip" className="configurePrice__form-standart-label">Цена, рублей</label>
                                            <div className="configurePrice__form-vip-input-wrapper">
                                                <input type="text" name="priceVip" id="priceVip" className="configurePrice__form-vip-input" value={priceVip} onChange={(e) => {
                                            setPriceVip(CheckValueInput(e.target.value))
                                        }}/>
                                                <span className="inputPrefix">за</span>
                                                <span className="places__classes-vipPlace-button"></span>
                                                <span className="places__classes-vipPlace-span"> — VIP кресла</span>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="fieldset">
                                <button className="fieldset__cancel-button" onClick={() => {
                                        setActiveHall(null);
                                        setPriceStandart("");
                                        setPriceVip("");
                                }}>Отмена</button>
                                <button className="fieldset__send-button" >Сохранить</button>
                            </div>
                        </form>
                        : ""}
                    </div>
                ))}
            </div>
        </div>
    )
}