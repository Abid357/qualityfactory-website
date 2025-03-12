import Arrow from "./Arrow"

export default function Cap() {
    return (
        <div className="flex flex-row justify-center">
            <Arrow />
            <div className="w-8 h-5 mt-1 bg-red-700 rounded-[4px]" />
            <Arrow isRight={true}/>
        </div>
    )
}
