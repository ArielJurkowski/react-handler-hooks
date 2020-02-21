"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useParamsHandler(callback) {
    const outerArgsRef = react_1.useRef();
    const callbackRef = react_1.useRef(callback);
    react_1.useLayoutEffect(() => {
        callbackRef.current = callback;
    });
    const passedRef = react_1.useCallback((...innerArgs) => callbackRef.current(...outerArgsRef.current, ...innerArgs), []);
    return (...outerArgs) => {
        outerArgsRef.current = outerArgs;
        return passedRef;
    };
}
exports.useParamsHandler = useParamsHandler;
//# sourceMappingURL=useParamsHandler.js.map