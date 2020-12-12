module.exports = {
    env: {
        es6: true,
        node: true,
        'jest/globals': true,
    },
    extends:['airbnb-base', 'plugin:/jest/recommended'],
    globals:{
        Atomics:'read-only',
        SharedArrayBuffer:'readonly',
    },
    parserOptions:{
        ecmaVersion: 2020
    },
    plugins: [
        'jest',
        'jest-formatting',
    ]
} 