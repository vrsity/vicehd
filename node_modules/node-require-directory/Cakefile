{spawn, exec} = require 'child_process'

task 'build', ->
	run 'coffee -c *.coffee test/**/*.coffee'

# run spawns a bash process, sends it a
# command and hooks its stdout and sterr
# to the current process. We use this in
# our Cakefile.
# 
# Parameters are used based on their type:
# - string   - is the command
# - object   - options passed to spawn
# - array    - joined with spaces to form a
#              command
# - function - callback to invoke if the
#              process completed successfully
# 
# Usage:
#   run "echo hi", ->
#     run "echo bye"
#   > hi
#   > bye
#   
module.exports = run = (args...) ->
  for a in args
    switch typeof a
      when 'string' then command = a
      when 'object'
        if a instanceof Array then params = a
        else options = a
      when 'function' then callback = a
  
  command += ' ' + params.join ' ' if params?
  cmd = spawn '/bin/sh', ['-c', command], options
  cmd.stdout.on 'data', (data) -> process.stdout.write data
  cmd.stderr.on 'data', (data) -> process.stderr.write data
  process.on 'SIGHUP', -> cmd.kill()
  cmd.on 'exit', (code) -> callback() if callback? and code is 0

