"use client";
import React, { useEffect, useState } from "react";
import logo from "../public/logo.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Nav = () => {
  const [show, setShow] = useState(false);
  const navigate = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className={`nav ${show && "nav_black"}`}>
        <div className="max-w-28">
          <Image src={logo} alt="Description of the image" />
        </div>
        <div>
          <img
            className="nav_avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Netflix Avatar"
            onClick={() => navigate.push("/profile")}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
