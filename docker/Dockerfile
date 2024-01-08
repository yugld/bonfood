# Используем официальный образ WordPress с Nginx
FROM nginx:latest

# Возвращаемся в рабочую директорию WordPress
WORKDIR /var/www/html/www/

# Обновляем пакеты и устанавливаем зависимости
RUN apt-get update && apt-get install -y \
    wget \
    less \
    unzip \
    curl \
    nano \
    sudo \
    socat \
    netcat-traditional \
    default-mysql-client \
    php-mysqli \
    php8.2-fpm \
    php8.2-curl \
    php8.2-xml \
    php-pear \
    php8.2-dev \
    php8.2-mbstring \
    php8.2-zip \
    php8.2-gd \
    php8.2-intl \
    php8.2-imagick \
    php-xdebug && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


# Установка wp-cli
RUN wget https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar -O /usr/local/bin/wp && \
    chmod +x /usr/local/bin/wp

# Создание директории для установки WordPress и установка прав доступа
RUN wp core download --path=/var/www/html/www/ --locale=ru_RU --allow-root

# Установка Composer
RUN wget https://getcomposer.org/installer -O - -q | php -- --install-dir=/usr/local/bin --filename=composer

# Установка NVM
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash && \
    export NVM_DIR="$HOME/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    nvm install 18.18.2 && nvm use 18

# Конфигурация Nginx
COPY ../.setup/nginx.conf /etc/nginx/nginx.conf.template

RUN sed -i 's/;clear_env = no/clear_env = no/' /etc/php/8.2/fpm/pool.d/www.conf
RUN echo 'security.limit_extensions = .php .jpeg .jpg .png .webp' >> /etc/php/8.2/fpm/pool.d/www.conf

COPY ./docker/start-container.sh /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/start-container

COPY ./docker/wp-bootstrap.sh /usr/local/bin/wp-bootstrap
RUN chmod +x /usr/local/bin/wp-bootstrap

COPY ./docker/node-bootstrap.sh /usr/local/bin/node-bootstrap
RUN chmod +x /usr/local/bin/node-bootstrap

COPY ./docker/composer-bootstrap.sh /usr/local/bin/composer-bootstrap
RUN chmod +x /usr/local/bin/composer-bootstrap

# Запуск PHP-FPM и Nginx
ENTRYPOINT [ "start-container" ]
