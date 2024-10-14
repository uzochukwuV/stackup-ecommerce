import { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateProductMutation } from "../../services/product/productSlice";
import type { AuthState, LoginRequest } from "../../services/auth/types";
import { Link } from "react-router-dom";
import {
	ProductResponse,
	ProductCreateRequest,
} from "../../services/product/types";

export const CreateProduct = ({
	isAuthenticated,
	authState,
}: { isAuthenticated: boolean; authState: AuthState }) => {
	const navigate = useNavigate();
	const [create, { isLoading }] = useCreateProductMutation();
	const [productFormData, setProductFormData] = useState<ProductCreateRequest>({
		name: "",
		img: "",
		price: null,
		quantity: null,
	});
	return (
		<>
			<section class="bg-white dark:bg-gray-900">
				<div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
					<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
						Add a new product {authState.user?.email}
					</h2>
					<form method="POST"
						onSubmit={(e) => {
							e.preventDefault();
                            console.log(productFormData);
                            
							try {
								create(productFormData)
									.then((data) => {
										if (data?.data?.ok) {
											// return navigate("/post/create", {
											//     replace: true,
											// });
											alert(data?.data?.message);
										}
										console.log(data);
									})
									.catch(() =>
										alert("Server error! Please file a bug report!"),
									);
							} catch (err) {
								alert(`Failed to create Product; got ${err}`);
							}
						}}
					>
						<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
							<div class="sm:col-span-2">
								<label
									for="name"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Product Name
								</label>
								<input
									type="text"
									name="name"
									value={productFormData.name}
									onChange={(e) =>
										setProductFormData({
											...productFormData,
											name: e.target.value,
										})
									}
									id="name"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="Type product name"
									required=""
								/>
							</div>
							<div class="w-full">
								<label
									for="image"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									image
								</label>
								<input
									type="text"
									value={productFormData.img}
									onChange={(e) =>
										setProductFormData({
											...productFormData,
											img: e.target.value,
										})
									}
									name="image"
									id="image"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="Product image"
									required=""
								/>
							</div>
							<div class="w-full">
								<label
									for="price"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Price
								</label>
								<input
									type="number"
									value={productFormData.price}
									onChange={(e) =>
										setProductFormData({
											...productFormData,
											price: e.target.value,
										})
									}
									name="price"
									id="price"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="$2999"
									required=""
								/>
							</div>
							<div>
								<label
									for="category"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Category
								</label>
								<select
									id="category"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								>
									<option selected="">not in use</option>
									<option value="TV">TV/Monitors</option>
									<option value="PC">PC</option>
									<option value="GA">Gaming/Console</option>
									<option value="PH">Phones</option>
								</select>
							</div>
							<div>
								<label
									for="item-quantity"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Item quantity (kg)
								</label>
								<input
									type="number"
									value={productFormData.quantity}
									onChange={(e) =>
										setProductFormData({
											...productFormData,
											quantity: e.target.value,
										})
									}
									name="item-quantity"
									id="item-quantity"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="12"
									required=""
								/>
							</div>
							<div class="sm:col-span-2">
								<label
									for="description"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Description
								</label>
								<textarea
									id="description"
									rows="8"
									class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="Your description here not in use yet"
								></textarea>
							</div>
						</div>
						<button
							type="submit"
							class="inline-flex  items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center  bg-blue-500 px-4 py-1 rounded text-white font-boldrounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
						>
							Add product
						</button>
					</form>
				</div>
			</section>
		</>
	);
};
