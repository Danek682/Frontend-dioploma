import { NavLink, Link, useParams } from 'react-router-dom'
import { FilmDays } from '../FilmDays/FIlmDays'
import './Overview.css'
export function OverView () {
    function activeDate ({isActive}) {
  return isActive ? "nav__link-active" : "nav__link-date"
}
    return (
        <div className='app'>
          <header className='header'>
            <div className='header__container'>
                <Link to="/">
                    <img src="/gotocinema.png" alt="Логотип кинотеатра" />
                </Link>
                <Link to="/signin">
                    <button className='button-login'>Войти</button>
                </Link>
            </div>
          </header>
          <nav className="nav">
            <NavLink to = "/today" className={activeDate} >
                <div className='nav__link'>
                    <span className='nav__link-date-span'>Сегодня</span>
                    <span className='nav__link-date-span'>Пн, 31</span>
                </div>
            </NavLink>
            <NavLink to = "/1" className={activeDate} >
                <div className='nav__link'>
                    <span className='nav__link-date-span'>Вт,</span>
                    <span className='nav__link-date-span'>1</span>
                </div>
            </NavLink>
            <NavLink to = "/2" className={activeDate} >
                <div className='nav__link'>
                    <span className='nav__link-date-span'>Ср,</span>
                    <span className='nav__link-date-span'>2</span>
                </div>
            </NavLink>
            <NavLink to = "/3" className={activeDate} >
                <div className='nav__link'>
                    <span className='nav__link-date-span'>Чт,</span>
                    <span className='nav__link-date-span'>3</span>
                </div>
            </NavLink>
             <NavLink to = "/4" className={activeDate} >
                <div className='nav__link'>
                    <span className='nav__link-date-span'>Пт,</span>
                    <span className='nav__link-date-span'>4</span>
                </div>
            </NavLink>
             <NavLink to = {`/5`} className={activeDate} >
                <div className='nav__link-weekend'>
                    <span className='nav__link-date-span'>Сб,</span>
                    <span className='nav__link-date-span'>5</span>
                </div>
            </NavLink>
            <NavLink to = "/6" className={activeDate} >
                <div className='nav__link-weekend'>
                    <span className='nav__link-date-span'>Вс,</span>
                    <span className='nav__link-date-span'>6</span>
                </div>
            </NavLink>
        </nav>
        </div>
                 
    )
    
}