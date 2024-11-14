"use client";
import Header from "@/components/header";
import Trending from "@/components/trending";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  return (
    <div className="pb-10">
      <Header />
      <main className="relative">
        <div
          style={{ maxWidth: "100%", height: "60vh", maxHeight: "600px" }}
          className="relative"
        >
          <Image
            // fill={true}
            layout="fill"
            src="/images/home-cover.png"
            objectFit="cover"
            alt="cover image"
          />
          <div className="absolute bottom-8 flex flex-col gap-2 left-10">
            <h2 className="text-6xl font-bold ">Venom</h2>
            <div>
              <span>2024</span> | <span>action</span> | <span>movie</span>
            </div>
          <div className="watch-fave flex items-center gap-2">
            <button className="rounded bg-green-500 p-2">Watch Trailer</button>
            <button>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    d="M20.84 4.60999C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.60999L12 5.66999L10.94 4.60999C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.60999C2.1283 5.64169 1.54871 7.04096 1.54871 8.49999C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.49999C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.60999V4.60999Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </button>
          </div>
          </div>

        </div>
      </main>

      <section>
        <h2>Trending</h2>
        <main>
         <Trending />
        </main>
      </section>
    </div>
  );
}
