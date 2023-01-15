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
    <div className="stats min-w-full shadow md:min-w-[45%] lg:min-w-[23%]">
      <div className="stat">
        <div className={`stat-figure ${color}`}>
          <FontAwesomeIcon icon={icon} className="text-3xl" />
        </div>
        <div className="stat-title font-bold text-black">{name}</div>
        <div className={`stat-value mb-1 ${color}`}>{value}</div>
        <div className="stat-desc">21% more than last month</div>
      </div>
    </div>
  );
};

export default BoxInfor;
