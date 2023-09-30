#!/bin/bash

# Define the image name and tag you want to check
IMAGE_NAME="custom-cassandra-image"
IMAGE_TAG="3.7"

# Capture the result of the docker images command and grep
RESULTs=$(docker images "$IMAGE_NAME:$IMAGE_TAG" | grep -q "$IMAGE_NAME" && echo "true" || echo "false")

# Output the result
echo "$RESULTs"
