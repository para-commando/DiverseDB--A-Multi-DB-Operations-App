# Running first node in background 
sudo docker run --name cassandra-node-1 -p 9046:9042 -d custom-cassandra-image:3.7
INSTANCE1=$(sudo docker inspect --format="{{ .NetworkSettings.IPAddress }}" cassandra-node-1)
echo "Instance 1: ${INSTANCE1}"

echo "Wait for 5 seconds please..."
sleep 5
# Running second node in background
sudo docker run --name cassandra-node-2 -p 9047:9042 -d -e CASSANDRA_SEEDS=$INSTANCE1 custom-cassandra-image:3.7
INSTANCE2=$(sudo docker inspect --format="{{ .NetworkSettings.IPAddress }}" cassandra-node-2)
echo "Instance 2: ${INSTANCE2}"

echo "Wait for 5 seconds please..."
sleep 5

# Running third node in background
# sudo docker run --name cassandra-node-3 -p 9048:9042 -d -e CASSANDRA_SEEDS=$INSTANCE1,$INSTANCE2 custom-cassandra-image:3.7
# INSTANCE3=$(sudo docker inspect --format="{{ .NetworkSettings.IPAddress }}" cassandra-node-3)
# echo "Instance 3: ${INSTANCE3}"
