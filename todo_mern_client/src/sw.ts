import { precacheAndRoute } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope;

// Precache files
precacheAndRoute(self.__WB_MANIFEST);

// Add other routes and strategies as needed
