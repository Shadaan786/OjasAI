import React from "react";
import Derma from "../assets/Derma.jpeg";
import ENT from "../assets/ENT.jpeg";
import Ortho from "../assets/Ortho.jpeg";
import Dentist from "../assets/Dentist.jpeg";
import { Link } from "react-router";
import "./SpecialistCards.css";
import { useTranslation } from "react-i18next";

const specialists = [
  {
    id: "DR-001",
    titleKey: "card36",
    image: Derma,
    price: "₹35.00",
    route: "/Derma",
    descriptionKey: "card36Desc",
    specialty: "Skin & Hair Care",
  },
  {
    id: "ENT-002",
    titleKey: "card4",
    image: ENT,
    price: "₹40.00",
    route: "/ENT",
    descriptionKey: "card5",
    specialty: "ENT Care",
  },
  {
    id: "ORT-003",
    titleKey: "card36",
    image: Ortho,
    price: "₹50.00",
    route: "/Ortho",
    descriptionKey: "card36Desc",
    specialty: "Bone & Joint Care",
  },
  {
    id: "DEN-004",
    titleKey: "card36",
    image: Dentist,
    price: "₹30.00",
    route: "/Dentist",
    descriptionKey: "card36Desc",
    specialty: "Dental Care",
  },
];

function SpecialistCard({ specialist }) {
  const { t } = useTranslation();

  return (
    <div className="card-container">
      <div className="card-image-wrapper">
        <Link to={specialist.route}>
          <img
            src={specialist.image}
            alt={t(specialist.titleKey)}
            className="card-image"
          />
          <div className="card-overlay">
            <span className="view-details">{t("viewDetails")}</span>
          </div>
        </Link>
        <div className="specialty-badge">{specialist.specialty}</div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h1 className="card-title">{t(specialist.titleKey)}</h1>
          <span className="card-price-label">{t("priceLabel")}</span>
        </div>

        <div className="card-details">
          <span className="card-id">{specialist.id}</span>
          <span className="card-price">{specialist.price}</span>
        </div>

        <div className="card-description">
          <p>{t(specialist.descriptionKey)}</p>
        </div>

        <Link to={specialist.route} className="card-button">
          {t("bookConsultation")}
        </Link>
      </div>
    </div>
  );
}

export default function SpecialistCards() {
  const { t } = useTranslation();

  return (
    <div className="specialists-container">
      <div className="specialists-header">
        <h1>{t("chooseSpecialist")}</h1>
        <p>{t("connect")}</p>
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
