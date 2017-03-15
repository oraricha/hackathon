#! /bin/bash

EB_BUCKET=elasticbeanstalk-us-east-1-148612970729
DOCKERRUN_FILE=development-Dockerrun.aws.json

# Delete old version if exists
aws elasticbeanstalk delete-application-version --application-name apester-destination-client \
    --version-label development --delete-source-bundle

# Create new Elastic Beanstalk version
sed "s/<TAG>/development/" < Dockerrun.aws.json.template > $DOCKERRUN_FILE
aws s3 cp $DOCKERRUN_FILE s3://$EB_BUCKET/$DOCKERRUN_FILE

aws elasticbeanstalk create-application-version --application-name apester-destination-client \
    --version-label development --source-bundle S3Bucket=$EB_BUCKET,S3Key=$DOCKERRUN_FILE
