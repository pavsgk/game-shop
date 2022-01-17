module.exports = {
  "extends": [
    "react-app",
    "airbnb",
    "prettier",
  ],
  "parserOptions": {
    "sourceType": "module"
  },
  "plugins": [
    "prettier"
  ],
  "rules": {
    "semi": 0,
    "no-underscore-dangle": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-unused-vars": [
      "warn", 
      {
        "vars": "local",
        "args": "none"
      }
    ],
    "prettier/prettier": [
      "error", {
        "semi": false
      }
    ]
  }
}