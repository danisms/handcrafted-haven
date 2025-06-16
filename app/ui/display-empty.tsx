
export default function DisplayEmpty({ msg = "EMPTY" }: { msg: string }) {
    return (
        <>
            <div className="display-empty">
                <h1>{msg}</h1>
            </div>
        </>
    );
}