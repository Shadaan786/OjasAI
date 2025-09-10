import React from "react";
import Derma from "../assets/Derma.jpeg";
import ENT from "../assets/ENT.jpeg";
import Ortho from "../assets/Ortho.jpeg";
import Dentist from "../assets/Dentist.jpeg";
import { Link } from "react-router";
import "./SpecialistCards.css";

const specialists = [
  {
    id: "DR-001",
    title: "Dermatology Consultation",
    image: Derma,
    price: "₹35.00",
    route: "/Derma",
    description: "Professional skin care consultation with certified dermatologists",
    specialty: "Skin & Hair Care"
  },
  {
    id: "ENT-002", 
    title: "ENT Specialist",
    image: ENT,
    price: "₹40.00",
    route: "/ENT",
    description: "Ear, Nose & Throat specialist for comprehensive care",
    specialty: "ENT Care"
  },
  {
    id: "ORT-003",
    title: "Orthopedic Consultation", 
    image: Ortho,
    price: "₹50.00",
    route: "/Ortho",
    description: "Bone, joint and muscle specialist for mobility issues",
    specialty: "Bone & Joint Care"
  },
  {
    id: "DEN-004",
    title: "Dental Consultation",
    image: Dentist, 
    price: "₹30.00",
    route: "/Dentist",
    description: "Complete dental care and oral health consultation",
    specialty: "Dental Care"
  }
];

function SpecialistCard({ specialist }) {
  return (
    <div className="card-container">
      <div className="card-image-wrapper">
        <Link to={specialist.route}>
          <img
            src={specialist.image}
            alt={specialist.title}
            className="card-image"
          />
          <div className="card-overlay">
            <span className="view-details">View Details →</span>
          </div>
        </Link>
        <div className="specialty-badge">
          {specialist.specialty}
        </div>
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <h1 className="card-title">{specialist.title}</h1>
          <span className="card-price-label">Price</span>
        </div>
        
        <div className="card-details">
          <span className="card-id">{specialist.id}</span>
          <span className="card-price">{specialist.price}</span>
        </div>
        
        <div className="card-description">
          <p>{specialist.description}</p>
        </div>
        
        <Link to={specialist.route} className="card-button">
          Book Consultation
        </Link>
      </div>
    </div>
  );
}

export default function SpecialistCards() {
  return (
    <div className="specialists-container">
      <div className="specialists-header">
        <h1>Choose Your Specialist</h1>
        <p>Connect with certified healthcare professionals</p>
      </div>
      
      <div className="specialists-grid">
        {specialists.map((specialist, index) => (
          <SpecialistCard 
            key={specialist.id} 
            specialist={specialist}
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
}
