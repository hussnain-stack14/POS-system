/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--primary)',
                    hover: 'var(--primary-hover)',
                    foreground: 'var(--primary-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)',
                },
                success: 'var(--success)',
                warning: 'var(--warning)',
                background: 'var(--background)',
                surface: {
                    DEFAULT: 'var(--surface)',
                    hover: 'var(--surface-hover)',
                },
                border: 'var(--border)',
                foreground: {
                    DEFAULT: 'var(--foreground)',
                    muted: 'var(--foreground-muted)',
                },
            },
            borderRadius: {
                sm: 'var(--radius-sm)',
                md: 'var(--radius-md)',
                lg: 'var(--radius-lg)',
            },
        },
    },
    plugins: [],
}
