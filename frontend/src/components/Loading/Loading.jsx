import Message from "../Message/Message";

const Loading = ({ loading, error, msg, type, btnvalue }) => {
    return (
        <div>
            {!loading && (
                <input type="submit" value={btnvalue} className="btn" />
            )}
            {loading && (
                <input
                    type="submit"
                    value="Aguarde..."
                    disabled
                    className="btn"
                />
            )}
            {error && <Message msg={msg} type={type} />}
        </div>
    );
};

export default Loading;
