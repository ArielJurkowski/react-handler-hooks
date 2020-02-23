import { renderHook } from '@testing-library/react-hooks';
import { useHandler, useParamsHandler } from '../src';
import clearAllMocks = jest.clearAllMocks;

const sampleCallback = jest.fn();
const secondSampleCallback = jest.fn();

beforeEach(() => clearAllMocks());

describe('useHandler', () => {

  test('should return a function if we pass callback', () => {
    const testRender = renderHook(
      () => useHandler(sampleCallback)
    );
    expect(typeof testRender.result.current).toBe('function');
  });

  test('should return same function after rerender', () => {
    const testRender = renderHook(
      () => useHandler(sampleCallback)
    );
    const firstRun = testRender.result.current;
    testRender.rerender();
    const secondRun = testRender.result.current;
    expect(firstRun).toBe(secondRun);
  });

  test('should return same function if dependency list is empty', () => {
    const testRender = renderHook(
      ({ deplist }) => useHandler(sampleCallback, deplist),
      { initialProps: { deplist: [] } }
    );
    const firstRun = testRender.result.current;
    testRender.rerender({ deplist: [] });
    const secondRun = testRender.result.current;
    expect(firstRun).toBe(secondRun);
  });

  test('should return same function if dependencies do not change', () => {
    const testRender = renderHook(
      ({ deplist }) => useHandler(sampleCallback, deplist),
      { initialProps: { deplist: [1, 2, 3, '123'] } }
    );
    const firstRun = testRender.result.current;
    testRender.rerender({ deplist: [1, 2, 3, '123'] });
    const secondRun = testRender.result.current;
    expect(firstRun).toBe(secondRun);
  });

  test('should return different function if dependencies change', () => {
    const testRender = renderHook(
      ({ deplist }) => useHandler(sampleCallback, deplist),
      { initialProps: { deplist: [1, 2, 3, '123'] } }
    );
    const firstRun = testRender.result.current;
    testRender.rerender({ deplist: [1, 2, 3, '1234'] });
    const secondRun = testRender.result.current;
    expect(firstRun).not.toBe(secondRun);
  });

  test('should return same function if callback changes after rerender', () => {
    const testRender = renderHook(
      ({ callback }) => useHandler(callback),
      { initialProps: { callback: sampleCallback } }
    );
    const firstRun = testRender.result.current;
    testRender.rerender({ callback: secondSampleCallback });
    const secondRun = testRender.result.current;
    expect(firstRun).toBe(secondRun);
  });

  test('should run same callback between rerender', () => {
    const testRender = renderHook(
      ({ callback }) => useHandler(callback),
      { initialProps: { callback: sampleCallback } }
    );
    testRender.result.current('test', 123);
    testRender.rerender();
    testRender.result.current('test2', 456);
    expect(sampleCallback).toHaveBeenNthCalledWith(1, 'test', 123);
    expect(sampleCallback).toHaveBeenNthCalledWith(2, 'test2', 456);
    expect(sampleCallback).toHaveBeenCalledTimes(2);
  });

  test('should run different callbacks once between rerender', () => {
    const testRender = renderHook(
      ({ callback }) => useHandler(callback),
      { initialProps: { callback: sampleCallback } }
    );
    testRender.result.current('test', 123);
    testRender.rerender({ callback: secondSampleCallback });
    testRender.result.current('test2', 456);
    expect(sampleCallback).toHaveBeenNthCalledWith(1, 'test', 123);
    expect(sampleCallback).toHaveBeenCalledTimes(1);
    expect(secondSampleCallback).toHaveBeenNthCalledWith(1, 'test2', 456);
    expect(secondSampleCallback).toHaveBeenCalledTimes(1);
  });

  test('should run same callback without params between rerender', () => {
    const testRender = renderHook(
      ({ callback }) => useHandler(callback),
      { initialProps: { callback: sampleCallback } }
    );
    testRender.result.current();
    testRender.rerender();
    testRender.result.current();
    expect(sampleCallback).toHaveBeenNthCalledWith(1);
    expect(sampleCallback).toHaveBeenNthCalledWith(2);
    expect(sampleCallback).toHaveBeenCalledTimes(2);
  });

});

