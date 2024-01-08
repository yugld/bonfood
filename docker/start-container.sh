#!/bin/bash

usermod -u $_UID www-data && \
groupmod -g $_GID www-data && \
usermod -aG www-data www-data

sudo chown -R www-data:www-data /var/www/html/www/

while ! nc -z $WORDPRESS_DB_HOST $WORDPRESS_DB_PORT; do
    echo "Waiting for Database to be up..."
    sleep 2
done

if [ ! -f /var/www/html/www/wp-config.php ]; then

    echo "Configuring WordPress..."

    # Configure and install WordPress
    sudo -u www-data wp core config --path=/var/www/html/www/ --dbname=$WORDPRESS_DB_NAME --dbuser=$WORDPRESS_DB_USER --dbpass=$WORDPRESS_DB_PASSWORD --dbhost=$WORDPRESS_DB_HOST
    sudo -u www-data wp core install --url=$WP_SITE_URL --title="$WP_SITE_TITLE" --admin_user=$WP_ADMIN_USER --admin_password=$WP_ADMIN_PASSWORD --admin_email=$WP_ADMIN_EMAIL

    sudo -u www-data wp plugin delete akismet                 # Удаляем плагин akismet
    sudo -u www-data wp plugin delete hello                   # Удаляем плагин hello

    sudo -u www-data wp plugin install cyr2lat --activate     # Устанавливаем и активируем cyr2lat
    sudo -u www-data wp theme activate $PROJECT
    # sudo -u www-data wp theme delete --all

    # Запускаем подготовку WordPress
    wp-bootstrap
fi

original_dir=$(pwd)
cd /var/www/html/www
sudo -u www-data wp option update home $WP_SITE_URL
sudo -u www-data wp option update siteurl $WP_SITE_URL
cd "$original_dir"

bash node-bootstrap &
bash composer-bootstrap &

echo "127.0.0.1 $SERVER_NAME" | tee -a /etc/hosts

PORT=$(echo "$WP_SITE_URL" | cut -d ':' -f 3)
if [ -z "$PORT" ]; then
  PORT=80
fi

if [ "$PORT" -ne 80 ]; then
  echo "SOKAT LISTEN: $PORT & FORK $SERVER_NAME:80"
  socat TCP-LISTEN:$PORT,fork TCP:$SERVER_NAME:80 &
fi


php-fpm8.2 && chmod 666 /run/php/php8.2-fpm.sock &

export DOLLAR="$"
envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

echo "Server is starting with name $SERVER_NAME..."
nginx -g "daemon off;"
