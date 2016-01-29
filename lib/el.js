import isComponent from './isComponent';

/**
 * Create a React element.
 *
 * @param {React} React
 *        The React library.
 *
 * @param {React.Component} type
 *        The React component to use. Passed directly into
 *        `React.createElement`.
 *
 * @param {string|function|React.Component} [attributes]
 *        If a component is passed directly, it will be used as the element's
 *        child content.
 *
 * @param {object} [attributes]
 *        Attributes to pass into `React.createElement`. Two attributes are
 *        treated specially:
 *
 * @param {array|object} [attributes.content]
 *        A child component, or array of child components.
 *
 * @param {array} [attributes.children]
 *        An array of dynamic child components. Each should have a `key` prop.
 *
 * @return {React.Element}
 */
export default function el(React, type, attributes={}) {
  // Content-only
  if (isComponent(React, attributes)) {
    return React.createElement(type, {}, attributes);
  }

  // Has content
  const content = attributes.content;
  delete attributes.content;

  if (content) {
    if (Array.isArray(content)) {
      return React.createElement(type, attributes, ...content);
    } else {
      return React.createElement(type, attributes, content);
    }
  }

  // Has children
  const children = attributes.children;
  delete attributes.children;

  if (children) {
    return React.createElement(type, attributes, children);
  }

  // Plain
  return React.createElement(type, attributes);
};
