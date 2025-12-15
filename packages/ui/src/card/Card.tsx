import type React from "react";
import merge from "../utils/merge";
import styles from "./card.module.css";

interface ICard extends React.ComponentProps<"div"> {
	children: React.ReactNode;
}

const Card = ({ children, className, ...props }: ICard) => (
	<div className={merge(styles.Card, className)} {...props}>
		{children}
	</div>
);

interface ICardHeader extends React.ComponentProps<"div"> {
	children?: React.ReactNode;
}

const CardHeader = ({ children, className, ...props }: ICardHeader) => (
	<div className={merge(styles.CardHeader, className)} {...props}>
		{children}
	</div>
);

interface ICardContent extends React.ComponentProps<"div"> {
	children: React.ReactNode;
}

const CardContent = ({ children, className, ...props }: ICardContent) => (
	<div className={merge(styles.CardContent, className)} {...props}>
		{children}
	</div>
);

interface ICardFooter extends React.ComponentProps<"div"> {
	children: React.ReactNode;
}

const CardFooter = ({ children, className, ...props }: ICardFooter) => (
	<div className={merge(styles.CardFooter, className)} {...props}>
		{children}
	</div>
);

interface ICardTitle extends React.ComponentProps<"h2"> {
	children: React.ReactNode;
}

const CardTitle = ({ children, className, ...props }: ICardTitle) => (
	<h2 className={merge(styles.CardTitle, className)} {...props}>
		{children}
	</h2>
);

interface ICardDescription extends React.ComponentProps<"p"> {
	children: React.ReactNode;
}

const CardDescription = ({
	children,
	className,
	...props
}: ICardDescription) => (
	<p className={merge(styles.CardDescription, className)} {...props}>
		{children}
	</p>
);

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Description = CardDescription;

export default Card;
