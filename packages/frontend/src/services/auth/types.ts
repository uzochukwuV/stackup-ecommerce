export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterResponse {
	message: string;
	ok?: boolean;
}

export interface RegisterRequest {
	username: string;
	email: string;
	password: string;
	role: string;
}

export interface User {
	id: number;
	username: string;
	email: string;
	role: string;
}

export type AuthState = {
	user: User | null;
	token: string | null;
};

export interface UserResponse {
	token: string;
	username: string;
	userId: number;
	email: string;
	role: string;
	status: number;
	ok: boolean;
}

export interface LogOutResponse {
	message: string;
	ok?: boolean;
}

export interface UserModel {
	
	username: string;
	userId: number;
	email: string;
	role: string;
	status: number;
}

export interface UserDeleteRequest {
	email: string;
	id: number;
}

export interface UserDeleteResponse {
	message?: string;
	status?: number;
	ok?: boolean;
	error?: string;
	reason?: string;
}