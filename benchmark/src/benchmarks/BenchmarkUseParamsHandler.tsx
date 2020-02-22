import React, {FC, Key, memo} from 'react';
import {useBenchmark} from '../hooks/useBenchmark';
import {BenchmarkProps} from '../models/benchmarkProps';
import Child from '../components/Child';
import {useParamsHandler} from '../hooks/useParamsHandler';

const BenchmarkUseParamsHandler: FC<BenchmarkProps> = props => {
  const tools = useBenchmark(props);

  const callback = useParamsHandler<Key, [string, number, boolean, HTMLDivElement]>(
    (key: Key, a, b, c, element) => {}
  );

  return (
    <>
      {tools.keyArray.map(key => (
        <Child
          key={key}
          callback={callback(key)}
          callbackTrigger={tools.callbackTriggerAggregator}
          nodeCount={props.nodesCount}
        />
      ))}
    </>
  )

};

export default memo(BenchmarkUseParamsHandler);
