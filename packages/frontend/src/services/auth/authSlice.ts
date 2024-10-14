import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	UserResponse,
	LoginRequest,
	LogOutResponse,
	AuthState,
	RegisterResponse,
	RegisterRequest,
	UserModel,
	UserDeleteRequest,
	UserDeleteResponse,
} from "./types";
import type { RootState } from "../../store";
import { createSlice } from "@reduxjs/toolkit/react";

export const authApi = createApi({
	baseQuery: fetchBaseQuery({
		// Replace your address here if needed i.e. your forwarded address from a cloud environment
		baseUrl: "http://127.0.0.1:4040/api/",
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
		credentials: "include",
	}),
	endpoints: (builder) => ({
		login: builder.mutation<UserResponse, LoginRequest>({
			query: (credentials) => ({
				url: "auth/login",
				method: "POST",
				body: credentials,
			}),
		}),
		logout: builder.mutation<LogOutResponse, void>({
			query: () => ({
				url: "auth/logout",
				method: "POST",
				validateStatus(response) {
					return response.ok === true;
				},
			}),
		}),
		register: builder.mutation<RegisterResponse, RegisterRequest>({
			query: (info) => ({
				url: "auth/register",
				method: "POST",
				body: info,
				validateStatus(response) {
					return response.ok === true;
				},
			}),
		}),
		addUser: builder.mutation<RegisterResponse, RegisterRequest>({
			query: (info) => ({
				url: "auth/user/add",
				method: "POST",
				body: info,
				validateStatus(response) {
					return response.ok === true;
				},
			}),
		}),
		getAllUsers: builder.query<UserModel[], void>({
			query: () => ({
				url: "auth/users/all",
			}),
			transformResponse: (
				response: { users: UserModel[] },
				_meta,
				_arg,
			) => response.users,
			transformErrorResponse: (response, _meta, _arg) => {
				return response.data as ErrorResponse;
			},
			providesTags: ["UserModel"],
		}),
		deleteUser: builder.mutation<UserDeleteResponse, UserDeleteRequest>({
			query: (body) => ({
				url: "auth/user/delete",
				method: "DELETE",
				credentials: "include",
				body: { id: body.id, email: body.email },
			}),
			invalidatesTags: ["UserModel"],
			transformErrorResponse(response, _meta, _arg) {
				return response.data as ErrorResponse;
			},
		}),
	}),
});

// authApi definition above
const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		token: null,
	} as AuthState,
	reducers: {
        refreshAuthentication: (state) => {
            const isAuthenticated = sessionStorage.getItem("isAuthenticated");
            console.log("refreshing");
            
            if (isAuthenticated === "true") {
                    const userSession = sessionStorage.getItem("user");
                    const response: UserResponse = JSON.parse(
                            userSession as string,
                    ) as UserResponse;
                    state.token = response.token;
                    state.user = {
                            username: response.username,
                            id: response.userId,
                            email: response.email,
                            role: response.role,
                    };
            }
            return state;
    },
    },
	extraReducers(builder) {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.token;
				state.user = {
					id: payload.userId,
					username: payload.username,
					email: payload.email,
					role: payload.role,
				};
                sessionStorage.setItem("isAuthenticated", "true");
                sessionStorage.setItem("user", `${JSON.stringify(payload)}`);
                return state;
				
			},
		);
		builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
			state.token = null;
			state.user = null;
            sessionStorage.removeItem("isAuthenticated");
            sessionStorage.removeItem("user");
			return state;
		});
	},
});

export default authSlice.reducer;
export const { refreshAuthentication } = authSlice.actions;
export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useGetAllUsersQuery, useDeleteUserMutation, useAddUserMutation } =
	authApi;
