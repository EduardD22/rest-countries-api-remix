import { Link } from "@remix-run/react";
import ModeToggle from "./ModeToggle";

const Navbar = () => {
  return (
    <nav className="bg-white  dark:bg-[color:var(--nav)]">
      <div className="flex items-center justify-between p-2 w-full min-h-20 mx-auto max-w-7xl px-8">
        <div>
          <Link to="/" className="font-extrabold text-xl">
            Where in the world?
          </Link>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
