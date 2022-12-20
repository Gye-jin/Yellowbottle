import React from "react";
import TableauReport from "tableau-react";

function Tableau1() {
  return (
    <span className="App">
      <TableauReport
        url="https://public.tableau.com/views/12_11_16707445239350/sheet0&:jsdebug=n?:language=en-US&:display_count=n&:origin=viz_share_link"
        // token="<TRUSTED TICKET HERE>"
      />
    </span>
  );
}

export default Tableau1;
