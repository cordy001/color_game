import {
    header__css
} from "@/app/config/css";

import Image from "next/image";

export default function Header() {

    const Image__size = 120;

    return(
        <header className={header__css.header__container}>
            <div className={header__css.header__wrapper}>
                <Image 
                src="/logo.png"
                alt="Logo "
                title="My Logo"
                width={Image__size}
                height={Image__size}
                />
            </div>
        </header>
    );
}