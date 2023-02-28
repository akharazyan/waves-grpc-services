export type UpdatesListenerStatus = 'INITIAL' | 'CONNECTED' | 'CONNECTING' | 'RUNNING' | 'PAUSED' | 'STOPPED';

export type StatusChangeHandler = (newStatus: UpdatesListenerStatus, oldStatus: UpdatesListenerStatus) => void;

export interface IUpdatesListener {
    start(): void;
    pause(): void;
    resume(): void;
    stop(): void;
    getStatus(): UpdatesListenerStatus;
    onStatusChange(handler: StatusChangeHandler): () => void;
}
