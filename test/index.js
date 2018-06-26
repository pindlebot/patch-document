const assert = require('assert')

const document = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge, chrome=1" />
  <title>untitled</title>
  <script src="./app.js" type="text/javascript"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>
`

const processHtml = require('./src/index')
const component = `<h1>Works!</h1>`

const styles = `h1 { font-size: 22px; }`

const expected = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge, chrome=1">
  <title>untitled</title>
  <style type="text/css" id="ssr">h1 { font-size: 22px; }</style>
</head>
<body>

<div id="root"><h1>Works!</h1></div>
</body>
</html>
`

processHtml(document, { component, styles }).then(res => {
  assert.equal(expected, res)
})