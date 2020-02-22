import React, {FC, memo} from 'react';
import {useBenchmark} from '../hooks/useBenchmark';
import {BenchmarkProps} from '../models/benchmarkProps';
import Child from '../components/Child';

const BenchmarkChildFunction: FC<BenchmarkProps> = props => {
  const tools = useBenchmark(props);

  return (
    <>
      {tools.keyArray.map(key => (
        <Child
          key={key}
          callback={(a: string, b: number, c: boolean, element: HTMLDivElement) => {}}
          callbackTrigger={tools.callbackTriggerAggregator}
          nodeCount={props.nodesCount}
        />
      ))}
    </>
  )

};

export default memo(BenchmarkChildFunction);
