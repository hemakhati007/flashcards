const Prompt = () => {
    return (
        <>
            <div className="row align-items-center" style={{ height: "10vh" }}>
            <div className="col-2">
                <button
                    type="button"
                    className="btn btn-primary rounded-circle p-0"
                    style={{ width: "50px", height: "50px" }}
                >
                    +
                </button>

            </div>
            <div className="col-10">
                <div className="input-group">
                    {/* <span className="input-group-text" id="addon-wrapping">@</span> */}
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter prompt"
                        aria-label="prompt"
                        aria-describedby="addon-wrapping"
                    />
                </div>
                </div>
            </div>
        </>

    )
}
export default Prompt;