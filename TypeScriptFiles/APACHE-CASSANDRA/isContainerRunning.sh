# ooo=$(./isImagePresent.sh custom-cassandra-image "3.7")
# echo "$ooo"


# Capture the result of the docker images command and grep
RESULTs=$(sudo docker ps | grep -q "$IMAGE_NAME" && echo "true" || echo "false")

echo "$RESULTs"