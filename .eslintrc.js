module.exports = {
    "extends": "airbnb",
    "rules": {
      "no-console": 0,
      "no-unused-vars": ["error", { "args": "none", "ignoreRestSiblings": false }],
      "consistent-return": [0, {"treatUndefinedAsUnspecified": true}],
      "func-names": [0, "as-needed"],
      "no-param-reassign": 0,
      "react/jsx-filename-extension": 0,
      "react/no-did-mount-set-state": 0,
      "class-methods-use-this": 0,
      "prefer-arrow-callback": 0,
      "no-underscore-dangle": 0,
      "no-mixed-operators": [1, {"allowSamePrecedence": true}],
      "jsx-a11y/no-autofocus": 0,
    },
    "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "jquery": true
    },
}
