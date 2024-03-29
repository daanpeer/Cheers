module.exports = {
    "extends": "airbnb",

    "rules": {
      "semi": [2, "never"],
      "arrow-body-style": [0, "as-needed"],
      "strict": 0,
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    },

    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
        },
    },

    "plugins": [
        "react"
    ]
};
