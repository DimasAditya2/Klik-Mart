import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Register() {
  const registerAction = async (formData: FormData) => {
    "use server";
    const data = {
      username: formData.get('username'),
      name: formData.get('name'),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch("http://localhost:3000/api/auth/register", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("gagal login");
    }

    await res.json();


    redirect("/account/login");
  };
  return (
    <>
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <div
        className="bg-no-repeat bg-cover bg-center relative bg-slate-900"
      >
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center items-center">
          <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <img src="" className="mb-3" />
              <h1 className="mb-3 font-bold text-5xl">
                Belanja Puas Harga Pas
              </h1>
              <p className="pr-3">
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups
              </p>
            </div>
          </div>
          <form action={registerAction} className="flex justify-center self-center z-10 mb-20">
            <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Sign Up{" "}
                </h3>
                <p className="text-gray-500">sign up account.</p>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    name
                  </label>
                  <input
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="text"
                    name="name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    username
                  </label>
                  <input
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="text"
                    name="username"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="email"
                    name="email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="password"
                    name="password"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <a
                        href="/account/login"
                        className="text-green-400 hover:text-green-500"
                      >
                        Have a account? Login
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-slate-900  hover:bg-slate-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Copyright © 2021-2022
                  <a
                    href=""
                    rel=""
                    target="_blank"
                    title="Dimas"
                    className="text-green hover:text-green-500 "
                  >
                    Dimas
                  </a>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
