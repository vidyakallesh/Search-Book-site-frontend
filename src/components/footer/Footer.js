import React from "react";
import "./footer.css";

export default function Footer() {
	return (
		<>
			<div className="main-footer">
				<p>@copyright {new Date().getFullYear()} Book-Store.</p>
			</div>
		</>
	);
}
