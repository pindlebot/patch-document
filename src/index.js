const posthtml = require('posthtml')
const walk = require('./walk')

const transform = (document, { styles, component }) => posthtml()
  .use(walk({ component, styles }))
  .process(document)
  .then(res => res.html)

transform.walk = walk

module.exports = transform
