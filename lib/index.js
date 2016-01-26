function isComponent(React, value) {
  if (value instanceof React.Component) {
    return true;
  }

  if (typeof value === 'function') {
    return true;
  }

  if (typeof value === 'string') {
    return true;
  }

  return false;
}

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
export function component(React, type, attributes={}) {
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

/**
 * Creates a component factory.
 *
 * This is used to create a `component` function with the `type` already
 * defined.
 *
 * @param {React} React
 *        The React library.
 *
 * @param {array|React.Component} type
 *        An array of React components to use. Passed directly into
 *        `React.createElement`.
 *
 *        A string can be used to create a simple HTML element component.
 *
 *        A function can be used to create a functional component. Its key in
 *        the returned object will be the functions `name` property.
 *
 *        A class can be used to create a class component. Its key in
 *        the returned object will be the class' `name` property.
 *
 * @return {object}
 *         An object with key-function pairs for each component.
 */
export function factory(React, types) {
  if (!Array.isArray(types)) {
    types = [types];
  }

  return types.reduce((dom, type) => {
    const typeName = type.name || type;

    return {
      ...dom,
      [typeName]: attributes => component(React, type, attributes),
    };
  }, {});
}
