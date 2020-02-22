import React, {FC, memo} from 'react';
import {Benchmarks} from '../benchmarks';

interface Props {
  results: Array<Array<number>>;
}

const Results: FC<Props> = ({ results }) => {
  return (
    <table>
      <thead>
        <tr>
          {Benchmarks.map(description => (
            <th>{description.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(results.length === 0 ? [[]] : results).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Benchmarks.map((_, resultIndex) => (
              <td key={resultIndex}>
                {row[resultIndex] === undefined ? '...' : row[resultIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default memo(Results);
