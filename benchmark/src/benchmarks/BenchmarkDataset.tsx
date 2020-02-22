import React, {FC, memo, useCallback} from 'react';
import {useBenchmark} from '../hooks/useBenchmark';
import {BenchmarkProps} from '../models/benchmarkProps';
import Child from '../components/Child';

const BenchmarkDataset: FC<BenchmarkProps> = props => {
  const tools = useBenchmark(props);

  const callback = useCallback(
    (a: string, b: number, c: boolean, element: HTMLDivElement) => {
      const id = element.dataset.id;
    },
    []
  );

  return (
    <>
      {tools.keyArray.map(key => (
        <Child
          data-id={key}
          key={key}
          callback={callback}
          callbackTrigger={tools.callbackTriggerAggregator}
          nodeCount={props.nodesCount}
        />
      ))}
    </>
  )

};

export default memo(BenchmarkDataset);
