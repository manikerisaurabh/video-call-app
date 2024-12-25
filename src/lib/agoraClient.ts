import { createClient } from "agora-rtc-sdk-ng";

const client = createClient({
    mode: "rtc",
    codec: "vp8",
});

export default client;
