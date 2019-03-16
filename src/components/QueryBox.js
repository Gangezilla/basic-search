import React, { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 5px;
  height: 30px;
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
`;

const Button = styled.button`
  margin-top: 10px auto 0 auto;
  width: 50px;
  width: 200px;
  height: 25px;
  background: #27bdd1;
  color: white;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
  border-radius: 5px;
  border: none;
`;

const QueryBox = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const handleClick = () => onSubmit(query);
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleClick();
      e.preventDefault();
    }
  };

  return (
    <form onKeyPress={handleKeyPress}>
      <Input
        value={query}
        onChange={e => setQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search some Shakespeare"
      />
      <Button onClick={handleClick} type="button">
        Search!
      </Button>
    </form>
  );
};

export default QueryBox;
