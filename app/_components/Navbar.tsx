import Avatar from "./base/Avatar"
import { Page } from "./base/Page"

const Navbar = ({}) => {
    return (
        <div className="w-full h-[64px] bg-black">
            <Page className="h-full">
                <div className="h-full flex justify-between">
                    <div>

                    </div>
                    <div className="h-full flex flex-col justify-center">
                        <Avatar className="w-[40px] h-[40px]" src="https://res.cloudinary.com/dfdk4g2pj/image/upload/v1686484160/118732079_10223558435893099_3741007992127305573_n_i30ygn.jpg"/>
                    </div>
                </div>
            </Page>
        </div>
    )
}

export default Navbar

