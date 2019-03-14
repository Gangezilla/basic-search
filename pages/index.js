import QueryBox from "../src/components/QueryBox";
import React, { useState } from "react";

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
    <div>
      <QueryBox onSubmit={onSubmit} />
      {data ? JSON.stringify(data) : null}
    </div>
  );
};
export default Index;
