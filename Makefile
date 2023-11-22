##############################
# Instale Node 
##############################
node:
	npm install

##############################
# Run all Tests
##############################
test:
	npm run test

##############################
# Open Reporter
##############################
report:
	npm run allure:generate-open

##############################
# Run Prettier
##############################
prettier:
	px prettier . --write