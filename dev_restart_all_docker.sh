#!/bin/bash

# Set the -e option
set -e

sudo rm -rf .data/
docker system prune -af --volumes

npm run-script codegen
npm run-script build
npm run-script start:docker