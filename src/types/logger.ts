export type LogLevel = 'none' | 'info' | 'warn' | 'error';

export type LogFormatter = (level: LogLevel, ...args: unknown[]) => any[];
