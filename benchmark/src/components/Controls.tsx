import React, {FC, memo} from 'react';
import NumberInput from './NumberInput';
import {BenchmarkConfig} from '../models/benchmarkConfig';

interface Props extends BenchmarkConfig {
  onStart: () => void;
  onNodesCountChange: (count: number) => void;
  onChildrenCountChange: (count: number) => void;
  onRenderCountChange: (count: number) => void;
  onCallbackCountChange: (count: number) => void;
  disabled?: boolean;
}

const Controls: FC<Props> = props => {
  return (
    <header>
      <NumberInput
        label="Nodes in child"
        value={props.nodesCount}
        disabled={props.disabled}
        onChange={props.onNodesCountChange}
      />
      <NumberInput
        label="Children"
        value={props.childrenCount}
        disabled={props.disabled}
        onChange={props.onChildrenCountChange}
      />
      <NumberInput
        label="Renders"
        value={props.renderCount}
        disabled={props.disabled}
        onChange={props.onRenderCountChange}
      />
      <NumberInput
        label="Callbacks/render"
        value={props.callbackCount}
        disabled={props.disabled}
        onChange={props.onCallbackCountChange}
      />
      <button
        onClick={props.onStart}
        disabled={props.disabled}
      >
        Start!
      </button>
    </header>
  );
};

export default memo(Controls);
