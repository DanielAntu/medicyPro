import "./Message.css";

const Message = ({ msg, type }) => {
    return (
        <div className={`${type} message`}>
            <p>{msg}</p>
        </div>
    );
};

export default Message;
