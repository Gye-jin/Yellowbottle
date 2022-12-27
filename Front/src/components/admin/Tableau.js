import React from "react";
import TableauReport from "tableau-react";

function Tableau1() {
  return (
    <span className="App">
      <TableauReport url="https://public.tableau.com/views/12_11_16707445239350/Audience&:jsdebug=n?:language=ko-KR&publish=yes&:display_count=n&:origin=viz_share_link" />
    </span>
  );
}

export default Tableau1;

// import React, { useState, useEffect } from "react";
// const { tableau } = window;

// function Tableau1() {
//   const [url] = useState("https://public.tableau.com/views/12_11_16707445239350/sheet0&:jsdebug=n?:language=en-US&:display_count=n&:origin=viz_share_link");
//   const [viz, setViz] = useState(null);

//   const initViz = () => {
//     let containerDiv = document.getElementById("container");
//     setViz(new tableau.Viz(containerDiv, url));
//   };

//   useEffect(initViz, []);

//   const exportToPDF = () => {
//     viz.showExportPDFDialog();
//   };

//   return (
//     <div>
//       <h1>Export PDF</h1>
//       <button onClick={exportToPDF}>Export PDF</button>
//       <div style={setVizStyle} id="container" />
//     </div>
//   );
// }

// const setVizStyle = {
//   margin: "25px",
//   width: "800px",
//   height: "700px"
// };

// export default Tableau1;
