// html semantic
// server validation
// action validation
// api validation

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//
export default function Login() {
  const loginAction = async (formData: FormData) => {
    "use server";
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch("http://localhost:3000/api/auth/login", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("res ok not daijobu");

      throw new Error("gagal login");
    }

    const resData = await res.json();

    cookies().set("Authorization", `Bearer ${resData.access_token}`);

    redirect("/products");
  };
  return (
    <>
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <div className="bg-no-repeat bg-cover bg-center relative bg-slate-900">
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

          <form
            className="flex justify-center self-center z-10"
            action={loginAction}
          >
            <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Sign In{" "}
                </h3>
                <p className="text-gray-500">Please sign in to your account.</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    defaultValue={"john@gmail.com"}
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="email"
                    placeholder="mail@gmail.com"
                    required
                    name="email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    defaultValue={"12345"}
                    className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    required
                  />
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <p className="text-black inline">Dont have a account?</p>
                      <a
                        href="/account/register"
                        className="text-green-400 hover:text-green-500"
                      >
                        Register
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>
                </div>
              </div>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Copyright © 2021- {new Date().getFullYear()}
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
