import type { LogLevel, LogFormatter } from '../../types';

class Logger {
    private static LEVEL: Record<LogLevel, number> = {
        none: 0,
        error: 1,
        warn: 2,
        info: 3,
    };
    private readonly level: LogLevel;
    private readonly label: string | undefined;
    private readonly format: LogFormatter;

    private defaultFormat: LogFormatter = (level, ...args) => {
        let prefix = '';
        if (level === 'error') {
            prefix = '[ERROR]';
        }
        if (level === 'warn') {
            prefix = '[WARN]';
        }
        if (this.label) {
            prefix += `[${this.label}]`;
        }
        return prefix ? [prefix, ...args] : args;
    };

    private log(level: LogLevel, ...args: unknown[]) {
        if (Logger.LEVEL[level] <= Logger.LEVEL[this.level]) {
            return;
        }
        console.log(...this.format(level, ...args));
    }

    constructor(
        level: LogLevel,
        options?: {
            label?: string;
            format?: LogFormatter;
        },
    ) {
        const { label, format } = options ?? {};

        this.level = level;
        this.label = label;
        this.format = format ?? this.defaultFormat;
    }

    info = (...args: unknown[]) => this.log('info', ...args);
    warn = (...args: unknown[]) => this.log('warn', ...args);
    error = (...args: unknown[]) => this.log('error', ...args);
}

export default Logger;
