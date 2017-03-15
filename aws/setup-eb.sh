set -e

mkdir /home/ubuntu/.aws
touch /home/ubuntu/.aws/config
chmod 600 /home/ubuntu/.aws/config
echo "[default]" > /home/ubuntu/.aws/config
echo "aws_access_key_id=$AWS_ACCESS_KEY_ID" >> /home/ubuntu/.aws/config
echo "aws_secret_access_key=$AWS_SECRET_ACCESS_KEY" >> /home/ubuntu/.aws/config
echo "region = us-east-1" >> /home/ubuntu/.aws/config
cp /home/ubuntu/.aws/config /home/ubuntu/apester-destination-client/aws/credentials
