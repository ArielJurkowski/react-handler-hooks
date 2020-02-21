import { renderHook } from '@testing-library/react-hooks';
import { useHandler, useParamsHandler } from '../src';
import clearAllMocks = jest.clearAllMocks;

const sampleCallback = jest.fn();
const secondSampleCallback = jest.fn();

beforeEach(() => clearAllMocks());

describe('useHandler', () => {

  test('should return a function if we pass callback without params', () => {
    const testRender = renderHook(
      () => useHandler(sampleCallback)
    );
    expect(typeof testRender.result.current).toBe('function');
  });

  test('should return a function if we pass callback', () => {
    const testRender = renderHook(
      () => useHandler<string, number>(sampleCallback)
    );
    expect(typeof testRender.result.current).toBe('function');
  });

  test('should return same function after rerender', () => {
    const testRender = renderHook(() => useHandler<string, number>(sampleCallback));
    const firstRun = testRender.result.current;
    testRender.rerender();
    const secondRun = testRender.result.current;
    expect(firstRun).toBe(secondRun);
  });

  test('should return same function if callback changes after rerender', () => {
    const testRender = renderHook(
      ({ callback }) => useHandler<string, number>(callback),
      { initialProps: { callback: sampleCallback } }
    );
    const firstRun = testRender.result.current;
    testRender.rerender({ callback: secondSampleCallback });
    const secondRun = testRender.result.current;
    expect(firstRun).toBe(secondRun);
  });

  test('should run same callback between rerender', () => {
    const testRender = renderHook(
      ({ callback }) => useHandler<string, number>(callback),
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
      ({ callback }) => useHandler<string, number>(callback),
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

  test('should return a handler creator if we pass callback without params', () => {
    const testRender = renderHook(
      () => useParamsHandler(sampleCallback)
    );
    expect(typeof testRender.result.current).toBe('function');
  });

  test('should return a handler creator if we pass callback', () => {
    const testRender = renderHook(
      () => useParamsHandler<string, number, [string, number]>(sampleCallback)
    );
    expect(typeof testRender.result.current).toBe('function');
  });

  test('should return a different handler creator if we pass callback without params', () => {
    const testRender = renderHook(
      () => useParamsHandler(sampleCallback)
    );
    const firstRun = testRender.result.current;
    testRender.rerender();
    const secondRun = testRender.result.current;
    expect(firstRun).not.toBe(secondRun);
  });

  test('should return same function after rerender and different params', () => {
    const testRender = renderHook(() => useParamsHandler<string, number, [string, number]>(sampleCallback));
    const firstRun = testRender.result.current('test', 123);
    testRender.rerender();
    const secondRun = testRender.result.current('test2', 456);
    expect(firstRun).toBe(secondRun);
  });

  test('should return same function if callback changes after rerender', () => {
    const testRender = renderHook(
      ({ callback }) => useParamsHandler<string, number, [string, number]>(callback),
      { initialProps: { callback: sampleCallback } }
    );
    const firstRun = testRender.result.current('test', 123);
    testRender.rerender({ callback: secondSampleCallback });
    const secondRun = testRender.result.current('test2', 456);
    expect(firstRun).toBe(secondRun);
  });

  test('should run different callbacks between rerender', () => {
    const testRender = renderHook(
      ({ callback }) => useParamsHandler<string, number, [string, number]>(callback),
      { initialProps: { callback: sampleCallback } }
    );
    testRender.result.current('test', 123)('test2', 456);
    testRender.rerender({ callback: secondSampleCallback });
    testRender.result.current('test3', 321)('test4', 654);
    expect(sampleCallback).toHaveBeenNthCalledWith(1, 'test', 123, 'test2', 456);
    expect(sampleCallback).toHaveBeenCalledTimes(1);
    expect(secondSampleCallback).toHaveBeenNthCalledWith(1,'test3', 321, 'test4', 654);
    expect(secondSampleCallback).toHaveBeenCalledTimes(1);
  });

  test('should run same callback between rerender', () => {
    const testRender = renderHook(
      ({ callback }) => useParamsHandler<string, number, [string, number]>(callback),
      { initialProps: { callback: sampleCallback } }
    );
    testRender.result.current('test', 123)('test2', 456);
    testRender.rerender();
    testRender.result.current('test3', 321)('test4', 654);
    expect(sampleCallback).toHaveBeenNthCalledWith(1, 'test', 123, 'test2', 456);
    expect(sampleCallback).toHaveBeenNthCalledWith(2, 'test3', 321, 'test4', 654);
    expect(sampleCallback).toHaveBeenCalledTimes(2);
  });

  test('should allow to skip callback creator params', () => {
    const testRender = renderHook(
      ({ callback }) => useParamsHandler<[string, number]>(callback),
      { initialProps: { callback: sampleCallback } }
    );
    testRender.result.current()('test', 123);
    expect(sampleCallback).toHaveBeenNthCalledWith(1, 'test', 123);
    expect(sampleCallback).toHaveBeenCalledTimes(1);
  });

  test('should allow to skip callback params', () => {
    const testRender = renderHook(
      ({ callback }) => useParamsHandler<string, number>(callback),
      { initialProps: { callback: sampleCallback } }
    );
    testRender.result.current('test', 123)();
    expect(sampleCallback).toHaveBeenNthCalledWith(1, 'test', 123);
    expect(sampleCallback).toHaveBeenCalledTimes(1);
  });

  test('should allow to skip all params', () => {
    const testRender = renderHook(
      ({ callback }) => useParamsHandler(callback),
      { initialProps: { callback: sampleCallback } }
    );
    testRender.result.current()();
    expect(sampleCallback).toHaveBeenNthCalledWith(1);
    expect(sampleCallback).toHaveBeenCalledTimes(1);
  });

});
