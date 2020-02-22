import React, {FC, memo} from 'react';
import {Benchmarks} from '../benchmarks';

const Notes: FC = () => {
  return (
    <section>
      {Benchmarks.map(description => (
        <>
          <h1>{description.name}</h1>
          <p>{description.notes}</p>
        </>
      ))}
    </section>
  );
};

export default memo(Notes);
