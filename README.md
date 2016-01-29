# domb

A dumb wrapper around `React.createElement`.

Most wrappers stick to the 3 parameter signature that `React.createElement` uses
(type, attributes, content). I find that third parameter to be unwieldy, and
prefer it to just be another attribute.

## Usage

domb exports three functions:

### `el(React, type, attributes)`

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

### `dom(React, ...types)`

Creates factory functions that, when called, creates a new React element. This
is used to cut down on the boilerplate by providing nicely-named functions to
use directly in your components.

`React` is the React library.

`...types` is one or more element types.

If only a single type is given, the factory function will be returned directly.
If more than one type is given, an object will be returned with name-function
pairs. For string types, the name is the same as the string. For classes or
named functions, the key is their `name` propery.

### `elif(value, el)`

Sometimes it is useful to create a factory function that only renders its
element if a condition is met. This allows you to include the element in your
render tree, without any messy logic handling.

`value` is a boolean value.

`el` is a element factory function, as returned by `dom`.

## Examples

Using `el` to create a `div` element:

```js
import React from 'react';
import { el } from 'domb';

el(React, 'div', { className: 'test' });
// => React.createElement('div', { className: 'test' });
```

Using `dom` to create a `div` element factory:

```js
import React from 'react';
import { dom } from 'domb';

const div = dom(React, 'div');
div({ className: 'test' });
// => React.createElement('div', { className: 'test' });
```

Using `dom` to create several element factories.

```js
const { div, span } = dom(React, 'div', 'span');

div({ className: 'test' });
// => React.createElement('div', { className: 'test' });

span({ className: 'test' });
// => React.createElement('span', { className: 'test' });
```

Supplying text content to an element:

```js
el(React, 'div', {
  className: 'test',
  content: 'A test div',
});
// => React.createElement('div', { className: 'test' }, 'A test div');
```

Supplying child elements to an element:

```js
const { div, p } = dom(React, 'div', 'p');

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
function View(props) {
  return div({ className:'test', content:props.label });
}

el(React, View, { label:'Hello!' });
// => React.createElement(View, { label:'Hello!' });

const view = dom(React, myView);
view({ label:'Hello!' });
// => React.createElement(View, { label:'Hello!' });
```

Using a class component:

```js
class MyView extends React.Component {
  render() {
    return div({ className:'test', content:this.props.label });
  }
}

el(React, MyView, { label:'Hello!' });
// => React.createElement(MyView, { label:'Hello!' });

const myView = dom(React, MyView);
myView({ label:'Hello!' });
// => React.createElement(MyView, { label:'Hello!' });
```

Using `key`s:

```js
function View(props) {
  const { ul, li } = dom(React, 'ul', 'li');

  return ul({
    // When you need to supply keys, use `children`
    children: props.items.map(item => li({
      key: item.id,
      content: item.name,
    })),
  });
}

const view = domb(React, View);

view({
  items: [
    { id:0, name:'Item A' },
    { id:1, name:'Item B' },
    { id:2, name:'Item C' },
  ],
});
```

Using `elif`:

```js
function Profile({ user }) {
  const { div, img, a } = dom(React, 'div', 'img', 'a');

  const profileImage = elif(user.isLoggedIn, img);
  const loginLink = elif(!user.isLoggedIn, a);

  return div({
    className: 'profile',
    content: [
      profileImage({
        src: user.image,
      }),

      loginLink({
        href: '/login',
        content: 'Login',
      }),
    ],
  });
}
```
