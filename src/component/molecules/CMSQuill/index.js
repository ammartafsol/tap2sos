import React from "react";
import ReactQuill from "react-quill-new";
import classes from "./CMSQuill.module.css";
import "react-quill-new/dist/quill.snow.css";
import PropTypes from "prop-types";

function CMSQuill({ value, setter, quillClass = "", placeholder = "", label }) {
  return (
    <>
      <style>{`
      .ql-toolbar.ql-snow, .ql-container.ql-snow{
        border: 1px solid #EAECF0;
        border-radius: 4px;
        border-radius: 5px 5px 0px 0px;
      }
      .ql-container.ql-snow{
        border-top:0px;        
        border-radius: 0px 0px 5px 5px;
      }
      .ql-editor{
        min-height: 200px;
        max-height: calc(100vh - 370px);
      }

       @media (max-width: 1300px) {
        .ql-editor {
          min-height: 150px;
          max-height: calc(100vh - 400px);
        }
      }
      `}</style>
      {label && <label className={classes.label}>{label}</label>}
      <div className={classes.CMSQuill}>
        <ReactQuill
          className={`${classes.quill} ${quillClass}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) =>{
            setter(e)
          }}
          modules={modules}
        />
      </div>
    </>
  );
}

export default CMSQuill;

CMSQuill.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  setter: PropTypes.func,
  quillClass: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
    [
      {
        color: [
          "white",
          "black",
          "red",
          "blue",
          "skyblue",
          "teal",
          "brown",
          "green",
          "orange",
          "pink",
          "gray",
          "purple",
          "maroon",
          "yellow",
          "#1b263b",
          "#eb0000",
          "#7f1d1d",
          "#0c0fc2",
          "#0056d2",
          "#007ea5",
          "#000000",
          "#18385d",
          "#4a4a4a",
          "#6d6d6dd9",
          "#374151",
          "#252430",
          "#333",
          "#6d6d6d",
          "#6b7280",
          "#1c1b1f",
          "#575C5F",
          "#000f45",
          "#00000099",
          "#000000a6",
          "#c2c2c2",
          "#23466e",
          "#667080",
          "#deecf2",
          "#fee2e2",
        ],
      },
    ],
  ],
};
