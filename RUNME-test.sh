#!/bin/sh

docker-compose -p code-and-pepper-test --file docker-compose.test.yml up --renew-anon-volumes -d
docker attach code-and-pepper-test-node
docker stop code-and-pepper-test-mongo

# docker-compose --file docker-compose.test.yml down
