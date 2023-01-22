export const Card = ({ children, ...rest }) => {
	return (
		<div className="card" {...rest}>
			{children}
		</div>
	);
};
