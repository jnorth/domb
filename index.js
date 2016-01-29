import el from './lib/el';
import elif from './lib/elif';
import factory from './lib/factory';

/**
 * A handy element creator factory function!
 *
 * You pass in React components, and get back a function that can create
 * elements for them. Basically just a wrapper around `React.createElement`.
 *
 * If called with only a single `React` argument, a new function will be
 * returned that can omit that argument in future.
 *
 * @param {React} React
 *        The React library. This has to be passed in so that we don't need to
 *        depend on it here as well as in your project.
 *
 * @param {...React.Component|function|string} types
 *        One or more React components.
 *
 *        If a string is passed, it is assumed to be an HTML tag name.
 *
 *        If a function is passed, it is assumed to be a React stateless
 *        component.
 *
 *        Otherwise, a `React.Component` is expected.
 *
 * @return {function}
 */
function dom(React, ...types) {
  // Return react-free function
  if (!types.length) {
    return (...types) => dom(React, ...types);
  }

  return factory(React, ...types);
};

export { dom, el, elif };
