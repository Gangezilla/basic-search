import {
  ResultCardContainer,
  ResultHeading,
  Phrase,
  Result,
  Heading,
  ResultsContainer,
  UnmatchedContainer
} from "./styled";

const ResultCard = ({ title, phrases }) => (
  <ResultCardContainer>
    <ResultHeading>{title}</ResultHeading>
    {Object.keys(phrases).map(phrase => (
      <div key={phrase}>
        <Phrase>{phrase}: </Phrase>
        <Result dangerouslySetInnerHTML={{ __html: phrases[phrase] }} />
      </div>
    ))}
  </ResultCardContainer>
);

const ResultsPanel = ({ results, unmatchedPhrases }) => {
  return (
    <React.Fragment>
      <Heading>Results:</Heading>
      <ResultsContainer>
        {results ? (
          Object.keys(results).map(result => (
            <ResultCard key={result} title={result} phrases={results[result]} />
          ))
        ) : (
          <Result>No results!</Result>
        )}
      </ResultsContainer>
      {unmatchedPhrases && unmatchedPhrases.length > 0 && (
        <React.Fragment>
          <Heading>Unmatched Phrases:</Heading>
          <UnmatchedContainer>
            <Result> {unmatchedPhrases.join(", ")}</Result>
          </UnmatchedContainer>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ResultsPanel;
