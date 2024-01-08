#!/bin/bash

if [ "$WP_ENVIRONMENT_TYPE" != "local" ]; then
    exit 0
fi

. ~/.bashrc

if [ -z "$BASH" ]; then # here, if not running in bash
    echo "This script is not running in a Bash shell."
    exit 0
fi

cd /var/www/html/dev

# Read the Node.js version from the .nvmrc file
nvmrc_version=$(cat ./.setup/.nvmrc)

# Get the major version of the currently installed Node.js
installed_version=$(node -v | cut -d "v" -f 2 | cut -d "." -f 1)

# Get the major version from the .nvmrc file
nvmrc_major_version=$(echo $nvmrc_version | cut -d "v" -f 2 | cut -d "." -f 1)

# Check if the major version in .nvmrc is greater than the installed major version
if [ $nvmrc_major_version -gt $installed_version ]; then
    echo "Node.js major version in .nvmrc is greater than the installed version."
    echo "Installing and using Node.js $nvmrc_version..."
    nvm install $nvmrc_version
    nvm use $nvmrc_version
else
    echo "Node.js major version in .nvmrc is compitable with the installed version."
fi

# Display the installed Node.js and npm versions
echo "Installed Node.js version: $(node -v)"
echo "Installed npm version: $(npm -v)"

echo "INSTALLING NPM DEPENDENCIES"

npm install

if [ -d "./node_modules" ]; then
  chown -R $_UID:$_GID ./node_modules
else
  echo "./node_modules NOT FOUND IN $(pwd)"
  exit 1;
fi

echo "BUILDING VITE"

npm run build

# chown all directories named "bundle". except "node_modules" and ".setup"
find . -type d -name 'bundle' -not \( -path './node_modules' -prune \) -not \( -path './.setup' -prune \) -exec chown -R $_UID:$_GID {} +

if [ "$WATCH" = "true" ]; then
    echo "RUNNING VITE IN DEV"
    npm run dev &
fi

echo "RUNNING SSR SERVER"
npm run ssr:start &

