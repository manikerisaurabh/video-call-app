

import React from "react";
import Call from "../../components/Call";

export default async function Page({ params }: { params: Promise<{ channelName: string }> }) {
    // Unwrapping the params Promise
    const { channelName } = await params;

    return (
        <main className="flex w-full flex-col items-center bg-gray-800 py-10">
            <p className="absolute z-10 top-2 left-4 text-3xl font-bold text-white">
                Channel: {channelName}
            </p>

            <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-2xl p-6 mt-8">
                <Call appId={process.env.NEXT_PUBLIC_AGORA_APP_ID!} channelName={channelName} />
            </div>
        </main>
    );
}
