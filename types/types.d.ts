declare module "agora-rtc-sdk-ng" {
    export function createClient(config: { mode: string; codec: string }): IAgoraRTCClient;

    export interface IAgoraRTCClient {
        join(appId: string, channel: string, token: string | null, uid?: string | number): Promise<string | number>;
        leave(): Promise<void>;
        publish(tracks: any[]): Promise<void>;
        subscribe(user: any, mediaType: "video" | "audio"): Promise<void>;
        on(event: string, callback: (...args: any[]) => void): void;
    }
}
