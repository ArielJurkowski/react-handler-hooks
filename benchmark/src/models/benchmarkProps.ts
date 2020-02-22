import {BenchmarkConfig} from './benchmarkConfig';

export interface BenchmarkProps extends BenchmarkConfig {
  onFinish: (ms: number) => void;
}
