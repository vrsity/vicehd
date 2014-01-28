# grunt-minjson

> A Grunt plugin to minify and concat JSON files.

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-minjson --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-minjson');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## The "minjson" task

### Usage Examples

```js
grunt.initConfig({
  minjson: {
    compile: {
      files: {
        // Minify one json file
        'one.min.json': 'one.json',
        // Concat/minify one.json and all json files within the data folder
        // If more than one json file is matched, json will be wrapped in brackets []
        'all.min.json': ['one.json', 'data/*.json']
      }
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][].

## Release History

* 0.1.1 Support for Grunt v0.4.
* 0.1.0 Initial release.
