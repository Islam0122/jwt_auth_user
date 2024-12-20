from .env_reader import env

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'accept-language',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
CORS_ORIGIN_WHITELIST = [
    "http://127.0.0.1:8000",  # ваш локальный сервер
    "http://localhost:63342",  # ваш локальный фронтенд
    "http://localhost:63343",  # ваш локальный фронтенд
    "http://127.0.0.1:*",  # все порты для localhost
    "http://localhost:*",
    "https://duishobaevislam01.up.railway.app",  # ваш продакшн сервер
    "http://localhost:3000",  # локальный сервер React (по умолчанию порт 3000)
    "http://localhost:5173",
    "http://localhost:5185",# локальный сервер React (по умолчанию порт 3000)

]
