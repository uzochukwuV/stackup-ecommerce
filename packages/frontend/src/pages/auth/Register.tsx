import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../../services/auth/authSlice";
import type { RegisterRequest } from "../../services/auth/types";
import { Link } from "react-router-dom";

const Register = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
	const navigate = useNavigate();
	const [register, { isLoading }] = useRegisterMutation();
	const [registerFormData, setRegisterFormData] = useState<RegisterRequest>({
		username: "",
		email: "",
		password: "",
		role: "shopper",
	});

	useEffect(() => {
		if(isAuthenticated){
			
			return navigate(`/dashboard`, {
				replace: true,
			});
		}
	
	  
	}, [])
	return (
		<>
			<div>
				<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<img
							className="mx-auto h-10 w-auto"
							src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
							alt="Your Company"
						/>
						<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
							Sign in to your account
						</h2>
					</div>

					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<form
							className="space-y-6"
							onSubmit={(e) => {
								e.preventDefault();
								try {
									register(registerFormData)
										.then((data) => {
											if (data?.data?.ok) {
												return navigate("/", {
													replace: true,
												});
											}
											alert("Invalid credentials!");
										})
										.catch(() =>
											alert("Server error! Please file a bug report!"),
										);
								} catch (err) {
									alert(`Failed to register; got ${err}`);
								}
							}}
						>
							<div>
								<label
									htmlFor="username"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									username address
								</label>
								<div className="mt-2">
									<input
										id="username"
										name="username"
										type="username"
										value={registerFormData.username}
										onChange={(e) =>
											setRegisterFormData({
												...registerFormData,
												username: e.target.value,
											})
										}
										autoComplete="email"
										required
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Email address
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										value={registerFormData.email}
										onChange={(e) =>
											setRegisterFormData({
												...registerFormData,
												email: e.target.value,
											})
										}
										autoComplete="email"
										required
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<label class="inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={registerFormData.role === "shopper" ? false : true}
									onChange={(e) => {
										console.log(e.target.checked);

										setRegisterFormData({
											...registerFormData,
											role: e.target.checked === false ? "shopper" : "seller",
										});
									}}
									class="sr-only peer"
								/>
								<div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
								<span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
									Register as a Seller
								</span>
							</label>

							<div>
								<div className="flex items-center justify-between">
									<label
										htmlFor="password"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Password
									</label>
									
								</div>
								<div className="mt-2">
									<input
										id="password"
										value={registerFormData.password}
										onChange={(e) =>
											setRegisterFormData({
												...registerFormData,
												password: e.target.value,
											})
										}
										name="password"
										type="password"
										autoComplete="current-password"
										required
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									{isLoading
										? "Registering ..."
										: `Register as ${registerFormData.role} `}
								</button>
							</div>
						</form>

						<p className="mt-10 text-center text-sm text-gray-500">
							Already have an account
							<Link
								to="/"
								className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
							>
								{" "}
								Login Now
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
