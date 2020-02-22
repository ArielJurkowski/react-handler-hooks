import React, {FC, memo, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import Controls from './components/Controls';
import {BenchmarkProps} from './models/benchmarkProps';
import {Benchmarks} from './benchmarks';
import Results from './components/Results';
import Notes from './components/Notes';

const App: FC = () => {

  const [nodesCount, setNodesCount] = useState(5);
  const [childrenCount, setChildrenCount] = useState(10);
  const [renderCount, setRenderCount] = useState(20000);
  const [callbackCount, setCallbackCount] = useState(2);

  const [isRunning, setIsRunning] = useState(false);
  const [currentBenchmark, setCurrentBenchmark] = useState(0);
  const currentBenchmarkRef = useRef(currentBenchmark);

  const [results, setResults] = useState<Array<Array<number>>>([]);
  const resultsRef = useRef(results);

  useLayoutEffect(() => {
    currentBenchmarkRef.current = currentBenchmark;
    resultsRef.current = results;
  });

  useEffect(
    () => {
      setResults([]);
    },
    [nodesCount, childrenCount, renderCount, callbackCount]
  );

  const onStart = useCallback(
    () => {
      setIsRunning(true);
      setCurrentBenchmark(0);
      setResults([...resultsRef.current, []]);
    },
    []
  );

  const onFinish = useCallback(
    (ms: number) => {
      let resultsRow = resultsRef.current[resultsRef.current.length - 1];
      resultsRow = [...resultsRow, Math.round(ms)];
      const newResults = [...resultsRef.current.slice(0, resultsRef.current.length - 1), resultsRow];
      setResults(newResults);
      if (currentBenchmarkRef.current >= Benchmarks.length - 1) {
        setIsRunning(false);
      } else {
        setCurrentBenchmark(currentBenchmarkRef.current + 1);
      }
    },
    []
  );

  const benchmarkProps: BenchmarkProps = {
    nodesCount,
    renderCount,
    callbackCount,
    childrenCount,
    onFinish
  };

  const CurrentBenchmark = Benchmarks[currentBenchmark].component;

  return (
    <>
      <Controls
        nodesCount={nodesCount}
        childrenCount={childrenCount}
        renderCount={renderCount}
        callbackCount={callbackCount}
        onNodesCountChange={setNodesCount}
        onChildrenCountChange={setChildrenCount}
        onRenderCountChange={setRenderCount}
        onCallbackCountChange={setCallbackCount}
        onStart={onStart}
        disabled={isRunning}
      />
      <Results results={results} />
      <Notes />
      {isRunning && <CurrentBenchmark {...benchmarkProps} />}
    </>
  );
};

export default memo(App);
