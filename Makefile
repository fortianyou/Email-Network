
# This is the makefile to build netseer.js library, netseer.min.js is the space-squeezed version
# The process is: 1) use smash (a node.js app written by D3 author)
# to create netseer.js, based on package.json,neteer.js in ./src and index.js in all subdirectories
# 2) use uglifyjs to further remove the space

GENERATED_FILES = \
	netseer.js \
	netseer.min.js

all: $(GENERATED_FILES)

.PHONY: clean all test

test:
	@npm test

src/start.js: package.json bin/start
	bin/start > $@

netseer.js: $(shell node_modules/.bin/smash --ignore-missing --list src/netseer.js) package.json
	@rm -f $@
	node_modules/.bin/smash src/netseer.js | node_modules/.bin/uglifyjs - -b indent-level=2 -o $@
	@chmod a-w $@

netseer.min.js: netseer.js bin/uglify
	@rm -f $@
	bin/uglify $< > $@

%.json: bin/% package.json
	@rm -f $@
	bin/$* > $@
	@chmod a-w $@

clean:
	rm -f -- $(GENERATED_FILES)
