import React from "react";

const InvalidAuth = (props: any) => {
	return (
		<div>
			<p> code {props.code} not valid </p>
		</div>
	);
};

export default InvalidAuth;
