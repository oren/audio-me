# Compile the client side javascript
client:
	browserify client/index.js > static/bundle.min.js

client/watch:
	./scripts/watch client/ 'make client'

.PHONY: client
