module.exports = {
    "extends": "airbnb-base",
    "globals": {
        "window": true,
        "document": true,
        "location": true,
        "describe": true,
        "it": true,
        "fetch": true,
        "localStorage": true,
        "alert": true,
    },
    "rules": {
        "one-var": 0,
        "one-var-declaration-per-line": 0,
        "new-cap": 0,
        "consistent-return": 0,
        "no-param-reassign": 0,
        "comma-dangle": 0,
        "curly": ["error", "multi-line"],
        "import/no-unresolved": [2, { "commonjs": true }],
        "no-shadow": ["error", { "allow": ["req", "res", "err"] }],
        "valid-jsdoc": ["error", {
          "requireReturn": true,
          "requireReturnType": true,
          "requireParamDescription": false,
          "requireReturnDescription": true
        }],
    }
};