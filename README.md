# domb

A dumb wrapper around `React.createElement`.

Most wrappers stick to the 3 parameter signature that `React.createElement` uses
(type, attributes, content). I find that third parameter to be unwieldy, and
prefer it to just be another attribute.

## Usage

domb exports two functions:

### `component(React, type, attributes)`

Creates a new React element.

`React` is the React library.

`type` is the element type that you would typically pass into
`React.createElement`. Can be a string, like `div`, a functional component, or
a regular `React.Component` class.

`attributes` is an object of parameters, like the ones you would typically pass
into `React.createElement`. The only difference is the way child elements are
passed.

If you want to pass a single child element, pass it via `attributes.content`.

To pass multiple child elements, pass an array via `attributes.content`.

Finally, if you have a list of child elements that require `key` propertyes,
pass them as an array via `attributes.children`.

### `factory(React, types)`

Creates factory functions that, when called, creates a new React element. This
is used to cut down on the boilerplate by providing nicely-named functions to
use directly in your components.

`React` is the React library.

`types` is an array of element types.

If you want to create a factory function for a single element type, you can pass
it directly instead of an array.

## Example

Using `component` to create a `div` element:

```js
import React from 'react';
import { factory as domb, component } from 'domb';

component(React, 'div', { className: 'test' });
// => React.createElement('div', { className: 'test' });
```

Using `factory` to create a `div` element factory:

```js
const div = domb(React, 'div');
div({ className: 'test' });
// => React.createElement('div', { className: 'test' });
```

Using `factory` to create several element factories.

```js
const dom = domb(React, ['div', 'span']);
dom.div({ className: 'test' });
// => React.createElement('div', { className: 'test' });
dom.span({ className: 'test' });
// => React.createElement('span', { className: 'test' });
```

Supplying text content to an element:

```js
component(React, 'div', {
  className: 'test',
  content: 'A test div',
});
// => React.createElement('div', { className: 'test' }, 'A test div');
```

Supplying child elements to an element:

```js
const { div, p } = domb(React, 'div', 'p');

div({
  className: 'test',
  content: [
    p('Paragraph 1'),
    p('Paragraph 2'),
  ],
});
// => React.createElement('div', { className:'test' },
//      React.createElement('p', {}, 'Paragraph 1'),
//      React.createElement('p', {}, 'Paragraph 2'),
//    );
```

Using a functional component:

```js
function myView(props) {
  return div({ className:'test', content:props.label });
}

component(React, myView, { label:'Hello!' });
// => React.createElement(myView, { label:'Hello!' });

const dom = domb(React, myView);
dom.myView({ label:'Hello!' });
// => React.createElement(myView, { label:'Hello!' });
```

Using a class component:

```js
class MyView extends React.Component {
  render() {
    return div({ className:'test', content:this.props.label });
  }
}

component(React, MyView, { label:'Hello!' });
// => React.createElement(MyView, { label:'Hello!' });

const dom = domb(React, MyView);
dom.MyView({ label:'Hello!' });
// => React.createElement(MyView, { label:'Hello!' });
```

Using `key`s:

```js
function myView(props) {
  const { ul, li } = domb(React, 'ul', 'li');

  return ul({
    // When you need to supply keys, use `children`
    children: props.items.map(item => li({
      key: item.id,
      content: item.name,
    })),
  });
}

const dom = domb(React, myView);

dom.myView({
  items: [
    { id:0, name:'Item A' },
    { id:1, name:'Item B' },
    { id:2, name:'Item C' },
  ],
});
```
