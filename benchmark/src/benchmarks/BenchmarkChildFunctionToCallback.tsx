import React, {FC, memo, useCallback} from 'react';
import {useBenchmark} from '../hooks/useBenchmark';
import {BenchmarkProps} from '../models/benchmarkProps';
import Child from '../components/Child';

const BenchmarkChildFunctionToCallback: FC<BenchmarkProps> = props => {
  const tools = useBenchmark(props);

  const callback = useCallback(
    (id: string, a: string, b: number, c: boolean, element: HTMLDivElement) => {},
    []
  );

  return (
    <>
      {tools.keyArray.map(key => (
        <Child
          key={key}
          callback={(a: string, b: number, c: boolean, element: HTMLDivElement) => callback('id', a, b, c, element)}
          callbackTrigger={tools.callbackTriggerAggregator}
          nodeCount={props.nodesCount}
        />
      ))}
    </>
  )

};

export default memo(BenchmarkChildFunctionToCallback);
