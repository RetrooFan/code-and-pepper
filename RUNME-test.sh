#!/bin/sh

docker-compose -p code-and-pepper-test --file docker-compose.test.yml up --renew-anon-volumes -d
docker attach code-and-pepper-node-test
docker stop code-and-pepper-mongo-test

# docker-compose --file docker-compose.test.yml down
