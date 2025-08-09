import Image from "next/image";
import anime from "../assets/basil.jpeg";
import { ImStatsBars } from "react-icons/im";
import { useContext } from "react";
import { authContext } from "../../../auth-context";

function Nav() {
    const { user, loading, logout } = useContext(authContext)


    return (
        <>
            <header className="container max-w-2xl px-6 py-6 mx-auto" >
                <div className="flex items-center justify-between">

                    {/* user information */}

                    {user && !loading && (
                        <div className="flex items-center gap-2">
                            <div className="h-[50px] w-[50px] rounded-full overflow-hidden" >
                                <Image width={96} height={96} src={user.photoURL} alt={user.displayName} referrerPolicy="no-referrer" className="object-cover w-full h-full" />
                            </div>
                            <small>Hi, {user.displayName}</small>
                        </div>
                    )}

                    {/* right side of navigation */}
                    {user && !loading && (

                        <nav className="flex items-center gap-4">
                            <div><ImStatsBars className="text-2xl" /></div>
                            <div><button onClick={logout} className="btn btn-danger">Sign out</button></div>
                        </nav>
                    )}

                </div>
            </header>
        </>
    )
}

export default Nav