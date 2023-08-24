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
