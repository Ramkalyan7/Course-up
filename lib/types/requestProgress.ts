export type ProgressStatus = "in_progress" | "completed";

export interface ProgressUpdate {
    status: ProgressStatus;
    message: string;
}