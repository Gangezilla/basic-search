import React, { useState } from "react";

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
      <label>
        Search:
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          type="text"
          name="search"
        />
      </label>
      <button onClick={handleClick} type="button">
        Search!
      </button>
    </form>
  );
};

export default QueryBox;
