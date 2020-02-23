import React, {FC, memo, useEffect, useState} from 'react';
import Controls from './components/Controls';
import {BenchmarkProps} from './models/benchmarkProps';
import {Benchmarks} from './benchmarks';
import Results from './components/Results';
import Notes from './components/Notes';
import {useHandler} from './hooks/useHandler';

const App: FC = () => {

  const [nodesCount, setNodesCount] = useState(5);
  const [childrenCount, setChildrenCount] = useState(10);
  const [renderCount, setRenderCount] = useState(20000);
  const [callbackCount, setCallbackCount] = useState(2);

  const [isRunning, setIsRunning] = useState(false);
  const [currentBenchmark, setCurrentBenchmark] = useState(0);
  const [results, setResults] = useState<Array<Array<number>>>([]);

  useEffect(
    () => {
      setResults([]);
    },
    [nodesCount, childrenCount, renderCount, callbackCount]
  );

  const onStart = useHandler(() => {
    setIsRunning(true);
    setCurrentBenchmark(0);
    setResults([...results, []]);
  });

  const onFinish = useHandler((ms: number) => {
    let resultsRow = results[results.length - 1];
    resultsRow = [...resultsRow, Math.round(ms)];
    const newResults = [...results.slice(0, results.length - 1), resultsRow];
    setResults(newResults);
    if (currentBenchmark >= Benchmarks.length - 1) {
      setIsRunning(false);
    } else {
      setCurrentBenchmark(currentBenchmark + 1);
    }
  });

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
