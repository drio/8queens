GIST=1097480
PWD=$(shell pwd)
RDIR="public_html/tmp/8queens"
GOOGL=http://goo.gl/3oGir
PWD=$(shell pwd)

include make.include
URL=http://$(HOST)/tmp/coverage.$(GIST)

all:

publish:
	@echo "Transferring to is04607 ..."
	ssh $(USER)@$(HOST) "rm -rf $(RDIR)"
	ssh $(USER)@$(HOST) "mkdir $(RDIR)"
	scp -q -r * $(USER)@$(HOST):$(RDIR)/
	@echo "--> http://$(HOST)/tmp/8queens"
	@echo "--> GOO.GL: $(GOOGL)"
	@echo ""

.PHONY: publish
