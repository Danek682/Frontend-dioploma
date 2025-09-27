import "./TodayFilms.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const src = "http://localhost:4000/alldata";

export function TodayFilms() {
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios.get(src).then(response => {
      const result = response.data.result;

      const filmsWithData = result.films.map(film => {
        const seances = result.seances.filter(s => s.seance_filmid === film.id);
        if (seances.length === 0) return null;

        const filmSeances = seances.map(seance => {
          const hall = result.halls.find(h => h.id === seance.seance_hallid);

          return {
            time: seance.seance_time,
            hall: hall?.hall_name || "Неизвестный зал",
            hallOpen: hall?.hall_open ?? 0,
            hallId: seance.seance_hallid,
          };
        });

        return {
          id: film.id,
          name: film.film_name,
          img: film.film_poster,
          description: film.film_description,
          duration: film.film_duration,
          origin: film.film_origin,
          seances: filmSeances,
        };
      }).filter(Boolean);

      setFilms(filmsWithData);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="loading"><span>Загрузка...</span></div>;

  return (
    <div className="movie">
      {films.map(film => (
        <div key={film.id} className="movie__block">
          <div className="movie__poster">
            <img className="movie__image" src={film.img} alt="Картинка фильма"/>
            {film.seances.map((s, i) => (
              <div key={i} className="movie__time">
                {s.hallOpen === 1 ? (
                  <Link to={`/hall/${s.hallId}`} className="movie__time_halls">
                    {s.time} ({s.hall})
                  </Link>
                ) : (
                  <span className="ticketsNone">Билетов нет</span>
                )}
              </div>
            ))}
          </div>
          <div className="movie__definition">
            <span className="movie__name">{film.name}</span>
            <span className="movie__description">{film.description}</span>
            <div className="movie__data">
              <span className="movie__seance-time">
                {film.duration} минут {film.origin}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
