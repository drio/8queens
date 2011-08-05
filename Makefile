GIST=1097480
PWD=$(shell pwd)
URL=http://is04607.com/tmp/coverage.$(GIST)
RDIR="public_html/tmp/8queens"
GOOGL=http://goo.gl/FAlbO

PWD=$(shell pwd)

all:

publish:
	@echo "Transferring to is04607 ..."
	ssh drio@is04607.com "rm -rf $(RDIR)"
	ssh drio@is04607.com "mkdir $(RDIR)"
	scp -q -r * drio@is04607.com:$(RDIR)/
	@echo "--> http://is04607.com/tmp/8queens"
	@echo "--> GOO.GL: $(GOOGL)"
	@echo ""

.PHONY: publish
