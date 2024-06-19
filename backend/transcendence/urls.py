"""
URL configuration for transcendence project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/csrf/', views.csrf, name='csrf'),
    path('admin/', admin.site.urls),
    path('api/register/', views.register_view, name='register'),
    path('api/login/', views.login_view, name='login'),
    path('api/logout/', views.logout_view, name='logout'),
    path('api/login/changeusername', views.change_username_view, name='login'),
    path('api/token/refreshtoken', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/42oauth_start/', views.login42_start, name='login42_start'),
    path('42oauth', views.login42_oauth, name='login42_oauth'),
	path('api/login/add_friend', views.add_friend_view, name='add_friend'),
    path('api/login/update_pong_stats', views.update_pong_stats_view, name='update_pong_stats'),
    path('api/login/update_spaceinvaders_stats', views.update_spaceinvaders_stats_view, name='update_spaceinvaders_stats'),
]
#https://localhost/ft_transcendence/api/42oauth