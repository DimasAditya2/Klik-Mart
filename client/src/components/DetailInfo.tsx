"use client";

import { useEffect } from "react";

export default function DetailInfo() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <section id="#about">
      <div className="sm:flex items-center max-screen-xl h-screen bg-slate-900">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png" />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            {/* <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">
              About us
            </span> */}
            <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
              About <span className="text-indigo-600">Klik Mart</span>
            </h2>
            <p className="text-gray-400">
              Klik Mart is a premier online shopping platform designed to offer
              a seamless and enjoyable shopping experience. Our extensive range
              of products spans various categories, including fashion,
              electronics, home goods, and more. With a user-friendly interface
              and intuitive navigation, finding what you need has never been
              easier.
            </p>
          </div>
        </div>
      </div>
      <hr className="border-gray-500 border-1" />
    </section>
  );
}
