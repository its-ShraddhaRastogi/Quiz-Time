import React from 'react';
import "./InfoCard.css"
import 'bootstrap/dist/css/bootstrap.min.css';
function InfoCard({ title, image, content }) {
  return (
    <div className="card mx-auto mt-5 box-shadow info-card" style={{ width: '80%' }}>
      <div className="row g-0">
        <div className="col-md-4 card-img">
          <img src={image} className="img-fluid rounded-start" alt={title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title title-style">{title}</h5>
            <p className="card-text text-justify">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
