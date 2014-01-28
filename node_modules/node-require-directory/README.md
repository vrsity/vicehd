# Require Directory

Simple. Recursively iterates over a directory and require all files, returning a nested hash structure of all files. Only requires CoffeeScript and JS files.

Hat tip to [require-directory](https://github.com/TroyGoode/node-require-directory). I just needed something simpler.

```
npm install node-require-directory
```

[![build status](https://secure.travis-ci.org/Radagaisus/node-require-directory.png)](http://travis-ci.org/Radagaisus/node-require-directory)


```coffee
assert = require 'assert'
require_directory = require '../index'
example_directory = './test/example'

describe 'require-directory', ->
	# This is the directory structure:
	#   example/
	#     - hello.coffee
	#     - hi.coffee
	#     - nested/
	#       - bleep.coffee
	#       - index.coffee
	#       - triple
	#         - yeah.coffee
	#         - index.coffee
	#
  it 'should work', ->
    dir = require_directory(example_directory)
		assert.equal dir.hello, 'world',
		assert.equal dir.hi, 'you',
		assert.equal dir.nested.bleep, 'boop'
		assert.equal dir.nested.triple.yeah, 'woo'
		assert.equal dir.nested.get, 'bloop'
		assert.equal dir.nested.triple.index, 'hello'
		assert.equal dir.nested.DS_Store, undefined
		assert.equal dir.nested.unknown_weird_file, undefined
```