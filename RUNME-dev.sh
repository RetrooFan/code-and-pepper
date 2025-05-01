#!/bin/sh

docker-compose up --renew-anon-volumes -d
# docker attach code-and-pepper-node

# docker stop code-and-pepper-node code-and-pepper-mongo
# docker-compose down
