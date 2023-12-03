# ooo=$(./isImagePresent.sh)
# echo "$ooo"
IMAGE_NAME="${1:-cassandra-node-1}"

 
# Capture the result of the docker images command and grep
RESULTs=$(sudo docker ps -a | grep -q "$IMAGE_NAME" && echo "true" || echo "false")

echo "$RESULTs"