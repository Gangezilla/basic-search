import styled from "styled-components";

export const ResultCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 500px;
  padding: 10px;
  margin: 0 10px;
  border-bottom: 1px solid #27bdd1;

  @media (max-width: 500px) {
    min-width: 240px;
  }
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1020px) {
    flex-direction: row;
  }
`;

export const UnmatchedContainer = styled.div`
  display: flex;
`;

export const ResultHeading = styled.h2`
  color: #27bdd1;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 20px;
  text-decoration-line: underline;
  margin: 0 0 10px 0;
`;

export const Heading = styled.h2`
  color: #27bdd1;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 20px;
  margin-bottom: 0;
`;

export const Phrase = styled.span`
  color: #27bdd1;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 15px;
`;

export const Result = styled.span`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 15px;
`;
