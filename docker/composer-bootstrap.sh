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

# Display the installed Node.js and npm versions
echo "Installed PHP version: $(php -v | awk 'NR==1 {print $2}')"
echo "Installed Composer version: $(composer -V | awk 'NR==1 {print $3}')"

composer -d ./.setup/ install > /dev/null 2>&1

if [ -d "./.setup/vendor" ]; then
    chown -R $_UID:$_GID ./.setup/vendor
    echo "Composer dependencies installation completed";
fi


echo "Composer dependencies installation completed";

