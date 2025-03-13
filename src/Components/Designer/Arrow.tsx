import Card from "../Card"

export default function Arrow({ isRight = false, margins = "mr-[100px]", onClick = () => { } }) {
    return (
        isRight ?
            <button onClick={onClick}>
                <Card className={`w-8 h-6 text-center text-[#0C7E4A] hover:text-white hover:bg-[#0C7E4A] hover:cursor-pointer ${margins}`}>
                    →
                </Card>
            </button>
            :
            <button onClick={onClick}>
                <Card className={`w-8 h-6 text-center text-[#0C7E4A] hover:text-white hover:bg-[#0C7E4A] hover:cursor-pointer ${margins}`}>
                    ←
                </Card>
            </button>
    );
}
