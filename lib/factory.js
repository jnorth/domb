import el from './el';

/**
 * Creates a component factory.
 *
 * This is used to create an `el` function with the `type` already
 * defined.
 *
 * @param {React} React
 *        The React library.
 *
 * @param {...React.Component|function|string} type
 *        One or more React components. Passed directly into
 *        `React.createElement`.
 *
 *        If a string is passed, it is assumed to be an HTML tag name.
 *
 *        If a function is passed, it is assumed to be a React stateless
 *        component.
 *
 *        Otherwise, a `React.Component` is expected.
 *
 * @return {function|object}
 *         If only a single type was given, a element-creator function will be
 *         returned.
 *
 *         If multiple types were given, an object with key-function pairs for
 *         each component will be returned. Class and stateless function
 *         components get their key from their `name` property.
 */
export default function factory(React, ...types) {
  if (types.length === 1) {
    return attributes => el(React, types[0], attributes);
  }

  return types.reduce((dom, type) => {
    const typeName = type.name || type;

    return {
      ...dom,
      [typeName]: attributes => el(React, type, attributes),
    };
  }, {});
}
