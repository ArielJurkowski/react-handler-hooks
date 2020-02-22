import React, {FC, memo, useEffect, useLayoutEffect, useMemo, useRef} from 'react';
import Node from './Node';

interface Props extends React.HTMLProps<HTMLDivElement> {
  nodeCount: number;
  callback: (one: string, two: number, three: boolean, element: HTMLDivElement) => void;
  callbackTrigger: (request: () => void) => void;
}

const Child: FC<Props> = ({ nodeCount, callback, callbackTrigger, ...divProps }) => {

  const divRef = useRef<HTMLDivElement>(null);

  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback
  });

  useEffect(
    () => {
      callbackTrigger(
        () => callbackRef.current('Hello world!', 1337, true, divRef.current!)
      );
    },
    [callbackTrigger]
  );

  const content = useMemo(
    () => (
      <>
        {new Array(nodeCount).fill(true).map((_, index) => (
          <Node key={index} />
        ))}
      </>
    ),
    []
  );

  return <div ref={divRef} {...divProps}>
    {content}
  </div>;
};

export default memo(Child);
