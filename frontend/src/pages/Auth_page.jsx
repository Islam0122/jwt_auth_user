import auth from "../service/auth.js";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const Auth = () => {
    const [content, setContent] = useState("login");
    return (
        <div>
            <div className="text-center mb-4">
                <h2
                    style={{ cursor: "pointer" }}
                    className={content === "login" ? "text-primary fw-bold" : "text-secondary"}
                    onClick={() => setContent("login")}
                >
                    Вход
                </h2>
                <h2
                    style={{ cursor: "pointer" }}
                    className={content === "create" ? "text-primary fw-bold" : "text-secondary"}
                    onClick={() => setContent("create")}
                >
                    Регистрация
                </h2>
            </div>
            {content === "login" && <SignIn />}
            {content === "create" && <SignUp />}
        </div>
    );
};

export default Auth;

const SignUp = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const newUser = {
            full_name: form.full_name.value,
            email: form.email.value,
            username: form.username.value,
            password: form.password.value,
            password2: form.password2.value,
        };
        console.log(newUser, "------новый пользователь");
        const res = await auth.createUser(newUser);
        console.log(res);
    };

    return (
        <div className="container mt-5">
            <form
                onSubmit={onSubmit}
                className="shadow-lg p-4 rounded bg-white"
                style={{ maxWidth: "500px", margin: "0 auto" }}
            >
                <h3 className="text-center mb-4 text-primary fw-bold">Создание аккаунта</h3>

                <div className="mb-3">
                    <label htmlFor="full_name" className="form-label fw-bold">
                        Полное имя
                    </label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        className="form-control"
                        placeholder="Введите ваше полное имя"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">
                        Электронная почта
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Введите ваш email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label fw-bold">
                        Имя пользователя
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        placeholder="Введите имя пользователя"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold">
                        Пароль
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Введите пароль"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password2" className="form-label fw-bold">
                        Повторите пароль
                    </label>
                    <input
                        type="password"
                        id="password2"
                        name="password2"
                        className="form-control"
                        placeholder="Повторите ваш пароль"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold">
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};

// eslint-disable-next-line react/prop-types
const SignIn = ({ setContent }) => {
    const navigate = useNavigate(); // Для перенаправления
    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const user = {
            email: form.email.value,
            password: form.password.value,
        };

        try {
            const res = await auth.loginUser(user);
            if (res && res.access) {
                localStorage.setItem("token", res.access);
                alert("Вход выполнен успешно!");
                navigate("/profile"); // Перенаправление на страницу профиля
            } else {
                alert("Ошибка входа. Проверьте данные.");
            }
        } catch (error) {
            console.error("Ошибка входа:", error);
            alert("Ошибка входа. Попробуйте еще раз.");
        }
    };

    return (
        <div className="container mt-5">
            <form
                onSubmit={onSubmit}
                className="shadow-lg p-4 rounded bg-white"
                style={{ maxWidth: "500px", margin: "0 auto" }}
            >
                <h3 className="text-center mb-4 text-primary fw-bold">Вход в аккаунт</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">Электронная почта</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Введите ваш email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Введите пароль"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100 fw-bold">Войти</button>
                <div className="text-center mt-3">
                    <span>Нет аккаунта? </span>
                    <a
                        href="#"
                        className="text-decoration-none text-primary fw-bold"
                        onClick={() => setContent("create")}
                    >
                        Зарегистрироваться
                    </a>
                </div>
            </form>
        </div>
    );
};

