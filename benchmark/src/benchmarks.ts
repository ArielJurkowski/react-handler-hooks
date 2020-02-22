import {NamedExoticComponent} from 'react';
import {BenchmarkProps} from './models/benchmarkProps';
import BenchmarkUseCallback from './benchmarks/BenchmarkUseCallback';
import BenchmarkUseHandler from './benchmarks/BenchmarkUseHandler';
import BenchmarkSingleFunction from './benchmarks/BenchmarkSingleFunction';
import BenchmarkChildFunction from './benchmarks/BenchmarkChildFunction';
import BenchmarkUseCallbackDeps10 from './benchmarks/BenchmarkUseCallback10';
import BenchmarkUseCallbackDeps100 from './benchmarks/BenchmarkUseCallback100';
import BenchmarkDataset from './benchmarks/BenchmarkDataset';
import BenchmarkUseParamsHandler from './benchmarks/BenchmarkUseParamsHandler';
import BenchmarkDataset10 from './benchmarks/BenchmarkDataset10';
import BenchmarkDataset100 from './benchmarks/BenchmarkDataset100';
import BenchmarkChildFunctionToCallback from './benchmarks/BenchmarkChildFunctionToCallback';

interface BenchmarkDescription {
  name: string;
  notes: string;
  component: NamedExoticComponent<BenchmarkProps>;
}

export const Benchmarks: BenchmarkDescription[] = [
  {
    name: 'useCallback',
    notes: 'useCallback that never changes',
    component: BenchmarkUseCallback
  },
  {
    name: 'useCallback/100',
    notes: 'useCallback that changes each 100 renders due to dependencies change',
    component: BenchmarkUseCallbackDeps100
  },
  {
    name: 'useCallback/10',
    notes: 'useCallback that changes each 10 renders due to dependencies change',
    component: BenchmarkUseCallbackDeps10
  },
  {
    name: 'useHandler',
    notes: 'useHandler hook, impossible to change',
    component: BenchmarkUseHandler
  },
  {
    name: 'Arrow',
    notes: 'Single arrow function reused for all children per render',
    component: BenchmarkSingleFunction
  },
  {
    name: 'Arrow/child',
    notes: 'Every child receives a new arrow function per render',
    component: BenchmarkChildFunction
  },
  {
    name: 'Dataset',
    notes: 'Passing parameters to useCallback via dataset',
    component: BenchmarkDataset
  },
  {
    name: 'Dataset/100',
    notes: 'Passing parameters to useCallback (that changes every 100 renders) via dataset',
    component: BenchmarkDataset100
  },
  {
    name: 'Dataset/10',
    notes: 'Passing parameters to useCallback (that changes every 10 renders) via dataset',
    component: BenchmarkDataset10
  },
  {
    name: 'useParamsHandler',
    notes: 'Passing parameters via useParamsHandler hook, impossible to change',
    component: BenchmarkUseParamsHandler
  },
  {
    name: 'Arrow/child to callback',
    notes: 'Passing parameters via arrow function per child to a never changing useCallback',
    component: BenchmarkChildFunctionToCallback
  }
];
