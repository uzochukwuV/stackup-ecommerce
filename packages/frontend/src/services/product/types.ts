export interface ProductModel {
	id: number;
	sellerId: number;
	name: string;
	price: number;
	img: string;
	quantity: number;
	createdAt: Date;
	updatedAt: Date;
}

export type AllProductResponse = {
	message: string;
	status: number;
	ok: boolean;
	products: ProductModel[];
};

export interface ProductCreateRequest {
	name: string | null;
	img: string | null;
	price: number | null;
	quantity: number | null;
}

export interface ProductDeleteRequest {
	id: number;
	name: string;
}

export interface Cart {
	id: number;
	amount: number;
}

// export interface BlogUpdateRequest extends BlogDeleteRequest {
// 	content: string;
// }

export interface ProductResponse {
	message?: string;
	status?: number;
	ok?: boolean;
	error?: string;
	reason?: string;
}
