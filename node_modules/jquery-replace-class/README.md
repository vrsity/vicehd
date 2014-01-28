[![Build Status](https://travis-ci.org/moudy/jquery-replace-class.png)](https://travis-ci.org/moudy/jquery-replace-class)

# jQuery.replaceClass

Remove one or more classes that match a string or regular expression and optionally add a class. Usefull when you need to swap out classes the have the same prefix like `$('#el').replaceClass(/^animate-/, 'animate-out');`.

### Install
```
npm install jquery-replace-class
```

### Usage
``` js
// inject jQuery so it can add the replaceClass function to jQuery.fn
require('jquery-replace-class')(jQuery);

$('#el').replaceClass('foo', 'bar');
$('#el').replaceClass(/^f/, 'bar');

// Or just remove any class starting with 'f'
$('#el').replaceClass(/^f/);
```
