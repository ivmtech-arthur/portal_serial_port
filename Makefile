up:
	docker-compose up app
build:
	docker-compose up --build --force-recreate app
sh:
	docker-compose exec app sh
stop:
	docker-compose stop app
down:
	docker-compose down
restart:
	make down; make up
logs:
	docker-compose logs -f app
eslint:
	docker-compose run --rm app npm run eslint
npm-i:
	docker-compose run --rm app npm install
clear:
	rm -Rf ./app/.next
init-auto-lint:
	cd ./app; npx mrm lint-staged
up-s:
	docker-compose -f docker-compose.staging.yml up -d app
up-p:
	docker-compose -f docker-compose.prod.yml up -d app
build-s:
	docker-compose -f docker-compose.staging.yml up --build --force-recreate -d app
build-p:
	docker-compose -f docker-compose.prod.yml up --build --force-recreate -d app

