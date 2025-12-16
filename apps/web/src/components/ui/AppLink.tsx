import type { LinkProps as BaseLinkProps } from "@tanstack/react-router";
import { Link as BaseLink } from "@tanstack/react-router";

const AppLink = ({ children, ...props }: BaseLinkProps) => {
	return <BaseLink {...props}>{children}</BaseLink>;
};

export default AppLink;
