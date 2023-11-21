// AccordionItem.tsx
import React, { useState, FunctionComponent, ReactNode } from "react";
import arrowUp from "../../../assets/images/arrow-up.svg";
import arrowDown from "../../../assets/images/arrow-down.svg";
interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

const AccordionItem: FunctionComponent<AccordionItemProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <button className="accordion-title">
          {title}
        </button>
        <img className="float-end" src={isOpen ? arrowUp : arrowDown} alt="" />
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default AccordionItem;
