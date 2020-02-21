# 🐱 react-handler-hooks 🐱
React hooks for persistent and parameterizable callbacks
## Installation
```bash
npm install react-handler-hooks
```
## What are these?
Two hooks that can fully replace the useCallback hook: **useHandler** and **useParamsHandler**. Hooks return function proxies for your callbacks.
#### Pros
- Hooks will **always** return the same function, this means children will never rerender because of a callback change.
- No dependency list needed, because hooks always use fresh callbacks. Your state values from **useState** will always be current in your callbacks.
- Supports dynamic parameters.
- Full type safety with TypeScript.
- Cleaner code, less headaches!
#### Cons
- **useParamsHandler** first parameter is a key and needs to be a number or string. You need to be cautious with it, just like with the key property for JSX elements. 
- **useHandler** internally uses 3 hooks and **useParamsHandler** uses 4. 
- **useParamsHandler** also memoizes function callbacks for each key.
- The hooks are technically slower than **useCallback**, but they will give you the lost performance back (and more) in lack of rerenders.
## useHandler
Work just like a normal **useCallback**, but has extra magic mentioned in the pros section!
```typescript jsx
useHandler(() => {
  // no params
});

useHandler<React.MouseEvent>(event => {
  // single param
});

useHandler<number, string>((num, str) => {
 // two params etc...
});
```
```typescript jsx
const [clicks, setClicks] = useState<number>(0);
const [timestamp, setTimestamp] = useState<number>(0);

const onClick = useHandler<React.MouseEvent>(
  event => {
    // no need for function (clicks => clicks + 1) in setter
    // nor adding clicks to dep list!
    setClicks(clicks + 1);
    setTimestamp(Math.floor(event.timeStamp));
  }
);

return (
  <h1 onClick={onClick}>
    Click count: {clicks} ({timestamp})
  </h1>
);
```
## useParamsHandler
Allows for passing parameters that don't originate from the original event callback. First parameter is a key. The hook returns a callback creator which returns the same callback for each unique key.

The last generic type is a tuple, it describes the parameters you'll recieve from the original event callback (ex. MouseEvent from onClick). You don't have to include it.
```typescript jsx
useParamsHandler<number>(userId => {
  // just 1 dynamic parameter (which is the key)
});

useParamsHandler<number, string>((userId, str) => {
  // two dynamic parameters
});

useParamsHandler<number, string, [React.MouseEvent]>((num, str, event) => {
 // two dynamic parameters and one original parameter
});

useParamsHandler<number, string, [string[], string]>((num, str, users, str2) => {
 // two dynamic parameters and two original parameters
});
```
```typescript jsx
const [clickedName, setClickedName] = useState<string>();
const [randomNumber, setRandomNumber] = useState<number>(0);
const [timestamp, setTimestamp] = useState<number>(0);

const onClick = useParamsHandler<string, number, [React.MouseEvent]>(
  (name, newRandomNumber, event) => {
    setClickedName(name);
    setRandomNumber(newRandomNumber);
    setTimestamp(Math.floor(event.timeStamp));
  }
);

return (
  <>
    <h1 onClick={onClick('Ariel', Math.random())}>
      Ariel
    </h1>
    <h1 onClick={onClick('John', Math.random())}>
      John
    </h1>
    <h1 onClick={onClick('Mary', Math.random())}>
      Mary
    </h1>
    {clickedName && `Clicked on ${clickedName} at ${timestamp}. Random number is ${randomNumber}`}
  </>
);
```
## TODO
- Performance tests in comparision with **useCallback**
## Contact
E-mail: [arieljurkowski@gmail.com](mailto:arieljurkowski@gmail.com)  
Send me a nice message if you're using this!
## License
[MIT](https://choosealicense.com/licenses/mit/)
