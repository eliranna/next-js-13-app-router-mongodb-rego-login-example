import Link from "next/link"
import Avatar from "./base/Avatar"
import { Page } from "./base/Page"

const Navbar = ({}) => {
    return (
        <div className="w-full h-[64px] bg-black">
            <Page className="h-full">
                <div className="h-full flex justify-between">
                    <div className="flex flex-col justify-center">
                        <Link href="/">
                            <img src="/icons/atom.svg" className="invert w-[30px]"/>
                        </Link>
                    </div>
                    <div className="h-full flex flex-col justify-center">
                        <Avatar size={35} src="https://res.cloudinary.com/dfdk4g2pj/image/upload/v1686484160/118732079_10223558435893099_3741007992127305573_n_i30ygn.jpg"/>
                    </div>
                </div>
            </Page>
        </div>
    )
}

export default Navbar

