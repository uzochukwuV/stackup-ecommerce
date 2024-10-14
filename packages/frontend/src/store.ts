import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
// import { blogApi } from "./services/posts/blogSlice";
import { productApi } from "./services/product/productSlice";
import { authApi, refreshAuthentication } from "./services/auth/authSlice";
import authReducer from "./services/auth/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from "./services/product/productSlice";


const authListener = createListenerMiddleware();

const store = configureStore({
	reducer: {
		[productApi.reducerPath]: productApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		auth: authReducer,
                cart: cartReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(authApi.middleware)
            .concat(authListener.middleware)
			.concat(productApi.middleware);
	},
});

authListener.startListening.withTypes<RootState, AppDispatch>()({
    predicate(_action, currentState, _originalState) {
            return (
                    currentState.auth.token === null &&
                    currentState.auth.user === null &&
                    sessionStorage.getItem("isAuthenticated") === "true"
            );
    },
    effect: async (_action, listenerApi) => {
            console.log("Needs update");
            listenerApi.dispatch(refreshAuthentication());
            await listenerApi.delay(800);
    },
});

setupListeners(store.dispatch);
/**
 *  This is a very _common pattern_ for Redux.
 **/
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export default store;
