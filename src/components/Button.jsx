export const Button = ({ variant, children, onClick }) => {
    return (
        <button onClick={onClick} className={`btn ${variant==='secondary' ? 'btn--secondary' : ''}`}>{children}</button>
    );
};
