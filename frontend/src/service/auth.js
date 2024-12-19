const BASE_URL = "https://duishobaevislam01.up.railway.app"; // Укажи URL своего API

const auth = {
    // Регистрация нового пользователя
    createUser: async (userData) => {
        try {
            const response = await fetch(`${BASE_URL}/api/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Ошибка регистрации");
            }

            console.log("Успешная регистрация:", data);
            return data;
        } catch (error) {
            console.error("Ошибка при регистрации:", error.message);
        }
    },

    // Вход пользователя
    loginUser: async (loginData) => {
        try {
            const response = await fetch(`${BASE_URL}/api/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Ошибка входа");
            }

            console.log("Успешный вход:", data);
            return data;
        } catch (error) {
            console.error("Ошибка при входе:", error.message);
        }
    },
    getProfile: async (token) => {
        try {
            const response = await fetch(`${BASE_URL}/api/profile/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Ошибка получения профиля");
            }

            return data; // Возвращаем данные профиля
        } catch (error) {
            console.error("Ошибка при получении профиля:", error.message);
        }
    },
};

export default auth;
