const ReactNative = jest.requireActual('react-native');

ReactNative.PanResponder = {
    create: (handlers) => ({
        panHandlers: handlers,
    }),
};

module.exports = ReactNative;
