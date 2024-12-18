from rest_framework_simplejwt.tokens import Token
from .models import User, Profile
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['full_name', 'bio', 'avatar', 'verified']


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)  # Вложенный сериализатор для профиля

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)  # Получаем данные профиля

        # Обновляем данные пользователя
        instance = super().update(instance, validated_data)

        # Если данные профиля присутствуют, обновляем их
        if profile_data:
            profile_serializer = ProfileSerializer(instance.profile, data=profile_data, partial=True)
            if profile_serializer.is_valid():
                profile_serializer.save()

        return instance


class MyTOPS(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = user.profile.bio

        return token


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    full_name = serializers.CharField(write_only=True, required=True)
    avatar = serializers.ImageField(write_only=True, required=False)  # Поле для загрузки аватара

    class Meta:
        model = User
        fields = ['full_name', 'email', 'username', 'password', 'password2', 'avatar']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {'password': "Password Fields Didn't Match"}
            )
        return attrs


    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])

        user.save()

        if "full_name" in validated_data:
            user.profile.full_name = validated_data['full_name']
            user.profile.save()

        return user
