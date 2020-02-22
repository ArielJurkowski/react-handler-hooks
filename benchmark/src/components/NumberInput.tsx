import React, { FC, memo, useCallback } from 'react';

interface Props {
  value: number;
  onChange: (count: number) => void;
  label: string;
  disabled?: boolean;
}

const NumberInput: FC<Props> = props => {

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange(Math.floor(Number.parseFloat(event.target.value)));
    },
    [props.onChange]
  );

  return (
    <label>
      <p>
        {props.label}
      </p>
      <input
        type="number"
        onChange={onInputChange}
        step={1}
        min={1}
        disabled={props.disabled}
        value={props.value}
      />
    </label>
  );
};

export default memo(NumberInput);
