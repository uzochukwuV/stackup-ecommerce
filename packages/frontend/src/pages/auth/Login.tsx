import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useLoginMutation } from "../../services/auth/authSlice";
import type { AuthState, LoginRequest } from "../../services/auth/types";
import { Link } from "react-router-dom";

const Login = ({
	isAuthenticated,
	authState,
}: { isAuthenticated: boolean; authState: AuthState }) => {
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();
	const [loginFormData, setLoginFormData] = useState<LoginRequest>({
		email: "",
		password: "",
	});

	useEffect(() => {
		if(isAuthenticated){
			if(authState.user?.role === "admin"){
				return navigate("/admin/dashboard", {
					replace: true,
				});
			}
			if(authState.user?.role === "shopper"){
				return navigate("/dashboard", {
					replace: true,
				});
			}
			return navigate(`/dashboard/create/${authState.user?.id}`, {
				replace: true,
			});
		}
	
	  
	}, [isAuthenticated,authState])
	
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
									login(loginFormData)
										.then((data) => {
											if (data?.data?.ok) {
												if(data?.data?.role === "admin"){
													return navigate("/admin/dashboard", {
														replace: true,
													});
												}
												if(data?.data?.role === "shopper"){
													return navigate("/dashboard", {
														replace: true,
													});
												}
												return navigate(`/dashboard/create/${data?.data?.userId}`, {
													replace: true,
												});
											}
											alert("Invalid credentials!");
										})
										.catch(() =>
											alert("Server error! Please file a bug report!"),
										);
								} catch (err) {
									alert(`Failed to login; got ${err}`);
								}
							}}
						>
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
										value={loginFormData.email}
										onChange={(e) =>
											setLoginFormData({
												...loginFormData,
												email: e.target.value,
											})
										}
										autoComplete="email"
										required
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

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
										value={loginFormData.password}
										onChange={(e) =>
											setLoginFormData({
												...loginFormData,
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
									{isLoading ? "Logging in..." : "Sign In"}
								</button>
							</div>
						</form>

						<p className="mt-10 text-center text-sm text-gray-500">
							Dont have an account
							<Link
								to="/register"
								className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
							>
								{" "}
								Register
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
