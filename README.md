Green Lantern Frontend
======================

Green Lantern PHP Frontend Project


OSX Start-up
------------
```
LoadModule php5_module    /usr/local/opt/php54/libexec/apache2/libphp5.so

install brew
brew tap homebrew/dupes
brew tap josegonzalez/homebrew-php
brew install php54 --with-pgsql --with-tidy
brew install php54-intl
brew install php54-apc

chmod -R ug+w /usr/local/Cellar/php54/5.4.11/lib/php
pear config-set php_ini /usr/local/etc/php/5.4/php.ini

/usr/local/etc/php/5.4/php.ini

add under [PHP]
  detect_unicode = Off

replace: 
  ;date.timezone =
with:
  date.timezone = 'America/Chicago'


curl -s https://getcomposer.org/installer | php


php app/check.php
# Make sure everything comes back OK
```

Ubuntu Start-up
---------------
```
sudo apt-get install apache2
sudo apt-get install php5
sudo apt-get install libapache2-mod-php5
sudo apt-get install php-intl
sudo apt-get install php-apc
sudo apt-get install php-pear
pear config-set php_ini /etc/php5/apache2/php.ini

```

Change PHP settings in both ini files: 
 /etc/php5/apache2/php.ini  AND  /etc/php5/cli/php.ini

```
add under [PHP]
  detect_unicode = Off

replace: 
  ;date.timezone 
with:
  date.timezone = 'America/Chicago'
```
Point your vhost directory to /web and enable mod_rewrite for shorter urls:
```
a2enmod rewrite

#edit /etc/apache2/sites-available/default

<Directory atlas_ui/web/ >
AllowOverride All
```
Install Composer and install dependencies
```
sudo service apache2 restart
curl -s https://getcomposer.org/installer | php

#in atlas_ui dir:
php composer.phar install
php app/check.php
# Make sure everything comes back OK
```
Allow apache to write to cache and logs
```
chmod -R 777 app/cache/
chmod -R 777 app/logs/
```

parameters.yml
--------------
By default, Symfony requires the config file /app/config/parameters.yml to be present and populated.  
If you are setting up on your local machine, you can generate this file by walking through the configuration at: http://localhost/config.php  
However, if you are setting up remotely, you cannot access config.php, so you should either:
* copy it from your local machine and edit it
* add YOUR_IP in config.php so you can access it remotely:
```
if (!in_array(@$_SERVER['REMOTE_ADDR'], array(
    '127.0.0.1', '<YOUR_IP>',
    '::1',
))) {
    header('HTTP/1.0 403 Forbidden');
    exit('This script is only accessible from localhost.');
}
```


Installing bundle assets
------------------------
Run this command to create a symlink to the assets within the bundles (img, js, css) 
```
php app/console assets:install web --symlink
```

If the OS doesn't support symlink, make a copy of the assets by leaving off --symlink
(You will have to do this every time the assets change)
```
php app/console assets:install web
```

Clearing the Symfony cache
--------------------------
If pages aren't refreshing properly, you'll need to clear Symfony's cache:
```
symfony cc
```
If you can't get this command to work for some reason, you can manually delete the cache files in /app/cache

Alternatively:
```
php app/console cache:clear --env=[dev, prod]
```

Including Atlas Squidget
--------------------------
You will need to checkout the Atlas Squidget code in the path:
```
git clone git@github.com:turbosquid/atlas.git src/Atlas/GalleryBundle/Resource/public/js/atlas
```

Without the Squidget code you will have errors in the product pages

