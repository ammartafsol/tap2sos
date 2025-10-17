import React from "react";

export default function NoDataFound({ style, text = "No data found" }) {
  return (
    <div className={style} style={{ color: 'var(--doveGray)', fontSize: '14px' }}>
      {text}
    </div>
  );
}
