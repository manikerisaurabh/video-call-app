"use client";

import React, { useState } from "react";
import {
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteUsers,
} from "agora-rtc-react";

interface VideoProps {
    AppID: string;
    channelName: string;
}

const Video: React.FC<VideoProps> = ({ AppID, channelName }) => {
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
    const remoteUsers = useRemoteUsers();

    const [isMicMuted, setIsMicMuted] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);

    // Publish both local audio and video tracks to the channel
    usePublish([localMicrophoneTrack, localCameraTrack]);

    // Join the channel
    useJoin({
        appid: AppID,
        channel: channelName,
        token: null,
    });

    if (isLoadingMic || isLoadingCam) {
        return <p>Loading...</p>;
    }

    const toggleMic = () => {
        if (localMicrophoneTrack) {
            if (isMicMuted) {
                localMicrophoneTrack.setEnabled(true); // Unmute
            } else {
                localMicrophoneTrack.setEnabled(false); // Mute
            }
            setIsMicMuted(!isMicMuted); // Toggle mute state
        }
    };

    const toggleVideo = () => {
        if (localCameraTrack) {
            if (isVideoMuted) {
                localCameraTrack.setEnabled(true); // Start video
            } else {
                localCameraTrack.setEnabled(false); // Stop video
            }
            setIsVideoMuted(!isVideoMuted); // Toggle video state
        }
    };

    return (
        <div className="flex flex-wrap justify-center">
            {/* Remote Users' Video Tracks */}
            {remoteUsers.map((user) => (
                <div key={user.uid} className="m-2">
                    <video
                        ref={(element) => {
                            if (element) user.videoTrack?.play(element);
                        }}
                        autoPlay
                        playsInline
                        muted={false}
                    />
                </div>
            ))}

            {/* Local User's Video Track */}
            {localCameraTrack && (
                <div className="m-2">
                    <video
                        ref={(element) => {
                            if (element) localCameraTrack?.play(element);
                        }}
                        autoPlay
                        playsInline
                        muted
                    />
                </div>
            )}

            {/* Control Buttons for Mute/Unmute and Start/Stop Video */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 space-x-4">
                {/* Mute/Unmute Button */}
                <button
                    onClick={toggleMic}
                    className={`px-4 py-2 rounded-full ${isMicMuted ? "bg-red-600" : "bg-green-600"
                        } text-white`}
                >
                    {isMicMuted ? "Unmute Mic" : "Mute Mic"}
                </button>

                {/* Start/Stop Video Button */}
                <button
                    onClick={toggleVideo}
                    className={`px-4 py-2 rounded-full ${isVideoMuted ? "bg-red-600" : "bg-green-600"
                        } text-white`}
                >
                    {isVideoMuted ? "Start Video" : "Stop Video"}
                </button>
            </div>
        </div>
    );
};

export default Video;
