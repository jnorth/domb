/**
 * Returns true if the value can be used as a React component.
 *
 * @param {React.Component|function|string} value
 *
 * @return {bool}
 */
export default function isComponent(React, value) {
  if (value instanceof React.Component) {
    return true;
  }

  const type = typeof value;

  if (type === 'function') {
    return true;
  }

  if (type === 'string') {
    return true;
  }

  return false;
}
