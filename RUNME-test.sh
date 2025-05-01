#!/bin/sh

docker-compose --file docker-compose.test.yml up --renew-anon-volumes --abort-on-container-exit

# docker-compose --file docker-compose.test.yml down
