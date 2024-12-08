from django.urls import path
from . import views

from .views import GetAccountsView 


urlpatterns = [
    path('profile/', views.ManagerProfileView.as_view(), name='Manager-profile'),
    path('register', views.CreateManagerView.as_view(), name='create_Manager'),
    path('update/', views.UpdateManagerView.as_view(), name='update_Manager'),
    path('login/', views.LoginView.as_view(), name='login_Manager'),


    path('accounts/', GetAccountsView.as_view(), name='admin_list'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('token/refresh/', views.TokenRefreshView.as_view(), name='token_refresh'),

]

