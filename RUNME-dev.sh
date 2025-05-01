#!/bin/sh

docker-compose -p code-and-pepper-dev --file docker-compose.dev.yml up --renew-anon-volumes -d
docker attach code-and-pepper-dev-node

# docker stop code-and-pepper-dev-node code-and-pepper-dev-mongo
# docker-compose down
