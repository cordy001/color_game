import { 
    __game__css 
} from "@/app/config/css";
import {
    useColorsRef
} from "@/app/modules";
 
export default function __Game() {

    const { color_1, color_2, color_3 } = useColorsRef();

    return(
        <section className={__game__css.game__container}>
            <div className={__game__css.colors__containers}>
                <span className={__game__css.color__1} ref={color_1}></span>
                <span className={__game__css.color__2} ref={color_2}></span>
                <span className={__game__css.color__3} ref={color_3}></span>
            </div>
        </section>
    );
}