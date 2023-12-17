// Accordion.tsx
import React from "react";
import AccordionItem from "./AccordionItem";
import "./Accordion.scss";
import { IReview } from "../../../interfaces";
import Review from "../../Review";
type AccordionProps = {
  rating: number;
  reviews: IReview[];
  description: string;
  color: string;
};

const Accordion = ({ rating, reviews, description, color }: AccordionProps) => {
  const details = [
    "Regular fit",
    "Lace and hook-and-loop closures",
    "Fast-drying synthetic upper",
    "Stealth® C4 rubber outsole",
    "All-mountain biking shoes",
    "Compatible with clipless pedals",
    "Carbon and nylon shank for stiffness",
    "Imported",
    `Product color: ${color}`,
  ];
  return (
    <div className="accordion">
      <AccordionItem title="Description">
        <p>{description}</p>
      </AccordionItem>
      <AccordionItem title="Details">
        <ul className="details-list">
          {details?.map((detail) => (
            <li>{detail}</li>
          ))}
        </ul>
      </AccordionItem>
      <AccordionItem title={`Reviews (${reviews?.length})`}>
        <Review rating={rating} reviews={reviews} />
      </AccordionItem>
    </div>
  );
};

export default Accordion;
