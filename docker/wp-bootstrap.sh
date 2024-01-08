#!/bin/bash

main_page="home"

#
# Создание "Главнаой страницы"
#
# Проверяем существует ли Главная страница если нет создаем ее!
#
if sudo -u www-data wp post list --post_type=page --name=$main_page --format=count | grep -q '0'; then
    sudo -u www-data wp post create --post_type=page --post_name=$main_page --post_title="Главная страница" --post_status="publish"
    echo "##### Cтраница \"$main_page\" создано #####"
else
    echo "##### Cтраница \"$main_page\" уже есть #####"
fi

#
# Удаляем "Пример страницы" если есть
#
if sudo -u www-data wp post list --post_type=page --name="sample-page" --format=count | grep -q '1'; then
    sudo -u www-data wp post delete $(sudo -u www-data wp post list --post_type=page --name="sample-page" --field=ID)
    echo "##### "sample-page" Удален #####"
else
    echo "##### "sample-page" страницы нет #####"
fi





#
# Удаляем все посты
#
# Проверяем существуют ли посты если да удаляем их!
#
if [ -n "$(sudo -u www-data wp post list --post_type=post --format=ids)" ]; then
    sudo -u www-data wp post delete $(sudo -u www-data wp post list --post_type=post --format=ids)
    echo "##### Посты удалены #####"
else
    echo "##### Нет постов для удаления #####"
fi





#
# Устанавливает Cтатическую страницу на главной
#
sudo -u www-data wp option update show_on_front page
echo "##### Установлено отображение статической страницы на главной #####"

# Устанавливает ID главной страницы
if [ -n "$(sudo -u www-data wp post list --name=$main_page --post_type=page --format=ids)" ]; then
    sudo -u www-data wp option update page_on_front $(sudo -u www-data wp post list --name=$main_page --post_type=page --format=ids)
    echo "##### Статическая страница \"$main_page\" обновлена #####"
else
    echo "##### Статической страницы \"$main_page\" нет #####"
fi





#
# Обновляем структуру постоянных ссылок
#
sudo -u www-data wp option update permalink_structure '/%postname%/'
echo "##### Структуру постоянных ссылок обновлено #####"





#
# Удаляем все виджеты
#
sudo -u www-data wp widget reset --all
echo "##### Все виджеты удалены #####"





#
# Создаем Main Menu
#
sudo -u www-data wp menu create "Menu Main"
echo "##### "Menu Main" создано #####"

# Выбираем область отображения
sudo -u www-data wp menu location assign "Menu Main" primary
echo "##### Для "Menu Main" выбрана область отображения "primary" #####"

# Добавляем главную страницу
sudo -u www-data wp menu item add-post "Menu Main" $(sudo -u www-data wp post list --post_type="page" --name="home" --field=ID)
echo "##### Добавлена Главная страница для "Menu Main" #####"





# Выводим успех
echo "##### wp-bootstrap завершена успешно! #####"
