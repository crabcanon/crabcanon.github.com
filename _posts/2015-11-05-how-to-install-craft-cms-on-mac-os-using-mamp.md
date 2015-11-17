---
layout: post
title: How to install Craft CMS on Mac OS using MAMP
date: 2015-11-05
categories: [CMS]
tags: [Craft CMS, MAMP, Sequel Pro]
---

Recently, I got a project which required me to set up Craft CMS on my local environment(Macbook Pro) in order for the further development of a web portal. Fortunately, because I had the experience with Wordpress(another very wildly used CMS as similar as Craft), it didn't take long to get everything ready. But still, I hope to provide a detailed instruction about how to set up Craft CMS on Mac OS by using MAMP and Sequel Pro.

Actually, [Craft's official installation tutorial](http://buildwithcraft.com/docs/installing) doesn't explain the whole process very precisely, therefore, it's really easy to make mistakes if you are a beginner. The following instruction will teach you what to do step by step and it will take around 30 mins to get everything done.

<hr>

**Prerequisites**

* Step 1 - Download and install [MAMP](https://www.mamp.info/en/): This is a integrated development environment which contains Apache server, MySQL databse, PHP/Python/Perl programming languages and a web portal for you to easily setup and maintain your application locally. Another similar one is called [XAMPP](https://www.apachefriends.org/zh_cn/index.html). Both are good for Craft CMS. But in this tutorial, my talk is based on MAMP.

* Step 2 - Download and install [Sequel Pro](http://www.sequelpro.com/): This is a GUI tool to manage your MySQL databases. If you download MAMP, this tool will be automatically bundled. Sequel Pro is a optional tool, it's not necessary in our tutorial.

* Step 3 - Download [Craft](http://buildwithcraft.com/): the downloaded package will be used later on.

<hr>

**Installation**

* <mark>Step 1 - Setup servers' preferences</mark>
	* Open MAMP (not MAMP Pro).
	* Click "Preferences".
	* Click "Ports" tab.
	* Click "Set Web & MySQL ports to 80 & 3306".
	* Click "OK".

* <mark>Step 2 - Connect to Apache server</mark> 
	* Click "Start Servers". Usually, a WebStart page will be automatically opened in your browser, but if not, you can click "Open WebStart page". The URL of this page is [http://localhost/MAMP/?language=English](http://localhost/MAMP/?language=English). If everything runs well, it means you have successfully start a local server on your computer. 

* <mark>Step 3 - Connect to MySQL server</mark> 
	* Open Sequel Pro.
	* Host: 127.0.0.1 -> Username: root -> Password: root -> Port: 3306
	* Click "Add to favourite" button so that you don't need to fill this form again next time.
	* Click "Connect". If you don't install Sequel Pro, in the WebStart page, there is a tab called "Tools" in the header, click "phpMyAdmin", and then you can do all the things as what you can do with Sequel Pro. 

* <mark>Step 4 - Create a new database</mark> 
	* Click "Add Database".
	* Name your database, for example "mycraft".
	* The "Collation" or so called "Database Encoding" should be "utf8_unicode_ci".
	* Click "Create".

* <mark>Step 5 - Upload craft's files</mark> 
	* Unzip your craft package which was downloaded in the Prerequisites phase. There will be two folders "craft/" and "public/" inside.
	* Copy "craft/" folder to /Applications/MAMP(the root directory of your MAMP application, don't copy it to the "htdocs/" folder).
	* Copy the files htaccess, index.php and robots.txt from "public/" to "htdocs/" folder.

* <mark>Step 6 - Rename htaccess to .htaccess</mark> 
	* Please notice your Mac OS doesn't allow you to do this in Finder. Instead, you have to do it in Terminal. 
	* Open Terminal.
	* Run command `cd /Applications/MAMP/htdocs` (please remember to add the slash "/" before "Applications").
	* Run command `defaults write com.apple.finder AppleShowAllFiles -bool true` (show hidden files in Finder).
	* Relaunch Finder.
	* Run command `mv htaccess .htaccess`.
	* Run command `defaults write com.apple.finder AppleShowAllFiles -bool false` (hide hidden files in Finder).
	* Relaunch Finder.

* <mark>Step 7 - Set access permissions</mark> 
	* Open Terminal.
	* Run command `cd /Applications/MAMP/craft`.
	* Run `chmod -R 744 app` (set permission 744 to "app" folder).
	* Run command `chmod -R 744 config` (set permission 744 to "config" folder).
	* Run command `chmod -R 744 storage` (set permission 744 to "storage" folder).

* <mark>Step 8 - Config your craft databse</mark> 
	* Copy "craft/app/etc/config/defaults/db.php" into "craft/config/db.php".
	* Open this file in your favorite text editor.
	* server: localhost -> user: root -> password: root -> database: mycraft (the name of your database) -> tablePrefix: craft.

* <mark>Step 9 - Run the installer</mark> 
	* The URL is [http://localhost/admin](http://localhost/admin).
	* Follow the step 5 in [craft's official documentation](http://buildwithcraft.com/docs/installing).

Congratulations! 

<hr>

**What's more?**

Sometimes, you may not start from the beginning in development, for example, your project has started for a while and other developers have created a bunch of staff based on the original code package and have updated MySQL database, then your boss tells you to set up the development environment from this middle phase. What are you going to do? Usually, you will get a database dump (a .sql file) and one complete code package. The following instruction will tell you how to handle this kind situation.

* <mark>Step 1 - Upload files</mark> 
	* Unzip your code package and copy it to /Applications/MAMP folder (the root folder of MAMP).

* <mark>Step 2 - Configure the root of Apache server</mark> 
	* Open MAMP.
	* Click "Preferences".
	* Click "Web Server" tab.
	* Re-select the root directory of your MAMP. For example, in step 1, you have put your code package to MAMP folder whose name is "project-craft", then you should select the root directory to /Applications/MAMP/project-craft/public.
	* Click "OK".

* <mark>Step 3 - Upload the database dump</mark> 
	* Open Sequel Pro.
	* Choose your craft databse.
	* Click "File" from your computer's header bar.
	* Click "Import".
	* Select your database dump file and upload it.

* <mark>Step 4 - Rename the host name</mark> 
	* Sometimes, because other developers have defined a unified baseURL for the development use, you have to customize the name of your baseURL as well, which means it couldn't be "localhost" or "127.0.0.1" anymore. Therefore, what you need to do is to edit the HOST file of your Mac OS system. 
	* Open Terminal.
	* Run command `cd /etc`.
	* Run command `sudo vim hosts` and input password.
	* Move the cursor to the line where "127.0.0.1" is.
	* Press "o" (insert a new line).
	* Input "127.0.0.1    local.project.com" (for example, you want to rename "127.0.0.1" to "local.project.com").
	* Press "esc".
	* Press "shift + :".
	* Input "wq!". 

* <mark>Step 5 - Start servers</mark> 
	* Open MAMP and click "Start Servers". 

* <mark>Step 6 - Run your Craft application</mark> 
	* In your browser, input url "http://local.project.com/admin".

Congratulations! 




