export const overLeft = (targetOver, completeOver) => {
	const [intPart, decimalPart] = completeOver.toString().split(".");
	var decimalFraction = parseFloat(`0.${decimalPart}`);
	if (decimalFraction !== -0) {
		decimalFraction = 0.6 - decimalFraction;
		const remainingOvers = targetOver - parseInt(intPart) - 1 + decimalFraction;
		return remainingOvers;
	} else {
		const remainingOvers = targetOver - parseInt(intPart);
		return remainingOvers;
	}
};

export const isMidOver = (over) => {
	if (over) {
		return over - parseInt(over) != 0 ? true : false;
	}
	return false;
};

export const getAdjustedTableType = (over) => {
	if (isMidOver(over)) {
		if (40 <= over && over <= 50) return "fiftyToForty";
		else if (30 <= over && over <= 40) return "fortyToThirty";
		else if (20 <= over && over <= 30) return "thirtyToTwenty";
		else if (10 <= over && over <= 20) return "twentyToTen";
		else if (0 <= over && over <= 10) return "tenToZero";
	} else {
		return "fiftyToZero";
	}
};