describe('useParamsHandler', () => {

  test('should return a handler creator if we pass callback', () => {
    const testRender = renderHook(
      () => useParamsHandler(sampleCallback)
    );
    expect(typeof testRender.result.current).toBe('function');
  });

  test('should return a callback from a handler creator if we pass callback', () => {
    const testRender = renderHook(
      () => useParamsHandler(sampleCallback)
    );
    expect(typeof testRender.result.current('123')).toBe('function');
  });

  test('should return a different handler creator every time', () => {
    const testRender = renderHook(
      () => useParamsHandler(sampleCallback)
    );
    const firstRun = testRender.result.current;
    testRender.rerender();
    const secondRun = testRender.result.current;
    expect(firstRun).not.toBe(secondRun);
  });

  test('should return different function for different key param', () => {
    const testRender = renderHook(() => useParamsHandler(sampleCallback));
    const firstRun = testRender.result.current('test');
    const secondRun = testRender.result.current('test2');
    expect(firstRun).not.toBe(secondRun);
  });

  test('should return different function for different key param in object', () => {
    const testRender = renderHook(() => useParamsHandler(sampleCallback));
    const firstRun = testRender.result.current({ key: 'test', data: 123 });
    const secondRun = testRender.result.current({ key: 'test2', data: 123 });
    expect(firstRun).not.toBe(secondRun);
  });

  test('should return different function after rerender and different key param', () => {
    const testRender = renderHook(() => useParamsHandler(sampleCallback));
    const firstRun = testRender.result.current('test');
    testRender.rerender();
    const secondRun = testRender.result.current('test2');
    expect(firstRun).not.toBe(secondRun);
  });

  test('should return different function after rerender and different key in object', () => {
    const testRender = renderHook(() => useParamsHandler(sampleCallback));
    const firstRun = testRender.result.current({ key: 'test', data: 123 });
    testRender.rerender();
    const secondRun = testRender.result.current({ key: 'test2', data: 123 });
    expect(firstRun).not.toBe(secondRun);
  });

  test('should return same function if callback changes after rerender for same key', () => {
    const testRender = renderHook(
      ({ callback }) => useParamsHandler(callback),
      { initialProps: { callback: sampleCallback } }
    );
    const firstRun = testRender.result.current({ key: 'test', num: 123 });
    testRender.rerender({ callback: secondSampleCallback });
    const secondRun = testRender.result.current({ key: 'test', num: 456 });
    expect(firstRun).toBe(secondRun);
  });

  test('should return same function if callback changes after rerender for same key alone and then in object', () => {
    const testRender = renderHook(
      ({ callback }) => useParamsHandler(callback),
      { initialProps: { callback: sampleCallback } }
    );
    const firstRun = testRender.result.current('test');
    testRender.rerender({ callback: secondSampleCallback });
    const secondRun = testRender.result.current({ key: 'test', num: 456 });
    expect(firstRun).toBe(secondRun);
  });

  test('should always return same functions for multiple out of order keys, with changing passed params, mid renders, between renders and at callback changes', () => {
    const testRender = renderHook(
      ({ callback }) => useParamsHandler(callback),
      { initialProps: { callback: sampleCallback } }
    );

    const firstRun1 = testRender.result.current('test1');
    const firstRun2 = testRender.result.current('test2');
    const firstRun3 = testRender.result.current('test3');
    const firstRun4 = testRender.result.current('test4');

    testRender.rerender({ callback: secondSampleCallback });

    const secondRun4 = testRender.result.current({ key: 'test4', num: 467 });
    const secondRun2 = testRender.result.current({ key: 'test2', num: 937 });
    const secondRun3 = testRender.result.current({ key: 'test3', num: 104 });
    const secondRun1 = testRender.result.current({ key: 'test1', num: 274 });

    const thirdRun1 = testRender.result.current('test1');
    const thirdRun4 = testRender.result.current('test4');
    const thirdRun3 = testRender.result.current('test3');
    const thirdRun2 = testRender.result.current('test2');

    testRender.rerender({ callback: sampleCallback });

    const fourthRun2 = testRender.result.current({ key: 'test2', numba: 368 });
    const fourthRun3 = testRender.result.current({ key: 'test3', numba: 109 });
    const fourthRun1 = testRender.result.current({ key: 'test1', numba: 468 });
    const fourthRun4 = testRender.result.current({ key: 'test4', numba: 211 });

    expect(firstRun1).toBe(secondRun1);
    expect(firstRun2).toBe(secondRun2);
    expect(firstRun3).toBe(secondRun3);
    expect(firstRun4).toBe(secondRun4);

    expect(firstRun1).toBe(thirdRun1);
    expect(firstRun2).toBe(thirdRun2);
    expect(firstRun3).toBe(thirdRun3);
    expect(firstRun4).toBe(thirdRun4);

    expect(firstRun1).toBe(fourthRun1);
    expect(firstRun2).toBe(fourthRun2);
    expect(firstRun3).toBe(fourthRun3);
    expect(firstRun4).toBe(fourthRun4);
  });

  test('should run different callbacks between rerender', () => {
    const testRender = renderHook(
      ({ callback }) => useParamsHandler(callback),
      { initialProps: { callback: sampleCallback } }
    );
    testRender.result.current({ key: 'test', num: 123 })('test2', 456);
    testRender.rerender({ callback: secondSampleCallback });
    testRender.result.current({ key: 'test3', num: 321 })('test4', 654);
    expect(sampleCallback).toHaveBeenNthCalledWith(1, { key: 'test', num: 123 }, 'test2', 456);
    expect(sampleCallback).toHaveBeenCalledTimes(1);
    expect(secondSampleCallback).toHaveBeenNthCalledWith(1,{ key: 'test3', num: 321 }, 'test4', 654);
    expect(secondSampleCallback).toHaveBeenCalledTimes(1);
  });

  test('should run same callback between rerender', () => {
    const testRender = renderHook(
      ({ callback }) => useParamsHandler(callback),
      { initialProps: { callback: sampleCallback } }
    );
    testRender.result.current({ key: 'test', num: 123 })('test2', 456);
    testRender.rerender();
    testRender.result.current({ key: 'test3', num: 321 })('test4', 654);
    expect(sampleCallback).toHaveBeenNthCalledWith(1, { key: 'test', num: 123 }, 'test2', 456);
    expect(sampleCallback).toHaveBeenNthCalledWith(2, { key: 'test3', num: 321 }, 'test4', 654);
    expect(sampleCallback).toHaveBeenCalledTimes(2);
  });

  test('should return same function if dependencies do not change', () => {
    const testRender = renderHook(
      ({ deplist }) => useParamsHandler(sampleCallback, deplist),
      { initialProps: { deplist: [1, 2, 3, '123'] } }
    );
    const firstRun = testRender.result.current('test');
    testRender.rerender({ deplist: [1, 2, 3, '123'] });
    const secondRun = testRender.result.current('test');
    expect(firstRun).toBe(secondRun);
  });

  test('should return same function if dependency list is empty', () => {
    const testRender = renderHook(
      ({ deplist }) => useParamsHandler(sampleCallback, deplist),
      { initialProps: { deplist: [] } }
    );
    const firstRun = testRender.result.current('test');
    testRender.rerender({ deplist: [] });
    const secondRun = testRender.result.current('test');
    expect(firstRun).toBe(secondRun);
  });

  test('should return different function if dependency list changes', () => {
    const testRender = renderHook(
      ({ deplist }) => useParamsHandler(sampleCallback, deplist),
      { initialProps: { deplist: [1, 2, 3, '123'] } }
    );
    const firstRun = testRender.result.current('test');
    testRender.rerender({ deplist: [1, 2, 3, '1234'] });
    const secondRun = testRender.result.current('test');
    expect(firstRun).not.toBe(secondRun);
  });

  test('should return different function if dependency list does not change but keys do', () => {
    const testRender = renderHook(
      ({ deplist }) => useParamsHandler(sampleCallback, deplist),
      { initialProps: { deplist: [1, 2, 3, '123'] } }
    );
    const firstRun = testRender.result.current('test');
    testRender.rerender({ deplist: [1, 2, 3, '123'] });
    const secondRun = testRender.result.current('test2');
    expect(firstRun).not.toBe(secondRun);
  });

});
