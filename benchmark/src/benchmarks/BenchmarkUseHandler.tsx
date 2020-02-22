import React, {FC, memo} from 'react';
import {useBenchmark} from '../hooks/useBenchmark';
import {BenchmarkProps} from '../models/benchmarkProps';
import Child from '../components/Child';
import {useHandler} from '../hooks/useHandler';

const BenchmarkUseHandler: FC<BenchmarkProps> = props => {
  const tools = useBenchmark(props);

  const callback = useHandler<string, number, boolean, HTMLDivElement>(
    (a, b, c, element) => {}
  );

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

export default memo(BenchmarkUseHandler);
