# 🐱 react-handler-hooks
React hooks for persistent and parameterizable callbacks - useCallback on steroids!

![Build](https://github.com/ArielJurkowski/react-handler-hooks/workflows/Build/badge.svg?branch=master)
## Installation
```bash
npm i react-handler-hooks
```
## What are these?
Two hooks that fully replace the useCallback hook: **useHandler** and **useParamsHandler**. And they have many benefits!
#### Pros
- Hooks will return the same function on each render, this means children will never rerender because of a callback change.
- No dependency list needed, because hooks always use fresh callbacks internally. Your state values from useState will always be fresh in your callbacks.
- Supports passed parameters and they can even be dynamic.
- Full type safety with TypeScript.
- Optional dependency list, useful for render props.
- useHandler is fully reverse compatible with useCallback.
- Cleaner code, easier debugging, less headaches!

#### Cons
- **useParamsHandler** needs a unique key. You need to be cautious with it, just like with the key property for JSX elements. 
- The hooks by themselves are technically (but barely) slower than **useCallback**, but they will give you the lost (and much more) performance back in lack of re-renders.
## useHandler
Works and looks just like a normal **useCallback**, but you don't need to put dependencies.
```typescript jsx
useHandler(() => {
  // no params
});

useHandler((event: React.MouseEvent) => {
  // single param
});

useHandler((num: number, str: string) => {
 // two params etc...
});
```
```typescript jsx
const [clicks, setClicks] = useState<number>(0);
const [timestamp, setTimestamp] = useState<number>(0);

const onClick = useHandler((event: React.MouseEvent) => {
  // no need for function (clicks => clicks + 1) in setter
  // nor adding clicks to dep list!
  setClicks(clicks + 1);
  setTimestamp(Math.floor(event.timeStamp));
});

return (
  <h1 onClick={onClick}>
    Click count: {clicks} ({timestamp})
  </h1>
);
```
## useParamsHandler
Allows for passing parameters that don't originate from the original callback. First parameter is a key or object with your params that has a key property. The hook returns a callback creator which returns the same callback for each unique key.
```typescript jsx
useParamsHandler((userId: string | number) => {
  // 1 passed param (which is the key)
});

useParamsHandler((params: { key: number, str: string }) => {
  // passed params object if you need multiple params
});

useParamsHandler((params: { key: string, num: number }, e: React.MouseEvent) => {
  // passed params and callback params
});

useParamsHandler((key: number, usersIds: string[], data: any) => {
 // 1 passed param and 2 callback params
});
```
```typescript jsx
const [clickedName, setClickedName] = useState<string>();
const [timestamp, setTimestamp] = useState<number>(0);

const onClick = useParamsHandler((name: string, event: React.MouseEvent) => {
  setClickedName(name);
  setTimestamp(Math.floor(event.timeStamp));
});

return (
  <>
    <h1 onClick={onClick('Ariel')}>
      Ariel
    </h1>
    <h1 onClick={onClick('John')}>
      John
    </h1>
    <h1 onClick={onClick('Mary')}>
      Mary
    </h1>
    {clickedName && `Clicked on ${clickedName} at ${timestamp}!`}
  </>
);
```
## DependencyList
Both hooks support an **optional** second parameter with a DependencyList that is just like the DependencyList in useEffect, useLayoutEffect or useCallback.

This is only useful when you actually do want to get a brand new function into your child components. A very good examples are render props.

These hooks still have advantages over useCallback even if you're using a deplist, but they're mainly for you to not switch back between useCallback and these hooks.

## Benchmark
Check out the **benchmark** folder.

## Contact
E-mail: [ariel.jurkowski@gmail.com](mailto:ariel.jurkowski@gmail.com)  
Send me a nice message if you're using this!
## License
[MIT](https://choosealicense.com/licenses/mit/)
