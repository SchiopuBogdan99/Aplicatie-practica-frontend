import "./SingleCard.css";
import { useState } from "react";
import clsx from "clsx";

export default function SingleCard({ name, img, details }) {
  const [flipped, setFlipped] = useState(true);

  return (
    <div className="card">
      <div className={clsx(flipped ? "flipped" : "", "flipcontainter")}>
        <div className="front">
          <h1>{name}</h1>
          <hr></hr>
          <div className="card-element">
            <img
              src={`http://localhost:8080/api/v1/image/${img}`}
              width="120px"
              height="70px"
            />
          </div>
          <hr></hr>
          <div className="card-element">
            <button onClick={() => setFlipped(!flipped)}>See details</button>
          </div>
        </div>
        <div className="back">
          <h1>{name}</h1>
          <hr></hr>
          <div className="back-country-details">{details}</div>
          <hr></hr>
          <div className="card-element">
            <button onClick={() => setFlipped(!flipped)}>Flip back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
