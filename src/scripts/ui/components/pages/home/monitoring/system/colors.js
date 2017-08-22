export const GREEN = '#00C853';
export const BLUE = '#2962FF';
export const YELLOW = '#F57F17';
export const LIGHT_YELLOW = '#FFD600';
export const RED = '#B71C1C';
export const LIGHT_RED = '#D50000';

export function getUsageColor(usage = 0) {
    if (usage < 25) {
        return GREEN;
    }

    if (usage >= 25 && usage < 50) {
        return LIGHT_YELLOW;
    }

    if (usage >= 50 && usage < 75) {
        return YELLOW;
    }

    if (usage >= 75 && usage < 90) {
        return LIGHT_RED;
    }

    return RED;
}
