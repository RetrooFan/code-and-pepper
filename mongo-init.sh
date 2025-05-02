#!/bin/sh

sleep 5 && mongosh --eval rs.initiate\(\) &

mongod --bind_ip_all --replSet dbrs
