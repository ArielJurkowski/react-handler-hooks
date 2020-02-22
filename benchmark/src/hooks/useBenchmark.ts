import {Key, useCallback, useEffect, useRef, useState} from 'react';
import {BenchmarkProps} from '../models/benchmarkProps';

const maxDepth: number = 25;

interface BenchmarkTools {
  keyArray: Array<Key>;
  callbackTriggerAggregator: (trigger: () => void) => void;
  renderCount: number;
}

export function useBenchmark(options: BenchmarkProps): BenchmarkTools {
  const callbackTriggers = useRef<Array<() => void>>([]);
  const [keyArray] = useState(
    new Array(options.childrenCount)
      .fill(true)
      .map((_, index) => index % 2 === 0 ? `${index}_${Math.random().toString().substr(2, 5)}` : index)
  );
  const [renderCounter, setRenderCounter] = useState(1);
  const [startTime] = useState(performance.now());

  const callbackTriggerAggregator = useCallback(
    (trigger: () => void) => {
      callbackTriggers.current.push(trigger);
    },
    []
  );

  useEffect(
    () => {
      for(let i = 0; i < options.callbackCount; i++) {
        for (const trigger of callbackTriggers.current!) {
          trigger();
        }
      }
      if (renderCounter >= options.renderCount) {
        options.onFinish(performance.now() - startTime);
      } else {
        if (renderCounter % maxDepth === 0 && renderCounter > 0) {
          setTimeout(() => setRenderCounter(renderCounter + 1));
        } else {
          setRenderCounter(renderCounter + 1);
        }
      }
    },
    [renderCounter]
  );

  return { keyArray, callbackTriggerAggregator, renderCount: renderCounter };
}
