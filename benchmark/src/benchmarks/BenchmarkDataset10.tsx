import React, {FC, memo, useCallback} from 'react';
import {useBenchmark} from '../hooks/useBenchmark';
import {BenchmarkProps} from '../models/benchmarkProps';
import Child from '../components/Child';

const BenchmarkDataset10: FC<BenchmarkProps> = props => {
  const tools = useBenchmark(props);

  const dep: number = Math.floor(tools.renderCount / 10) % 2;

  const callback = useCallback(
    (a: string, b: number, c: boolean, element: HTMLDivElement) => {
      const id = element.dataset.id;
    },
    [dep]
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

export default memo(BenchmarkDataset10);
