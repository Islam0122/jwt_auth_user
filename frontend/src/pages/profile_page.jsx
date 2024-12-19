import React, { useState, useEffect } from "react";
const BASE_URL = "https://duishobaevislam01.up.railway.app"; // Укажи URL своего API

const Profile = () => {
    const [profile, setProfile] = useState(null); // Состояние для хранения данных профиля
    const [loading, setLoading] = useState(true); // Состояние для индикации загрузки

    // Функция для получения профиля
    const handleGetProfile = async () => {
        try {
            const token = localStorage.getItem("token"); // Получаем токен из localStorage
            if (!token) {
                alert("Токен не найден! Пожалуйста, авторизуйтесь.");
                return;
            }

            const response = await fetch(`${BASE_URL}/api/profile/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Ошибка при получении профиля");
            }

            const data = await response.json();
            setProfile(data); // Сохраняем данные профиля в состояние
        } catch (error) {
            console.error("Ошибка при получении профиля:", error.message);
            alert("Не удалось загрузить профиль. Попробуйте позже.");
        } finally {
            setLoading(false); // Завершаем индикацию загрузки
        }
    };

    // Загрузка профиля при монтировании компонента
    useEffect(() => {
        handleGetProfile();
    }, []);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h3>Загрузка профиля...</h3>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary">Профиль пользователя</h2>
            {profile ? (
                <div className="card p-4 shadow-lg text-center border-0"
                     style={{borderRadius: "15px", background: "linear-gradient(145deg, #f0f0f3, #cacaca)",padding:"45px"}}>
                    <img
                        src={profile.avatar ? profile.avatar : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"}
                        alt="Аватар пользователя"
                        className="rounded-circle img-thumbnail mx-auto"
                        style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            border: "5px solid #007bff",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
                        }}
                    />
                    <h4 className="mt-3 text-dark">Имя: <span className="text-secondary">{profile.full_name}</span></h4>
                    <p className="text-muted">Биография: {profile.bio ? profile.bio : "Биография отсутствует"}</p>
                    <p className={`text-mute`}  >
                        {profile.verified ? "Верифицирован" : "Не верифицирован"}
                    </p>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-danger">Не удалось загрузить профиль.</p>
                </div>
            )}
        </div>

    );
};

export default Profile;
