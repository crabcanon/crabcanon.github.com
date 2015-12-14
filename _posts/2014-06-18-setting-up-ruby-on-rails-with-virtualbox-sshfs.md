---
layout: post
title: Setting up Ruby on Rails with VirtualBox & SSHFS
date: 2014-06-18
categories: [Development Environment]
tags: [Ubuntu Server, Ruby on Rails, MySQL, VirtualBox, SSHFS]
---

###1. Introduction

As a web developer, setting up your own local development environment is the first issue that you have to resolve before the truly start. In many cases, we have to deal with different types of tech-stacks, for example, the most popular MEAN(MongoDB, Express, AngularJS & Node.js), React-fullstack(React.js, Redux, Express, MongoDB, Babel, Webpack, etc.), LAMP(Apache, MySQL & PHP), LEMP(Nginx, MySQL & PHP-FPM), Ruby on Rails and so on. Actually, most top cloud platforms nowadays have provided very easy to use "cloud launcher" that allows you to deploy apps with just a few clicks or commands. For example, [Google Cloud Platform - Cloud Launcher](https://cloud.google.com/launcher/?cat=INFRASTRUCTURE), [AWS Marketplace - Application Development](https://aws.amazon.com/marketplace/b/2649279011/ref=gtw_navlft_node_2649279011?page=1&category=2649279011), [Heroku Platform - Buildpacks](https://elements.heroku.com/buildpacks) and [DigitalOcean - DISTROS & 1-CLICK APPS](https://www.digitalocean.com/features/one-click-apps/). However, in some cases, you still have to setup everything from the beginning in your local computer for some reasons, for example, if you are not going to launch apps on above cloud platforms. In this tutorial, I will show you how to setup a complete development environment for an existing Ruby on Rails webapp (the full-stack is: Ruby on Rails, MySQL, Apache and Ubuntu Server) on Mac OS. 


###2. Step by step

####2.1. Part One - Install and start Ubuntu Server on VirtualBox

* Download [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
* Download [Ubuntu Server](http://www.ubuntu.com/download/server)
* Install Ubuntu Server ISO image on VirtualBox by following [video one](https://www.youtube.com/watch?v=HjuazgdyAdc) or [video two](https://www.youtube.com/watch?v=MaAqAx77COM)
* Start Ubuntu Server on VirtualBox

####2.2. Part Two - Install dependencies on Ubuntu Server

* Install [Git](https://git-scm.com/)

{% highlight bash %}
$ sudo apt-get install git-core configuration
$ git config —global user.email "your email"
$ git config —global user.name "your username"
{% endhighlight %}

* Clone the remote app repository and switch to the target branch

{% highlight bash %}
$ mkdir repository
$ cd repository
$ git clone your-username@server-url.git
$ git fetch --all
$ git checkout -b <branch> --track <remote>/<branch>
{% endhighlight %}

* Install [Ruby on Rails](http://rubyonrails.org/)

{% highlight bash %}
$ sudo apt-get update
$ sudo apt-get install curl
$ \curl -L https://get.rvm.io | bash -s stable
$ source ~/.rvm/scripts/rvm
$ rvm requirements
$ rvm install ruby
$ rvm use ruby —default
$ rvm rubygems current
$ sudo apt-get install build-essential
$ sudo apt-get install ruby-dev
$ gem install rails
{% endhighlight %}

* Install [MySQL](https://www.mysql.com/) & MySQL client development libraries

{% highlight bash %}
$ sudo apt-get install mysql-client mysql-server
$ sudo apt-get install libmysqlclient-dev
{% endhighlight %}

* Install [ZeroMQ](http://zeromq.org/) lightweight messaging kernel

{% highlight bash %}
$ sudo apt-get install libzmq-dev
{% endhighlight %} 

* Install [Node.js](https://nodejs.org/en/)

{% highlight bash %}
$ sudo apt-get install nodejs
$ sudo ln -s /usr/bin/nodejs /usr/bin/node
{% endhighlight %} 

* Install [Emacs](https://www.gnu.org/software/emacs/manual/html_node/emacs/index.html)

{% highlight bash %}
$ sudo apt-get install emacs
{% endhighlight %} 

* Install and Configure [Apache2 Web Server](https://help.ubuntu.com/lts/serverguide/httpd.html)

{% highlight bash %}
$ sudo apt-get install apache2
$ sudo a2enmod rewrite
$ sudo rm /etc/apache2/sites-enabled/*
$ cd repository/your-repository-name
$ sudo cp apache/your-apache-configure-file /etc/apache2/sites-available/
$ sudo ln -s /etc/apache2/sites-available/your-apache-configuration-file /etc/apache2/sites-enabled/
$ sudo /etc/init.d/apache2 restart
{% endhighlight %} 

* Install [Nginx](http://nginx.org/) and [AWStats](http://www.awstats.org/)

{% highlight bash %}
$ sudo apt-get install nginx
$ sudo apt-get install awstats
{% endhighlight %} 

* Configure Nginx

{% highlight bash %}
$ sudo rm /etc/nginx/sites-enabled/default
$ cd repository/your-repository-name
$ sudo cp nginx/sites-available/* /etc/nginx/sites-available/
$ sudo ln -s /etc/nginx/sites-available/your-nginx-configuration-file /etc/nginx/sites-enabled/
$ sudo ln -s /etc/nginx/sites-available/awstats /etc/nginx/sites-enabled/
{% endhighlight %}

* Configure AWStats

{% highlight bash %}
$ sudo rm /etc/awstats/awstats.conf
$ cd repository/your-repository-name
$ sudo cp awstats/awstats.* /etc/awstats/
$ sudo mkdir /var/www/awstats.your-app-name.com
$ sudo htpasswd -c /etc/awstats/awstats.your-app-name.com.htpasswd Admin
{% endhighlight %}

* Install gems of your Rails webapp

{% highlight bash %}
$ gem install thin
$ cd repository/aemdee
$ bundle install
{% endhighlight %}

* Update MySQL database by the existing database dump file

{% highlight bash %}
$ mysql -u username -p password your-db < your-dump-file-name.sql
{% endhighlight %}

* Start server

{% highlight bash %}
$ emacs -nw config/environments/development.rb
$ emacs -nw config/database.yml
$ thin start --ssl
{% endhighlight %}


####2.3. Part Three - Connect virtual Ubuntu Server with your Mac OS and develop/test the webapp on the local IDE/browsers based on SSH and SSHFS

Because we are not able to develop or test the webapp in a place (Ubuntu Server) where IDEs and browsers don't exist, we have to connect the virtual Ubuntu Server with Mac OS so that all the resources of our computer can be utilized. For example, how to use your favourite [RubyMine](https://www.jetbrains.com/ruby/), [Sublime Text](http://www.sublimetext.com/) or [Atom](https://atom.io/) installed on your Mac to develop a webapp deployed on the virtual Ubuntu Server and meanwhile how to preview or test it on local browsers like Safari, Chrome or Firefox? This is actually a pretty tricky issue if you don't have any experience before. But by following the instruction below, you can easily get out of the woods for sure.

* Install SSH on your Ubuntu Server and then shutdown the server

{% highlight bash %}
$ sudo apt-get install opens
$ sudo apt-cache ssh
$ sudo apt-cache search ssh
$ sudo apt-cache search ssh  |  grep server
$ sudo apt-cache search ssh  |  grep server  |  grep open
$ sudo apt-get install opens-server
$ sudo shutdown -h now
{% endhighlight %}

* Activate the Network Adapter 2 of Ubuntu Server in VirtualBox Manager

    * Open the VirtualBox settings of your Ubuntu Server
    * Click "Network"
    * Click "Adapter 2"
    * Select "Host-only Adapter" for "Attached to: "
    * Select "Allow All" for "Promiscuous Mode: "

* Restart Ubuntu Server, configure the "dhclient" and check IP address of the server and start your app

{% highlight bash %}
$ sudo dhclient eth1
$ ip a
//You will find two IP addresses: one is 127.0.0.1 and the other is something like 192.168.xx.xxx which will be our target.
$ cd repository/your-repository-name
$ rails s
{% endhighlight %}

* Connect the virtual Ubuntu Server to Mac OS via SSH

Open your Mac Terminal and input:
{% highlight bash %}
$ ssh -l username-of-your-ubuntu-server -Y 192.168.xx.xxx
// If you get this problem: "WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!", you can resolve it by the following commands:
$ ssh-keygen -R 192.168.xx.xxx
$ Are you sure you want to continue connecting (yes/no)? yes
{% endhighlight %}

* Open your browsers and input URL 192.168.xx.xxx:3000 to preview your Rails webapp

* Using SSHFS to mount the remote file system (your webapp code package on Ubuntu Server) over SSH

    * Download and install [SSHFS](http://fuse.sourceforge.net/sshfs.html) on your Mac
    * We are going to mount the remote file system to for example ~/Desktop/mountpoint folder (PS: No need to create this folder before). Open your Mac Terminal and directly input:
    
{% highlight bash %}
$ sshfs -p 22 username@192.168.xx.xxx:repository/your-repository-name/ ~/Desktop/mountpoint -oauto_cache,reconnect,defer_permissions,noappledouble,negative_vncache,volname=xxx
{% endhighlight %}

* Open the mountpoint (~/Desktop/mountpoint) in your favourite IDE and you can now start the amazing development journey! (PS: all your changes or updates will be automatically synchronized on the virtual Ubuntu Server!)










