"use client"
import React, { useEffect, useRef, useState } from "react";
import client from "../../lib/agoraClient";

const VideoCall = () => {
    const [isJoined, setIsJoined] = useState(false);
    const localVideoRef = useRef<HTMLDivElement>(null);
    const remoteVideoRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
    const TEMP_TOKEN = process.env.NEXT_PUBLIC_TEMP_TOKEN!;
    const CHANNEL_NAME = process.env.NEXT_PUBLIC_CHANNEL_NAME!;

    useEffect(() => {
        const joinChannel = async () => {
            try {
                await client.join(APP_ID, CHANNEL_NAME, TEMP_TOKEN);
                const [localAudioTrack, localVideoTrack] = await client.createLocalTracks();

                if (localVideoRef.current) {
                    localVideoTrack.play(localVideoRef.current);
                }

                await client.publish([localAudioTrack, localVideoTrack]);
                setIsJoined(true);

                client.on("user-published", async (user, mediaType) => {
                    await client.subscribe(user, mediaType);
                    if (mediaType === "video") {
                        const remoteVideoTrack = user.videoTrack;
                        const remoteVideoElement = document.createElement("div");
                        remoteVideoRefs.current.set(user.uid.toString(), remoteVideoElement);
                        document.getElementById("remote-videos")?.append(remoteVideoElement);
                        remoteVideoTrack.play(remoteVideoElement);
                    }
                });

                client.on("user-unpublished", (user) => {
                    const remoteVideoElement = remoteVideoRefs.current.get(user.uid.toString());
                    if (remoteVideoElement) {
                        remoteVideoElement.remove();
                        remoteVideoRefs.current.delete(user.uid.toString());
                    }
                });
            } catch (error) {
                console.error("Error joining channel:", error);
            }
        };

        joinChannel();

        return () => {
            client.leave();
            setIsJoined(false);
        };
    }, []);

    return (
        <div>
            <h1>Agora Video Call</h1>
            <div id="local-video" ref={localVideoRef} style={{ width: "300px", height: "300px", backgroundColor: "black" }}></div>
            <div id="remote-videos" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}></div>
        </div>
    );
};

export default VideoCall;
