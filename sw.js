// Service Worker for Portfolio PWA
const CACHE_NAME = 'portfolio-v1.2.0';
const STATIC_CACHE = 'static-v1.2.0';
const DYNAMIC_CACHE = 'dynamic-v1.2.0';

// Assets to cache on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/images/Mypicture.jpg',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('📦 Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('✅ Service Worker: Static assets cached');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('❌ Service Worker: Cache failed', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('🚀 Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cache) => {
                        if (cache !== STATIC_CACHE && cache !== DYNAMIC_CACHE) {
                            console.log('🗑️ Service Worker: Deleting old cache', cache);
                            return caches.delete(cache);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
    const { request } = event;
    
    // Skip non-GET requests
    if (request.method !== 'GET') return;
    
    // Skip external requests (except fonts and CDN assets we cache)
    const url = new URL(request.url);
    if (url.origin !== location.origin && 
        !url.hostname.includes('fonts.googleapis.com') &&
        !url.hostname.includes('cdnjs.cloudflare.com')) {
        return;
    }
    
    event.respondWith(
        // Try cache first
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    console.log('📦 Serving from cache:', request.url);
                    return cachedResponse;
                }
                
                // If not in cache, fetch from network
                return fetch(request)
                    .then((networkResponse) => {
                        // Clone the response before caching
                        const responseClone = networkResponse.clone();
                        
                        // Cache successful responses
                        if (networkResponse.status === 200) {
                            caches.open(DYNAMIC_CACHE)
                                .then((cache) => {
                                    cache.put(request, responseClone);
                                });
                        }
                        
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('🌐 Network fetch failed:', error);
                        
                        // Return offline page for navigation requests
                        if (request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        
                        // Return placeholder for images
                        if (request.destination === 'image') {
                            return new Response(
                                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Image Unavailable</text></svg>',
                                { headers: { 'Content-Type': 'image/svg+xml' } }
                            );
                        }
                        
                        throw error;
                    });
            })
    );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'contact-form') {
        event.waitUntil(
            // Handle offline form submissions
            handleOfflineFormSubmission()
        );
    }
});

async function handleOfflineFormSubmission() {
    try {
        const formData = await getStoredFormData();
        if (formData) {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                await clearStoredFormData();
                console.log('✅ Offline form submission successful');
            }
        }
    } catch (error) {
        console.error('❌ Offline form submission failed:', error);
    }
}

async function getStoredFormData() {
    // Implementation would depend on IndexedDB usage
    return null;
}

async function clearStoredFormData() {
    // Implementation would depend on IndexedDB usage
    return null;
}

// Push notification handling (for future use)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/images/icon-192.png',
            badge: '/images/icon-72.png',
            data: data.url,
            actions: [
                {
                    action: 'open',
                    title: 'Open Portfolio'
                },
                {
                    action: 'close',
                    title: 'Close'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'open') {
        event.waitUntil(
            clients.openWindow(event.notification.data || '/')
        );
    }
});

// Performance monitoring
self.addEventListener('message', (event) => {
    if (event.data.type === 'PERFORMANCE_METRICS') {
        console.log('📊 Performance metrics:', event.data.metrics);
    }
});

console.log('🚀 Service Worker: Loaded successfully'); 