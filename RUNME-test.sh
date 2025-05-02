#!/bin/sh

docker-compose -p code-and-pepper-test --file docker-compose.test.yml up --renew-anon-volumes --no-attach code-and-pepper-test-mongo --no-log-prefix --abort-on-container-exit

# docker-compose --file docker-compose.test.yml down
