import { Injectable } from "@angular/core";
import rgbHex from 'rgb-hex';
import hexRgb from 'hex-rgb';

@Injectable()
export class ColorHelper {
    public rgbToHex(color: string): string {
        if (color?.startsWith('#')) return color;
        return `#${rgbHex(color).toUpperCase()}`
    }

    public hexToRgba(color: string, opacity: number): string {
        const rgb = hexRgb(color, { alpha: opacity / 100, format: "object" });
        return `#${rgbHex(`rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${opacity}%)`)}`.toUpperCase();
    }

    public hexToRgb(color: string): string {
        const rgb = hexRgb(color, { format: "object" });
        return `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
    }
}