"use client";

import AgoraRTC from "agora-rtc-sdk-ng";
import React, { useEffect, useState } from "react";
import Video from "./Video";
import { AgoraRTCProvider } from "agora-rtc-react";

interface CallProps {
    appId: string;
    channelName: string;
}

const Call: React.FC<CallProps> = ({ appId, channelName }) => {
    if (!appId) {
        throw new Error("Agora App ID is missing. Check .env.local.");
    }

    const client = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });


    useEffect(() => {
        const initTracks = async () => {
            const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
            client.publish([audioTrack, videoTrack]); // Publish tracks to the channel
        };

        client.join(appId, channelName, null).then(initTracks);

        return () => {
            client.leave();
        };
    }, [appId, channelName]);




    return (
        <AgoraRTCProvider client={client}>
            <div className="flex flex-col items-center bg-gray-900 min-h-screen">
                <div className="relative w-full h-full flex justify-center items-center bg-black">
                    <Video channelName={channelName} AppID={appId} />
                </div>

                <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-6 gap-6 z-10">




                    <a
                        href="/"
                        className="px-6 py-3 text-lg font-medium text-center text-white bg-red-500 rounded-full shadow-md hover:bg-red-600 transition-all duration-300"
                    >
                        End Call
                    </a>
                </div>
            </div>
        </AgoraRTCProvider>
    );
};

export default Call;
