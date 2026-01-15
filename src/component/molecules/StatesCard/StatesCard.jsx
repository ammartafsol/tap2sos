import React from "react";
import classes from "./StatesCard.module.css";
import PropTypes from "prop-types";

const StatesCard = ({ item }) => {
  const IconComponenet = item?.icon;
  return (
    <div className={classes?.statesCard}>
      <div className={classes?.icons}>
        <IconComponenet fontSize={22} color="var(--royal-navy-blue)" />
      </div>
      <div className={classes?.statesDetails}>
        <h5>{item?.title}</h5>
        <p>{item?.count}</p>
      </div>
    </div>
  );
};

export default StatesCard;

StatesCard.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.elementType,
    title: PropTypes.string,
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};
