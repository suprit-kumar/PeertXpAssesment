# PeertXpAssesment
# Project Requirements

Create a Python Django Web application where users can simply login with their email 
and add a New Support Ticket. Any new ticket raised via the New ticket form should be 
sent to Zoho Desk via API. Also, another page lists all the tickets raised by them. 

# Demo

https://drive.google.com/file/d/1MwU4fRD6L9-d4P0kLcvu_AOVqTHBoZDn/view?usp=sharing

# Tools and Technology Used 

Python,Django,Javascript,Jquery,HTML,CSS,mdBootstrap,Ajax,MySql, IDE-Pycharm

# Steps to reproduce

1. New user Sign up by entering name,email,password.
2. Login with email and password.
3. Dashboard will appear with a ticket create form on the left side and on right of the screen you will get ticket status.

# How to create

* Install Python
* Install Django
* Install MySql to create database locally
* Run command in command line to create django project django-admin startproject projectname.Inside Project file you will get such files
--------------
* manage.py
* settings.py
* urls.py
* wsgi.py
* __init__.py
* template folder
* static folder
--------------
* Run commmand in command line to create project app python manage.py startapp appname
-------------------
* migrations
* admin.py
* apps.py
* models.py
* __init__.py
* utils.py
* views.py
--------------

* Add your project database instances in the models.py file . The run command
-----------------
* python manage.py makemigrations appname
* python manage.py migrate appname

* Add html files inside template folder
* Add all your static files in the static folder.
* Create logic function inside views.py
* Add urls inside the urls.py
* Database settings to be added in the settings.py file
* To run project type command python manage.py runserver
