"use client";
import Header from "@/components/header";
import Security from "@/components/Security";
import Trending from "@/components/trending";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {








  return (
    <div className="pb-10">
       <div id="hover-root" />
      <Header />
     <Security />
     {/* <Link href="/dashboard">
     hello
     </Link> */}
    </div>
  );
}
