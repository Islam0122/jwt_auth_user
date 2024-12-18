from django.shortcuts import render, get_object_or_404
from .models import User, Profile
from .serializers import MyTOPS, RegistrationSerializer, ProfileSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status


# Класс для получения токена с дополнительными данными о пользователе
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTOPS


# Представление для регистрации нового пользователя
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)  # Разрешение на доступ для всех
    serializer_class = RegistrationSerializer


# Представление для защищённого маршрута, доступного только аутентифицированным пользователям
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Только для аутентифицированных пользователей
def protectedView(request):
    output = f"Welcome {request.user.username}, Authentication Successful"
    return Response({'response': output}, status=status.HTTP_200_OK)


# Представление для отображения всех доступных маршрутов API
@api_view(['GET'])
def view_all_routes(request):
    data = [
        'api/token/',  # Маршрут для получения токена
        'api/token/refresh/',  # Маршрут для обновления токена
        'api/register/',  # Маршрут для регистрации пользователя
        'api/protected/',  # Пример защищённого маршрута
    ]

    return Response(data)


class ProfileView(generics.RetrieveUpdateAPIView):
    """
    Представление для получения и обновления профиля текущего пользователя.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        # Возвращаем профиль текущего пользователя
        return get_object_or_404(Profile, user=self.request.user)

    def get(self, request, *args, **kwargs):
        """
        Получить данные профиля текущего пользователя.
        """
        profile = self.get_object()
        serializer = self.get_serializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        """
        Частичное обновление данных профиля.
        """
        profile = self.get_object()
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
