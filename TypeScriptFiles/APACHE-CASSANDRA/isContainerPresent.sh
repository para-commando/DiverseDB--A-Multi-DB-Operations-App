# ooo=$(./isImagePresent.sh)
# echo "$ooo"

IMAGE_NAME="cassandra-node-1"

# Capture the result of the docker images command and grep
RESULTs=$(docker ps -a | grep -q "$IMAGE_NAME" && echo "true" || echo "false")

echo "$RESULTs"