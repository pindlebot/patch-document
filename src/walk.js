const walk = options => tree => {
  const { component, styles } = options
  const styleNode = typeof styles === 'string'
    ? { tag: 'style', attrs: { type: 'text/css', id: 'ssr' }, content: [styles] }
    : styles
  const divNode = typeof component === 'string'
    ? { tag: 'div', attrs: { id: 'root' }, content: [component] }
    : component
  
  if (divNode && divNode.attrs && divNode.attrs.id) {
    tree.match({ attrs: { id: divNode.attrs.id } }, (node) => {
      return ''
    })
  }

  tree.walk(node => {
    if (styleNode && node.tag === 'head') {
      node.content.push(styleNode) 
      node.content.push('\n')
    }
  
    if (divNode && node.tag === 'body') {
      node.content.push(divNode)
      node.content.push('\n')
    }

    if (node.tag === 'script') {
      if (node.attrs && node.attrs.src) {
        if (node.attrs.src.startsWith('.')) {
          return ''
        }
      }
    }

    return node
  })
}

module.exports = walk
