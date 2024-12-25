"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Form = () => {
    const router = useRouter(); // Use useRouter for client-side navigation

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            channel: { value: string };
        };
        const channelName = target.channel.value.trim(); // Trim extra spaces
        if (channelName) {
            router.push(`/channel/${channelName}`); // Navigate to the channel
        } else {
            alert("Please enter a valid channel name.");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 p-10">
            <h1 className="mb-8 text-5xl font-extrabold leading-none text-white">
            </h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <div className="md:flex md:items-center mb-6">
                    <div>
                        <label
                            className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="channel-name"
                        >
                            Channel Name
                        </label>
                    </div>
                    <div>
                        <input
                            className="bg-gray-100 border-2 border-gray-300 rounded-xl w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition-all duration-300 ease-in-out"
                            id="channel-name"
                            type="text"
                            name="channel"
                            placeholder="Enter channel name"
                            required
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center px-6 py-3 mt-5 text-lg font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300"
                    >
                        Join Channel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
