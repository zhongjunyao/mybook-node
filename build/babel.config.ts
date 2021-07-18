module.exports = () => {
  const isProduction = process.env.NODE_ENV === 'production'
  return ({
    "sourceType": "unambiguous",
    "sourceMaps": !isProduction,
    "presets": [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage",
          "corejs": {
            "version": "3.15",
            "proposals": true,
            "forceAllTransforms": isProduction
          }
        }
      ],
      "@babel/preset-react",
      //when you use ts, please disable flow to avoid the conflicts between flow and typescript
      // "@babel/preset-flow"
    ]
  })
}