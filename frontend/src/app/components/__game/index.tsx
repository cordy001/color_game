import { 
    __game__css
} from "@/app/config/css";
import {
    useColorsRef,
    useColorsState,
    GenerateColors,
    ChoosinColors,
    WagmiTransferToken,
    CalculateRewards
} from "@/app/modules";
import { 
    ClimbingBoxLoader
} from "react-spinners";
import {
    useAccount,
    useBalance
} from "wagmi";
import config from "@/app/config/conf/setting.json";
 
export default function __Game() {

    const { color_1, color_2, color_3 } = useColorsRef();

    const { showStatus, setShowStatus } = useColorsState();

    const { chosenColors, setChosenColors } = useColorsState(); 

    const { points, setPoints } = useColorsState();

    const { cost, setCost } = useColorsState();

    const { address } = useAccount();

    const tokenAddress = (process.env.NEXT_PUBLIC_ShityAddress || config.PUBLIC_ACCESS.CONTRACT_ADDRESS) as `0x${string}`;

    const { data: tokenBalance, isLoading, refetch } = useBalance({
        address,
        token: tokenAddress
    });
    

    const HandleSpin = async() => {
        
        if (chosenColors.length <= 0) return alert("Please pick colors or more");

        const newCost = chosenColors.length * 10;
        setCost(newCost);

        if (!address) {
            alert("Wallet address not found.");
            return;
        }
        const transacs = await WagmiTransferToken(address, newCost);

        await refetch();

        if (!transacs || transacs !== true) return;

        setShowStatus(true);

        const result = await GenerateColors(color_1, color_2, color_3);

        

        setTimeout(async() => {
            const totalPoints = await CalculateRewards(result, chosenColors);
            
            setPoints(totalPoints);

            setShowStatus(false);
            
        if (totalPoints) {
            const res = await fetch("/services/api/prize", {
                method: "POST",
                body: JSON.stringify({address, totalPoints}),
                headers: { "Content-Type": "application/json" }

            });

            const data = await res.json();

            await refetch();

            

            console.log("Reward Recieve ", data);

        }


        }, 1000);

        
        
    };

    const ClearArrays = () => {
        setChosenColors([]);
        ChoosinColors(setChosenColors, "CLEAR");
    };

    return(
        <section className={__game__css.game__container}>
            <div className={__game__css.game__info}>
                <p>Choosen Colors: <strong>{chosenColors.join(", ")}</strong></p>
                <p>Total Bet: <strong>{cost}</strong> Wins: <strong>{points}</strong></p>
                <p><strong>{isLoading
                ? "Loading token balance..."
                : `Balance: ${tokenBalance?.formatted} ${tokenBalance?.symbol}`}</strong> </p>
            </div>
            <div
                className={__game__css.colors__containers}
                style={{ display: showStatus ? "flex" : "none" }}
            >
                <ClimbingBoxLoader loading color="#746c6cff"/>
            </div>
            <div
                className={__game__css.colors__containers}
                style={{ display: showStatus ? "none" : "flex" }}
            >
                <span className={__game__css.color__1} ref={color_1}></span>
                <span className={__game__css.color__2} ref={color_2}></span>
                <span className={__game__css.color__3} ref={color_3}></span>
            </div>
            <div className={__game__css.buttons}>
                <button disabled={showStatus} ><a href="/players">Online Servers</a></button>
                <button disabled={showStatus} style={{ background: "#f00" }} onClick={ClearArrays}>Clear Choosen Colors</button>
                <button 
                    onClick={HandleSpin}
                    disabled={showStatus}
                    style={{ background: "#00f" }}
                >{showStatus ? "Generating..." : "Generate"}</button>
            </div>
            <div className={__game__css.game__controller}>
                <h2>Choose Your Colors</h2>
                <button style={{ background: "#f00" }} disabled={showStatus} onClick={() => ChoosinColors(setChosenColors, "red")}>Red</button>
                <button style={{ background: "#0f0" }} disabled={showStatus} onClick={() => ChoosinColors(setChosenColors, "green")}>Green</button>
                <button style={{ background: "#00f" }} disabled={showStatus} onClick={() => ChoosinColors(setChosenColors, "blue")}>Blue</button>
                <button style={{ background: "#ff0" }} disabled={showStatus} onClick={() => ChoosinColors(setChosenColors, "yellow")}>Yellow</button>
                <button style={{ background: "#c4c4c4ff" }} disabled={showStatus} onClick={() => ChoosinColors(setChosenColors, "white")}>White</button>
                <button style={{ background: "#f0f" }} disabled={showStatus} onClick={() => ChoosinColors(setChosenColors, "pink")}>Pink</button>
            </div>
        </section>
    );
}