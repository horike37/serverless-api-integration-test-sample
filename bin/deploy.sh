#!/bin/bash
set -e
BRANCH=${TRAVIS_BRANCH:-$(git rev-parse --abbrev-ref HEAD)}
if [[ $TRAVIS_TAG ]]; then
  STAGE="production"
elif [[ $BRANCH == 'development' ]]; then
  STAGE="development"
fi
if [ -z ${STAGE+x} ]; then
  echo "Not deploying changes";
  exit 0;
fi
echo "Deploying from branch $BRANCH to stage $STAGE"
npm prune --production  #remove devDependencies
sls deploy --stage $STAGE --region $AWS_REGION
