export interface LoginForm {
    email: string;
    password: string;
}

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export interface RegisterResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}
