import {  use, useEffect, useState } from "react"
import {  Link } from "react-router-dom";
import "./administrationPanel.css"
import axios from "axios";

export function AdministrationPanel () {
    const [hallActive, setHallAitive] = useState("hallManagment__content_default")  //выбранный зал
    const [rowImagehallManagment, setRowImagehallManagment] = useState("/arrow.png")
    const [hall, setHalls] = useState([]) //Залы
    
    function onClickHallManagment () {
        if (hallActive === "hallManagment__content_default") {
            setHallAitive("hallManagment__content")
            setRowImagehallManagment("/arrowUp.png")
        } else {
            setHallAitive("hallManagment__content_default")
            setRowImagehallManagment("/arrow.png")
        }
    }
    
    useEffect(()=> {
        axios.get("https://shfe-diplom.neto-server.ru/alldata").then(response => {
            setHalls(response.data.result.halls)
        })
    },[])
  
    function deleteHall(hallId) {
        axios.delete(`https://shfe-diplom.neto-server.ru/hall/${hallId}`)
        .then(response => {
            console.log(response.data)
            setHalls(response.data.result.halls)
        }).catch(error => (
            console.log(error)
        ))
    }

    const [hallConfigure, setHallConfigure] = useState("hallConfigure__content-default") //блок с конфигурацией залов
    const [rowImageHallConfigure, setRowImageHallConfigure] = useState("/arrow.png") //стрелка для переключения

    function onClickHallConfigure () {
        if (hallConfigure === "hallConfigure__content-default") {
            setHallConfigure("hallConfigure__content")
            setRowImageHallConfigure("/arrowUp.png")
        } else {
            setHallConfigure("hallConfigure__content-default")
            setRowImageHallConfigure("/arrow.png")
        }
    }
        function showHallPlaces (place, rowIndex, placeIndex) {
            const massiveCopy = hallConfig.map(row => [...row])
            if (place === "standart") {
                return <span key={placeIndex} className="places__classes-standartPlace-button" onClick={() => {
                    massiveCopy[rowIndex][placeIndex] = "vip"
                    setHallConfig(massiveCopy)
                }}></span>
            } 
            if (place === "vip") {
                return <span key={placeIndex} className="places__classes-vipPlace-button" onClick={() => {
                    massiveCopy[rowIndex][placeIndex]= ""
                    setHallConfig(massiveCopy)
                }}></span>
            }
            if (place === "") {
                return <span key={placeIndex} className="places__classes-blockedPlace-button" onClick={() => {
                    massiveCopy[rowIndex][placeIndex]= "standart"
                    setHallConfig(massiveCopy)
                }}></span>
            }
        }

    const [activeHall, setActiveHall] = useState(null) //Выбранный зал
    const [rowCount, setRowCount] = useState(""); //input с рядами
    const [placeCount, setPlaceCount] = useState(""); //input с местами
    const [hallConfig, setHallConfig] = useState([]) //конфигурация зала

    useEffect(()=> {
    if (activeHall) {
            let selectedHall = hall.find((h)=> h.id === activeHall) 
            if (selectedHall) {
                setHallConfig(selectedHall.hall_config)
                setRowCount(selectedHall.hall_rows)
                setPlaceCount(selectedHall.hall_places)
            }
        }
    },[activeHall, hall]) // отображение конфигурации зала

  useEffect (()=> {
    if (!rowCount || !placeCount){
        return
    } 
        let newHallMatrix = []
        for (let i = 0; i < rowCount; i++) {
            newHallMatrix[i] = []
            for (let j = 0; j < placeCount; j++) {
                if (hallConfig[i] && hallConfig[i][j] ) {
                    newHallMatrix[i][j] = hallConfig[i][j]
                } else {
                    newHallMatrix[i][j] = "standart"
                }
            }
        }
        setHallConfig(newHallMatrix)
  },[rowCount,placeCount]) //изменение конфигурации зала    

   function CheckValueInput (value) {
        if(!/^\d*\.?\d*$/.test(value)) {
            return ""
        }
        if (value.length > 2) {
            return value.slice(0,2)
        }
        if (value >= 20) {
            return 19
        }
        return value
    } //Проверка значений input

    return (
        <div className="adminPanel">
            <header className="header__adminPanel">
                <div className="header__logos">
                    <div className="header__logos_admin">
                        <img src="/gotocinema.png" alt="Логотип кинотеатра" />
                        <span className="header__adminspan">Администраторская</span>
                    </div>
                </div>
            </header>
            <main className="content">
                <div className="hallManagment">
                    <div className="hallManagment__header">
                        <span className="hallManagment__heading">Управление залами</span>
                            <button className="rowButton" onClick={onClickHallManagment}>
                                <img src={rowImagehallManagment} alt="Стрелка" className="arrow"/>
                        </button>
                    </div>
                    <div className={hallActive}>
                        <span className="hallManagment__content_span">Доступные залы:</span>
                        <div className="hallManagment__content_hall">
                            {hall.map(h=> (
                                    <span className="hall" key={h.hall_name}>- {h.hall_name} 
                                    <button className="bashButton" onClick={() => {
                                        deleteHall(h.id) }}> 
                                        <img className="bashImage" src="/bash.png" alt="Удалить"/>
                                    </button> 
                                </span>
                            ))}
                        </div>                        
                    <Link to="/admin/hallAdd"><button className="hallAdd__button">Создать зал</button></Link>
                    </div>
                </div>
                <div className="hallConfigure">
                    <div className="hallConfigure__header">
                        <span className="hallConfigure__heading">конфигурация залов</span>
                        <button className="rowButton" onClick={onClickHallConfigure}>
                                <img src={rowImageHallConfigure} alt="Стрелка" className="arrow"/>
                        </button>
                    </div>
                  <div className={hallConfigure}>
                    <span className="hallConfigure__content_span">Выберите зал для конфигурации:</span>
                    <div className="hallConfigure__content_halls">
                            {hall.map((h,index)=> (
                                <button key={index} onClick={() => {setActiveHall(h.id)}}
                                className={activeHall === h.id ? "hallConfigure__content_hall-isActive" : "hallConfigure__content_hall"}
                                 >{h.hall_name}</button>
                            ))}
                    </div>
                    <div className="hallConfiguration">
                        <div className="hallConfiguration__hall">
                            {hall.map((h)=> (
                                <div className="hallConfiguration__rows-seats" key={h.id}>
                                    {activeHall === h.id ? 
                                    <form className="hallConfiguration__form" onSubmit={ (e)=> {
                                        e.preventDefault()
                                        const target = e.target
                                        const formData = new FormData(target);
                                        const entries = formData.entries();
                                        const data = Object.fromEntries(entries);
                                        console.log(data);
                                        formData.append("rowCount", String(rowCount));
                                        formData.append("placeCount", String(placeCount));
                                        formData.append("config", JSON.stringify(hallConfig))
                                        axios.post(`https://shfe-diplom.neto-server.ru/hall/${activeHall}`, formData, {
                                            headers: {
                                                'Content-Type': 'multipart/form-data',
                                            },
                                        }).then((response => {
                                            console.log(response.data)
                                        }
                                            
                                        )).catch(error => {
                                            console.log(error)
                                        })
                                    }}> 
                                     <span className="hallConfiguration__conf-step__paragpaph">Укажите количество рядов и максимальное количество кресел в ряду:</span>
                                        <div className="hallConfiguration__inputs">
                                            <div className="hallConfiguration__form-rows">
                                             <label htmlFor="rowsInput" className="hallConfiguration__form-rows-label">Рядов, шт</label>
                                             <input key={h.hall_rows} type="text" name="hall_rows" id="rowsInput" className="hallConfiguration__form-rows-input" value={rowCount} 
                                             onChange={(e)=> {setRowCount(CheckValueInput(e.target.value))}}/>
                                        </div>
                                          <span className="hallConfiguration__form_x">X</span>
                                        <div className="hallConfiguration__form-places">
                                            <label htmlFor="placesInput" className="hallConfiguration__form-places-label">Мест, шт</label>
                                            <input key={h.hall_places} type="text" name="hall_places" id="placesInput" className="hallConfiguration__form-places-input" value={placeCount} onChange={(e)=> {setPlaceCount(CheckValueInput(e.target.value))}}/>
                                        </div>
                                        </div>
                                        <span className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</span>
                                        <div className="places__classes">
                                            <div className="places__classes-standartPlace">
                                                <span className="places__classes-standartPlace-button"></span>
                                                <span className="places__classes-standartPlace-span"> — обычные кресла </span>
                                            </div>
                                            <div className="places__classes-vipPlace">
                                                <span className="places__classes-vipPlace-button"></span>
                                                <span className="places__classes-vipPlace-span"> — VIP кресла </span>
                                            </div>
                                            <div className="places__classes-blockedPlace">
                                                <span className="places__classes-blockedPlace-button"></span>
                                                <span className="places__classes-blockedPlace-span"> — заблокированные (нет кресла)</span>
                                            </div>
                                        </div>
                                        <span className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</span>
                                        <div className="conf-step__hall">
                                            <span className="conf-step__hall-span">&nbsp;Экран</span>
                                            <div className="conf-step__hall-wrapper">
                                              {hallConfig.map((rows,rowIndex)=> (
                                                <div key={rowIndex} className="conf-step__hall-rows">
                                                    {rows.map((place,placeIndex)=> showHallPlaces(place,rowIndex,placeIndex))}
                                                </div>
                                              ))}   
                                            </div>
                                        </div>
                                        <div className="fieldset">
                                            <button className="fieldset__cancel-button" onClick={() => {
                                                setActiveHall("hallConfigure__content_hall")
                                            }} >Отмена</button>
                                            <button className="fieldset__send-button" >Сохранить</button>
                                        </div>
                                    </form>
                                    
                                    : ""}
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>
                </div>
            </main>
        </div>
    )
}

