import React, {FC, memo} from 'react';

const Node: FC = () => {

  function randomColor(): string {
    return Math.random().toString().substr(2, 6);
  }

  return (
    <p style={{ color: randomColor(), backgroundColor: randomColor() }}>
      {Math.random()} gibberish {Math.random()}
    </p>
  );
};

export default memo(Node);
