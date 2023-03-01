import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface BoxInforProps {
  name: string;
  value: number;
  icon: IconDefinition;
  color: string;
}
const BoxInfor: React.FC<BoxInforProps> = ({ name, value, icon, color }) => {
  return (
    <div className="w-full p-2 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="stats w-full shadow">
        <div className="stat">
          
          <div className={`stat-figure ${color}`}>
            <FontAwesomeIcon icon={icon} className="text-3xl" />
          </div>
          <div className="stat-title font-bold text-black">{name}</div>
          <div className={`stat-value mb-1 ${color}`}>{value}</div>
        </div>
      </div>
    </div>
  );
};

export default BoxInfor;
