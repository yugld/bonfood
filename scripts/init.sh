#!/bin/sh

echo "\n\n\033[1m\033[32m Initializing new INIT project!\033[0m\n\n"

cd ./.setup

cp .env.example .env

#--------------------------------------------------
printf  "\033[33m Your project title \033[90m[\"INIT\"]: \033[0m"
read title

if [ -z "$title" ]; then
  title="Docker + WP CLI"
fi

perl -pi -e "s/WP_SITE_TITLE=/WP_SITE_TITLE=\"$title\"/" .env
#---------------------------------------------------

#--------------------------------------------------
printf  "\033[33m Your project scheme \033[90m[\"http\"]: \033[0m"
read scheme

if [ -z "$scheme" ]; then
  scheme="http"
fi

printf  "\033[33m Your project host \033[90m[\"localhost\"]: \033[0m"
read host

if [ -z "$host" ]; then
  host="localhost"
fi

printf  "\033[33m Your project port \033[90m[\"8081\"]: \033[0m"
read port

if [ -z "$port" ]; then
  port="8081"
fi

perl -pi -e "s/WP_SITE_URL=/WP_SITE_URL=$scheme:\/\/$host:$port/" .env
#---------------------------------------------------

#--------------------------------------------------
printf  "\033[33m WP admin login \033[90m[\"init\"]: \033[0m"
read login

if [ -z "$login" ]; then
  login="init"
fi

perl -pi -e "s/WP_ADMIN_USER=/WP_ADMIN_USER=\"$login\"/" .env
#---------------------------------------------------


#--------------------------------------------------
printf "\033[33m WP admin password \033[90m[\"Init145!\"]: \033[0m"
read password

if [ -z "$password" ]; then
  password="Init145!"
fi

perl -pi -e "s/WP_ADMIN_PASSWORD=/WP_ADMIN_PASSWORD=\"$password\"/" .env
#---------------------------------------------------


#--------------------------------------------------
printf "\033[33m WP admin email \033[90m[\"1001360@mail.ru\"]: \033[0m"
read email

if [ -z "$email" ]; then
  email="1001360\@mail.ru"
fi

perl -pi -e "s/WP_ADMIN_EMAIL=/WP_ADMIN_EMAIL=\"$email\"/" .env
#---------------------------------------------------

#--------------------------------------------------
printf "\033[33m Your project environment \033[90m[\"local\"]: \033[0m"
read environment

if [ -z "$environment" ]; then
  environment="local"
fi

perl -pi -e "s/WP_ENVIRONMENT=/WP_ENVIRONMENT=\"$environment\"/" .env
#---------------------------------------------------

echo UID=$(id -u) >> .env && echo GID=$(id -g) >> .env

echo "\n\n\033[1m\033[32m Successfull!!!\n\n Happy coding with INIT!\033[0m\n\n"
