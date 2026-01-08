import Input from "@repo/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/locales/useT";
import styles from "./YearPicker.module.css";

interface YearPickerProps {
	defaultValue?: number;
	years: number[];
	name: string;
	onChange?: (year: number) => void;
}

export function YearPicker({
	defaultValue,
	years,
	name,
	onChange,
}: YearPickerProps) {
	const { t } = useT();
	const currentYear = new Date().getFullYear();
	const [selectedYear, setSelectedYear] = useState(defaultValue ?? currentYear);
	const scrollContainerRef = useRef<HTMLUListElement>(null);
	const yearRefs = useRef<Map<number, HTMLLIElement>>(new Map());
	const selectedIndex = years.indexOf(selectedYear);

	useEffect(() => {
		if (scrollContainerRef.current && selectedIndex >= 0) {
			const selectedElement = yearRefs.current.get(selectedYear);
			if (selectedElement)
				selectedElement.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
					inline: "center",
				});
		}
	}, []);

	const handleYearClick = (year: number) => {
		setSelectedYear(year);
		onChange?.(year);
		const element = yearRefs.current.get(year);
		if (element && scrollContainerRef.current) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "center",
			});
		}
	};

	const handlePrev = () => {
		if (selectedIndex > 0) {
			const prevYear = years[selectedIndex - 1];
			handleYearClick(prevYear);
		}
	};

	const handleNext = () => {
		if (selectedIndex < years.length - 1) {
			const nextYear = years[selectedIndex + 1];
			handleYearClick(nextYear);
		}
	};

	const canScrollPrev = selectedIndex > 0;
	const canScrollNext = selectedIndex < years.length - 1;

	return (
		<div className={styles.YearPicker}>
			<Input type="hidden" name={name} value={selectedYear} />
			<div className={styles.CarouselContainer}>
				<button
					type="button"
					className={styles.ScrollButton}
					onClick={handlePrev}
					disabled={!canScrollPrev}
					aria-label={t("prev")}
					title={t("prev")}
				>
					<ChevronLeft />
				</button>
				<ul className={styles.Carousel} ref={scrollContainerRef}>
					{years.map((year) => (
						<li
							key={year}
							ref={(el) => {
								if (el) yearRefs.current.set(year, el);
								else yearRefs.current.delete(year);
							}}
							id={`year-${year}`}
						>
							<button
								type="button"
								className={`${styles.YearPill} ${
									selectedYear === year ? styles.YearPillSelected : ""
								}`}
								onClick={() => handleYearClick(year)}
								aria-pressed={selectedYear === year}
							>
								{year}
							</button>
						</li>
					))}
				</ul>
				<button
					type="button"
					className={styles.ScrollButton}
					onClick={handleNext}
					disabled={!canScrollNext}
					aria-label={t("next")}
					title={t("next")}
				>
					<ChevronRight />
				</button>
			</div>
		</div>
	);
}
