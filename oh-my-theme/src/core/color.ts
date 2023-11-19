export function hexToRgb(hex: string): number[] {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [0, 0, 0];
}

function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number): string {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

}

export function rgbToAnsi256(r: number, g: number, b: number): number {
    // We use the extended greyscale palette here, with the exception of
    // black and white. normal palette only has 4 greyscale shades.
    if (r >> 4 === g >> 4 && g >> 4 === b >> 4) {
        if (r < 8) {
            return 16;
        }

        if (r > 248) {
            return 231;
        }

        return Math.round(((r - 8) / 247) * 24) + 232;
    }

    const ansi =
        16 +
        36 * Math.round((r / 255) * 5) +
        6 * Math.round((g / 255) * 5) +
        Math.round((b / 255) * 5);

    return ansi;
}

const black = "#2e3436"
const BLACK = "#555753"
const red = "#cc0000"
const RED = "#ef2929"
const green = "#4e9a06"
const GREEN = "#8ae234"
const yellow = "#c4a000"
const YELLOW = "#fce94f"
const blue = "#3465a4"
const BLUE = "#729fcf"
const magenta = "#75507b"
const MAGENTA = "#ad7fa8"
const cyan = "#06989a"
const CYAN = "#34e2e2"
const white = "#d3d7cf"
const WHITE = "#eeeeec"

enum AnsiColorTableEnum {
    black = 0,
    red,
    green,
    yellow,
    blue,
    magenta,
    cyan,
    white,
    BLACK,
    RED,
    GREEN,
    YELLOW,
    BLUE,
    MAGENTA,
    CYAN,
    WHITE
};

export function ansi256ToRgb(ansi: number): number[] {
    if (ansi < 16) {
        return hexToRgb(AnsiColorTableEnum[ansi])
    }
    if (ansi >= 232) {
        let c = (ansi - 232) * 10 + 8
        return [c, c, c]
    }

    let color = ansi - 16
    let remainder = color % 36
    let r = Math.floor((color / 36) * 255 / 5)
    let g = Math.floor((remainder / 6) * 255 / 5)
    let b = Math.floor((remainder % 6) * 255 / 5)

    return [r, g, b]
}

export function hexToAnsi(hex: string): number {
    let rgb = hexToRgb(hex)
    return rgbToAnsi256(rgb[0], rgb[1], rgb[2])
}

export function ansiToHex(ansi: number): string {
    let rgb = ansi256ToRgb(ansi)
    return rgbToHex(rgb[0], rgb[1], rgb[2])
}
