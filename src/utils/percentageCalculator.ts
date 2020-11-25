const percentageCalculator = (closingPrice: number, currentPrice: number): number => {
    const result = (closingPrice - currentPrice) / closingPrice * 100;
    return result
}

export default percentageCalculator;