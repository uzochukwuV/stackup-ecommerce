import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	ProductCreateRequest,
	ProductDeleteRequest,
	ProductModel,
	ProductResponse,
	// ProductUpdateRequest,
	Cart,
} from "./types";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { ErrorResponse } from "../error-types";

// Define our service using a base URL and expected endpoints
export const productApi = createApi({
	reducerPath: "productApi",
	// Change `localhost` to a forwarded address if using a cloud
	// environment
	baseQuery: fetchBaseQuery({
		// Replace your address here if needed i.e. your forwarded address from a cloud environment
		baseUrl: "http://127.0.0.1:4040/api/",
		prepareHeaders: (headers, { getState, endpoint }) => {
			const token = (getState() as RootState).auth.token;
			// Some of the endpoints don't require logins
            console.log(token);
            
			if (
				token &&
				endpoint !== "products/all" &&
				!endpoint.startsWith("product/user")
			) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
		credentials: "include",
       
	}),
	tagTypes: ["ProductModel"],
	endpoints: (builder) => {
		return {
			getAllProducts: builder.query<ProductModel[], void>({
				query: () => ({
					url: "products/all",
				}),
				transformResponse: (
					response: { products: ProductModel[] },
					_meta,
					_arg,
				) => response.products,
				transformErrorResponse: (response, _meta, _arg) => {
					return response.data as ErrorResponse;
				},
				providesTags: ["ProductModel"],
			}),
			getProducts: builder.query<ProductModel[], string>({
				query: (query) => ({
					url: `products/query`,
					method: "POST",
					credentials: "include",
					body: query,
				}),
				
				transformResponse: (response: { products: ProductModel[] }, _meta, _arg) =>
					response.products,
				transformErrorResponse(response, _meta, _arg) {
					return response.data as ErrorResponse;
				},
				providesTags: ["ProductModel"],
			}),
			createProduct: builder.mutation<ProductResponse, ProductCreateRequest>({
				query: (body) => ({
					url: "products/create",
					method: "POST",
					credentials: "include",
					body: body,
					mode:"cors",
					validateStatus(response) {
						return response.ok === true;
					},
				}),
				invalidatesTags: ["ProductModel"],
				transformErrorResponse(response, _meta, _arg) {
					return response.data as ErrorResponse;
				},
			}),
			// deletePost: builder.mutation<ProductResponse, ProductDeleteRequest>({
			// 	query: (body) => ({
			// 		url: "posts/post/delete",
			// 		method: "DELETE",
			// 		credentials: "include",
			// 		body: { id: body.id, title: body.title },
			// 	}),
			// 	invalidatesTags: ["ProductModel"],
			// 	transformErrorResponse(response, _meta, _arg) {
			// 		return response.data as ErrorResponse;
			// 	},
			// }),
			// updatePost: builder.mutation<ProductResponse, ProductUpdateRequest>({
			// 	query: (body) => ({
			// 		url: "posts/post/update",
			// 		method: "PUT",
			// 		credentials: "include",
			// 		body: body,
			// 	}),
			// 	invalidatesTags: ["ProductModel"],
			// 	transformErrorResponse(response, _meta, _arg) {
			// 		return response.data as ErrorResponse;
			// 	},
			// }),
		};
	},
});


const cartSlice = createSlice({
	name:"cart",
	initialState: {
		products:[] as Cart[]
	},
	reducers:{
		addProductToCart(state, {payload}:{payload:Cart}){
			const cart = state.products.find((e)=> e.id=== payload.id);
				if(cart){
					const index = state.products.indexOf(cart);
					state.products[index].amount += payload.amount
					return state;
				}else {
					state.products.push(payload)
					return state;
				}
		},
		removeProductFromCart(state, {payload}:{payload:Cart}){
			
				const cart = state.products.find((e)=> e.id=== payload.id);
				if(cart.amount > 1){
					const index = state.products.indexOf(cart);
					state.products[index].amount -= 1
					return state;
				}else {
					state.products.pop(cart)
					return state;
				}
		},
		
	}
})

export default cartSlice.reducer;
export const { addProductToCart, removeProductFromCart } = cartSlice.actions
// Exporting the generated methods from createApi
export const {
	useLazyGetAllProductsQuery,
	useGetAllProductsQuery,
    useCreateProductMutation,
	useGetProductsQuery,
	
	
} = productApi;
