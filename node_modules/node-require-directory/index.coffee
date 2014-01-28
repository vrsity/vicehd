fs = require 'fs'
{join, resolve, basename} = require 'path'

module.exports = require_directory = (directory) ->
	directory = resolve(directory)
	fs.readdirSync(directory).reduce (hash, file) ->
		file_path = join(directory, file)
		file_name = file.substring(0, file.lastIndexOf('.'))
		file_extension = file.substring(file.lastIndexOf('.'))
		if fs.statSync(file_path).isDirectory()
			hash[basename(file_path)] = require_directory(file_path)
		else
			if file_extension not in ['.coffee', '.js']
				return hash
			else if file_name is 'index' and typeof require(file_path) is 'object'
				for key, value of require(file_path)
					hash[key] = value
			else
				hash[file_name] = require(file_path)
		return hash
	, {}