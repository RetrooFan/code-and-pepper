#!/bin/sh

docker-compose -p code-and-pepper-dev --file docker-compose.dev.yml up --renew-anon-volumes --no-attach code-and-pepper-dev-mongo --no-log-prefix

# docker-compose --file docker-compose.dev.yml down
