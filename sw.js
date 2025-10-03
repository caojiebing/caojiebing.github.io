/**
 * Service Worker - PWA离线缓存支持
 * 作者: 曹洁冰
 * 功能: 缓存关键资源，提供离线访问能力
 */

const CACHE_NAME = 'caojiebing-site-v1.0.0';
const CACHE_URLS = [
    '/',
    '/index.html',
    '/assets/css/styles.css',
    '/assets/css/critical.css',
    '/assets/js/script.js',
    '/assets/js/chart-config.js',
    '/assets/images/logo.png',
    '/assets/images/ai-engineer.jpg',
    '/assets/certificate/certificates.html',
    '/assets/certificate/2017-best-newcomer.html',
    '/assets/certificate/2018-fastest-progress.html',
    '/assets/certificate/2018-excellent-employee.html',
    '/assets/certificate/2019-innovation-breakthrough.html',
    '/assets/certificate/2019-excellent-pm.html',
    '/manifest.json'
];

// 安装事件 - 缓存关键资源
self.addEventListener('install', event => {
    console.log('Service Worker: 安装中...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: 缓存文件');
                return cache.addAll(CACHE_URLS);
            })
            .then(() => {
                console.log('Service Worker: 安装完成');
                return self.skipWaiting();
            })
            .catch(err => {
                console.error('Service Worker: 安装失败', err);
            })
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
    console.log('Service Worker: 激活中...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('Service Worker: 删除旧缓存', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: 激活完成');
                return self.clients.claim();
            })
    );
});

// 拦截请求 - 缓存优先策略
self.addEventListener('fetch', event => {
    // 只处理GET请求
    if (event.request.method !== 'GET') {
        return;
    }

    // 跳过非同源请求
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 如果缓存中有，直接返回
                if (response) {
                    console.log('Service Worker: 从缓存返回', event.request.url);
                    return response;
                }

                // 否则从网络获取
                console.log('Service Worker: 从网络获取', event.request.url);
                return fetch(event.request)
                    .then(response => {
                        // 检查响应是否有效
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // 克隆响应，因为响应流只能使用一次
                        const responseToCache = response.clone();

                        // 将新资源添加到缓存
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(err => {
                        console.error('Service Worker: 网络请求失败', err);
                        
                        // 如果是HTML页面请求失败，返回离线页面
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        
                        throw err;
                    });
            })
    );
});

// 消息处理 - 支持手动更新缓存
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'UPDATE_CACHE') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => {
                    return cache.addAll(CACHE_URLS);
                })
                .then(() => {
                    event.ports[0].postMessage({ success: true });
                })
                .catch(err => {
                    console.error('Service Worker: 更新缓存失败', err);
                    event.ports[0].postMessage({ success: false, error: err.message });
                })
        );
    }
});

// 后台同步支持
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        console.log('Service Worker: 后台同步');
        event.waitUntil(
            // 这里可以添加后台同步逻辑
            Promise.resolve()
        );
    }
});

// 推送通知支持
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/assets/images/logo.png',
            badge: '/assets/images/logo.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: data.primaryKey
            },
            actions: [
                {
                    action: 'explore',
                    title: '查看详情',
                    icon: '/assets/images/logo.png'
                },
                {
                    action: 'close',
                    title: '关闭',
                    icon: '/assets/images/logo.png'
                }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// 通知点击处理
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});