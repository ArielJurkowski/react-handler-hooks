"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useHandler(callback) {
    const callbackRef = react_1.useRef(callback);
    react_1.useLayoutEffect(() => {
        callbackRef.current = callback;
    });
    return react_1.useCallback((...args) => callbackRef.current(...args), []);
}
exports.useHandler = useHandler;
//# sourceMappingURL=useHandler.js.map