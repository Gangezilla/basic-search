import { Heading, Result, Phrase } from "./styled";

const InvertedIndex = ({ index, documentNames }) => {
  return (
    <div>
      <Heading>Inverted Index:</Heading>
      <div>
        <Phrase>Document mapping: </Phrase>
        <Result>{JSON.stringify(documentNames, null, 2)}</Result>
      </div>
      <div>
        <Phrase>Index: </Phrase>
        <Result>{JSON.stringify(index, null, 2)}</Result>
      </div>
    </div>
  );
};

export default InvertedIndex;
