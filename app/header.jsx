import Link from "next/link";
import React from "react";
import { LogoutBtn } from "../components/Clients";

const Header = () => {
  return (
    <div className="header">
      <div>
        <h2>TaskTrackr</h2>
      </div>
      <article>
        <Link style={{ margin: "10px" }} href={"/"}>
          Home
        </Link>
        <Link style={{ margin: "10px" }} href={"/profile"}>
          Profile
        </Link>
        <LogoutBtn />
      </article>
    </div>
  );
};

export default Header;
