import { useGetAllUsersQuery , useDeleteUserMutation, useRegisterMutation, useAddUserMutation} from "../../services/auth/authSlice";
import { Outlet, useNavigate } from "react-router";
import { AuthState, RegisterRequest } from "../../services/auth/types";
import { Link } from "react-router-dom";
import {useState,useEffect} from "react";

const Dashboard = ({
  isAuthenticated,
  authState,
}: {
  isAuthenticated: boolean;
  authState: AuthState;
}) => {
    const { data, isLoading } = useGetAllUsersQuery();
    const [addUser, setAddUser] = useState(false)
    const navigate = useNavigate();
    
    if(isLoading) <>Loading .....</>

    useEffect(() => {
        if(!isAuthenticated){
            navigate("/",{replace:true})
        }
    }, [])
    
    
   
    
  return (
    <section className=" absolute top-0 left-0 right-0 bg-slate-50 p-4 sm:p-8 md:p-12 lg:p-24">
        <div className="flex justify-between font-bold">
        <h2>{authState.user?.email}</h2>
        <div  className="flex justify-between gap-6 underline">
            <Link to={"/dashboard"}>Products</Link>
            <Link to={`/dashboard/create/${authState.user?.id}`}>Create Product</Link>
        </div>
        </div>
        <h1 className="text-center text-3xl pb-4">Admin Dashboard</h1>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                role
              </th>
              <th scope="col" className="px-6 py-3">
                edit
              </th>
            </tr>
          </thead>
          <tbody>
            {
                data?.map((user)=> (
                    <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.id}
              </th>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.username}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">
                <DeleteButton id={user.id} email={user.email} />
              </td>
            </tr>
                ))
            }
            
            
          </tbody>
        </table>

        <div>
            <button className="underline py-6 font-semibold text-blue-700" onClick={()=>setAddUser((prev)=>!prev)}>Add User</button>
            {
                addUser && <AddUser />
            }
        </div>
      </div>
    </section>
  );
};




export const DeleteButton = ({id,email}:{id:number, email:string}) => {
    const [deleteUser, {isLoading:loading}] = useDeleteUserMutation()
    const navigate = useNavigate();

    
  return (
    <button className="bg-red-500 px-4 py-1 rounded text-white font-bold" onClick={(e)=> {
        e.preventDefault();
        try {
            deleteUser({id:id, email:email})
                .then((data)=> {
                   if(data?.data?.ok){
                    navigate.refresh();
                   }
                   alert(data?.error?.message);
                   
                    
                })
        } catch (error) {
            
        }
    }} > {loading ? "Loading ..": "Delete"} </button>
  )
}



const AddUser = ()=> {
    const [addUser, { isLoading }] = useAddUserMutation();
	const [registerFormData, setRegisterFormData] = useState<RegisterRequest>({
		username: "",
		email: "",
		password: "",
		role: "shopper",
	});
    const navigate = useNavigate();
    return (
        <>
        <div>
				<div className="flex min-h-full bg-white flex-col justify-center px-6 py-12 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						
						<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
							Add User
						</h2>
					</div>

					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<form
							className="space-y-6"
							onSubmit={(e) => {
								e.preventDefault();
								try {
									addUser(registerFormData)
										.then((data) => {
											if (data?.data?.ok) {
												alert("User Created")
                                                navigate.refresh();
											}
											alert("not allowed");
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
									Add as a Seller
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
									<div className="text-sm">
										<a
											href="#"
											className="font-semibold text-indigo-600 hover:text-indigo-500"
										>
											Forgot password?
										</a>
									</div>
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
										? "Adding ..."
										: `Add as ${registerFormData.role} `}
								</button>
							</div>
						</form>

						
					</div>
				</div>
			</div>
        </>
    )
}



export default Dashboard;