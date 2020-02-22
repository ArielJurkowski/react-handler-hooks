import React, {FC, memo} from 'react';
import {useBenchmark} from '../hooks/useBenchmark';
import {BenchmarkProps} from '../models/benchmarkProps';
import Child from '../components/Child';

const BenchmarkSingleFunction: FC<BenchmarkProps> = props => {
  const tools = useBenchmark(props);

  const callback = (a: string, b: number, c: boolean, element: HTMLDivElement) => {};

  return (
    <>
      {tools.keyArray.map(key => (
        <Child
          key={key}
          callback={callback}
          callbackTrigger={tools.callbackTriggerAggregator}
          nodeCount={props.nodesCount}
        />
      ))}
    </>
  )

};

export default memo(BenchmarkSingleFunction);
