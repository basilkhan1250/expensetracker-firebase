import Image from "next/image";
import anime from "../assets/basil.jpeg";
import { ImStatsBars } from "react-icons/im";

function Nav() {
    return (
        <>
            <header className="container max-w-2xl px-6 py-6 mx-auto" >
                <div className="flex items-center justify-between">

                    {/* user information */}

                    <div className="flex items-center gap-2">
                        <div className="h-[50px] w-[50px] rounded-full overflow-hidden" >
                            <Image src={anime} alt="basil" className="object-cover w-full h-full" />
                        </div>
                        <small>Hi, Basil</small>
                    </div>

                    {/* right side of navigation */}

                    <nav className="flex items-center gap-2">
                        <div><ImStatsBars className="text-2xl" /></div>
                        <div><button className="btn">Sign out</button></div>
                    </nav>

                </div>
            </header>
        </>
    )
}

export default Nav