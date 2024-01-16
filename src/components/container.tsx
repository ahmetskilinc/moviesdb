import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
	return <div className="mx-auto max-w-cs pt-16 xl:px-0">{children}</div>;
}
