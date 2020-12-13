"""PeerXPassesment URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from ticket_app import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('login_operation/', views.login_operation, name='login_operation'),
    path('logout/', views.logout, name='logout'),
    path('register_new_user/', views.register_new_user, name='register_new_user'),
    path('user_dashboard/', views.user_dashboard, name='user_dashboard'),
    path('fetch_ticketform_select_field_details/', views.fetch_ticketform_select_field_details,
         name='fetch_ticketform_select_field_details'),
]
