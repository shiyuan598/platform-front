export function formatBytes(bytes) {
    const units = ["B", "K", "M", "G", "T", "P", "E"];
    let unitIndex = 0;

    while (bytes >= 100 && unitIndex < units.length - 1) {
        bytes /= 1024;
        unitIndex++;
    }

    return `${bytes.toFixed(1)} ${units[unitIndex]}`;
}
