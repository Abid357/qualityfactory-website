import Card from "../Card"

export default function Arrow({
    isRight = false,
    margin = 100
}: {
    isRight?: boolean;
    margin?: number;
}) {
    return (
        isRight ?
            <Card className={`ml-[${margin}px] w-8 h-6 text-center text-[#0C7E4A] hover:text-white hover:bg-[#0C7E4A] hover:cursor-pointer`}>
                →
            </Card>
            :
            <Card className={`mr-[${margin}px] w-8 h-6 text-center text-[#0C7E4A] hover:text-white hover:bg-[#0C7E4A] hover:cursor-pointer`}>
                ←
            </Card>
    );
}
