import React, { useEffect } from "react";
import "../css/Home.css";
import axios from "axios";

const Home = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-text">BIENVENIDO</h1>
        <p className="hero-description1">
          APRENDE LO QUE QUIERAS, CUANDO QUIERAS
        </p>
        <p className="hero-description2">
          Explora los cursos más famosos en linea. Adquiere las habilidades que
          necesitas para alcanzar tus metas profesionales. Aprende a tu propio
          ritmo, desde cualquier lugar del mundo.
        </p>
      </div>
      <div className="hero-image"></div>
    </div>
  );
};

export default Home;
