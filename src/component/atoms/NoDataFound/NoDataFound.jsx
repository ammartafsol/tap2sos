import React from "react";
import PropTypes from "prop-types";
export default function NoDataFound({ style, text = "No data found" }) {
  return (
    <div className={style} style={{ color: 'var(--doveGray)', fontSize: '14px' }}>
      {text}
    </div>
  );
}

NoDataFound.propTypes = {
  style: PropTypes.string,
  text: PropTypes.string,
};