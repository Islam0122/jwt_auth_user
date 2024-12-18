from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView)
from . import views
from .views import ProfileView

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(),name="token-obtain"),
    path('token/refresh/', TokenRefreshView.as_view(), name="refresh-token"),
    path('register/', views.RegisterView.as_view(), name="register-user"),
    path('test/', views.protectedView, name="test"),
    path('profile/', ProfileView.as_view(), name='profile'),  # Добавляем маршрут для профиля
    path('', views.view_all_routes, name="all-routes")
]