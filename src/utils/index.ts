import { clsx, type ClassValue } from 'clsx';
import sha256 from 'crypto-js/sha256';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const acronym = (value: string): string => {
    return value.trim().substring(0, 1).toUpperCase();
};

export function gravatar(value: string, size: number = 150): string {
    const hashedEmail = sha256(value);

    return `https://www.gravatar.com/avatar/${hashedEmail}?s=${size}&d=mp`;
}

export function toRupiah(value: string) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(parseFloat(value));
}

export function formatDateTime(value: Date, formatStr: string = 'HH.mm a, dd MMMM yyyy'): string {
    return format(new Date(value), formatStr);
}
