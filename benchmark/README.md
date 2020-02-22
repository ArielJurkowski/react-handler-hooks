## react-handler-hooks-benchmark

```bash
npm run benchmark
```

## Info
- Do not run this via **start**. For proper results this needs to be ran in production mode. **npm run benchmark** will install dependencies, build in production, serve it and open your browser.
- This benchmark isn't perfect. There are more variables than the 4 that you can change in this benchmark. **Run it and have your own conclusion.**

## Developer's TLDR
- useHandler and useParamsHandler **are slower** than useCallback (+dataset for params) if:

  - the children tree size is small and...
  - your useCallbacks don't change often due to dependency change
  
- If your children tree size is large or your useCallbacks change very often then:

  - useHandler is on par or faster than useCallback
  - useParamsHandler is faster than using dataset

- useHandler is always slower than useCallback that never changes, but barely
- useParamsHandler is always slower than useCallback+dataset that never changes, but barely
