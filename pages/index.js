import React, { useState } from "react";
import styled from "styled-components";

import QueryBox from "../src/components/QueryBox";
import ResultsPanel from "../src/components/ResultsPanel";
import InvertedIndex from "../src/components/InvertedIndex";

const RootContainer = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 10px;
`;

const Index = () => {
  const [data, setData] = useState("");
  const onSubmit = query => {
    const data = {
      query
    };
    fetch("/query/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => setData(res));
  };

  return (
    <RootContainer>
      <QueryBox onSubmit={onSubmit} />
      <ResultsPanel
        results={data.result}
        unmatchedPhrases={data.unmatchedPhrases}
      />
      <InvertedIndex index={data.postings} documentNames={data.documentNames} />
    </RootContainer>
  );
};
export default Index;
