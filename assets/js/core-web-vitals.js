/**
 * Core Web Vitals 监控和优化脚本
 * 监控LCP、FID、CLS等关键性能指标
 * 提升搜索引擎页面体验信号评分
 */

class CoreWebVitalsMonitor {
    constructor() {
        this.vitals = {
            lcp: null,
            fid: null,
            cls: null,
            fcp: null,
            ttfb: null
        };
        this.init();
    }

    /**
     * 初始化Core Web Vitals监控
     */
    init() {
        this.measureLCP();
        this.measureFID();
        this.measureCLS();
        this.measureFCP();
        this.measureTTFB();
        this.optimizePerformance();
        this.reportVitals();
    }

    /**
     * 测量Largest Contentful Paint (LCP)
     * 目标: < 2.5秒
     */
    measureLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.vitals.lcp = lastEntry.startTime;
                
                // LCP优化建议
                if (this.vitals.lcp > 2500) {
                    console.warn('LCP较慢，建议优化图片加载和关键资源');
                    this.optimizeLCP();
                }
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    /**
     * 测量First Input Delay (FID)
     * 目标: < 100毫秒
     */
    measureFID() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    this.vitals.fid = entry.processingStart - entry.startTime;
                    
                    if (this.vitals.fid > 100) {
                        console.warn('FID较高，建议优化JavaScript执行');
                        this.optimizeFID();
                    }
                });
            });
            observer.observe({ entryTypes: ['first-input'] });
        }
    }

    /**
     * 测量Cumulative Layout Shift (CLS)
     * 目标: < 0.1
     */
    measureCLS() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                this.vitals.cls = clsValue;
                
                if (this.vitals.cls > 0.1) {
                    console.warn('CLS较高，建议优化布局稳定性');
                    this.optimizeCLS();
                }
            });
            observer.observe({ entryTypes: ['layout-shift'] });
        }
    }

    /**
     * 测量First Contentful Paint (FCP)
     * 目标: < 1.8秒
     */
    measureFCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (entry.name === 'first-contentful-paint') {
                        this.vitals.fcp = entry.startTime;
                    }
                });
            });
            observer.observe({ entryTypes: ['paint'] });
        }
    }

    /**
     * 测量Time to First Byte (TTFB)
     * 目标: < 600毫秒
     */
    measureTTFB() {
        if ('performance' in window && 'timing' in performance) {
            const timing = performance.timing;
            this.vitals.ttfb = timing.responseStart - timing.requestStart;
        }
    }

    /**
     * LCP优化策略
     */
    optimizeLCP() {
        // 预加载关键图片
        const heroImage = document.querySelector('.hero img, .hero-image');
        if (heroImage && !heroImage.hasAttribute('loading')) {
            heroImage.setAttribute('loading', 'eager');
            heroImage.setAttribute('fetchpriority', 'high');
        }

        // 优化字体加载
        this.optimizeFontLoading();
    }

    /**
     * FID优化策略
     */
    optimizeFID() {
        // 延迟非关键JavaScript
        this.deferNonCriticalJS();
        
        // 使用Web Workers处理重计算
        this.useWebWorkers();
    }

    /**
     * CLS优化策略
     */
    optimizeCLS() {
        // 为图片添加尺寸属性
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
            img.addEventListener('load', () => {
                if (!img.width || !img.height) {
                    img.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
                }
            });
        });

        // 为动态内容预留空间
        this.reserveSpaceForDynamicContent();
    }

    /**
     * 优化字体加载
     */
    optimizeFontLoading() {
        // 使用font-display: swap
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'Inter';
                font-display: swap;
                src: url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 延迟非关键JavaScript
     */
    deferNonCriticalJS() {
        const scripts = document.querySelectorAll('script[src]:not([defer]):not([async])');
        scripts.forEach(script => {
            if (!script.src.includes('critical') && !script.src.includes('core-web-vitals')) {
                script.defer = true;
            }
        });
    }

    /**
     * 使用Web Workers处理重计算
     */
    useWebWorkers() {
        if ('Worker' in window) {
            // 为复杂计算创建Web Worker
            const workerCode = `
                self.onmessage = function(e) {
                    const { type, data } = e.data;
                    switch(type) {
                        case 'heavyCalculation':
                            // 执行重计算
                            const result = performHeavyCalculation(data);
                            self.postMessage({ type: 'result', data: result });
                            break;
                    }
                };
                
                function performHeavyCalculation(data) {
                    // 模拟重计算
                    return data;
                }
            `;
            
            const blob = new Blob([workerCode], { type: 'application/javascript' });
            const worker = new Worker(URL.createObjectURL(blob));
            
            // 存储worker引用以便后续使用
            window.performanceWorker = worker;
        }
    }

    /**
     * 为动态内容预留空间
     */
    reserveSpaceForDynamicContent() {
        const dynamicElements = document.querySelectorAll('[data-dynamic]');
        dynamicElements.forEach(element => {
            if (!element.style.minHeight) {
                element.style.minHeight = '100px'; // 预留最小高度
            }
        });
    }

    /**
     * 性能优化建议
     */
    optimizePerformance() {
        // 启用GPU加速
        const gpuElements = document.querySelectorAll('.hero, .navbar, .card');
        gpuElements.forEach(element => {
            element.style.transform = 'translateZ(0)';
            element.style.willChange = 'transform';
        });

        // 优化滚动性能
        this.optimizeScrollPerformance();
        
        // 实施资源提示
        this.implementResourceHints();
    }

    /**
     * 优化滚动性能
     */
    optimizeScrollPerformance() {
        // 使用passive事件监听器
        const scrollElements = document.querySelectorAll('[data-scroll]');
        scrollElements.forEach(element => {
            element.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        });

        // 节流滚动事件
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleWindowScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /**
     * 处理滚动事件
     */
    handleScroll(event) {
        // 滚动处理逻辑
    }

    /**
     * 处理窗口滚动事件
     */
    handleWindowScroll() {
        // 窗口滚动处理逻辑
    }

    /**
     * 实施资源提示
     */
    implementResourceHints() {
        const hints = [
            { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
            { rel: 'dns-prefetch', href: '//cdnjs.cloudflare.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
        ];

        hints.forEach(hint => {
            const link = document.createElement('link');
            Object.assign(link, hint);
            document.head.appendChild(link);
        });
    }

    /**
     * 报告Core Web Vitals数据
     */
    reportVitals() {
        // 延迟报告，确保所有指标都已收集
        setTimeout(() => {
            const report = {
                url: window.location.href,
                timestamp: Date.now(),
                vitals: this.vitals,
                userAgent: navigator.userAgent,
                connection: navigator.connection ? {
                    effectiveType: navigator.connection.effectiveType,
                    downlink: navigator.connection.downlink
                } : null
            };

            // 发送到分析服务（可选）
            this.sendToAnalytics(report);
            
            // 控制台输出
            console.group('🚀 Core Web Vitals 报告');
            console.log('LCP (Largest Contentful Paint):', this.vitals.lcp + 'ms');
            console.log('FID (First Input Delay):', this.vitals.fid + 'ms');
            console.log('CLS (Cumulative Layout Shift):', this.vitals.cls);
            console.log('FCP (First Contentful Paint):', this.vitals.fcp + 'ms');
            console.log('TTFB (Time to First Byte):', this.vitals.ttfb + 'ms');
            console.groupEnd();

            // 性能评分
            this.calculatePerformanceScore();
        }, 3000);
    }

    /**
     * 发送数据到分析服务
     */
    sendToAnalytics(report) {
        // 使用sendBeacon API发送数据
        if ('sendBeacon' in navigator) {
            const data = JSON.stringify(report);
            navigator.sendBeacon('/api/vitals', data);
        }
    }

    /**
     * 计算性能评分
     */
    calculatePerformanceScore() {
        let score = 100;
        
        // LCP评分
        if (this.vitals.lcp > 4000) score -= 30;
        else if (this.vitals.lcp > 2500) score -= 15;
        
        // FID评分
        if (this.vitals.fid > 300) score -= 30;
        else if (this.vitals.fid > 100) score -= 15;
        
        // CLS评分
        if (this.vitals.cls > 0.25) score -= 30;
        else if (this.vitals.cls > 0.1) score -= 15;

        console.log(`📊 页面性能评分: ${score}/100`);
        
        if (score < 70) {
            console.warn('⚠️ 页面性能需要优化');
        } else if (score < 90) {
            console.info('ℹ️ 页面性能良好，可进一步优化');
        } else {
            console.log('✅ 页面性能优秀');
        }
    }
}

// 初始化Core Web Vitals监控
document.addEventListener('DOMContentLoaded', () => {
    window.coreWebVitalsMonitor = new CoreWebVitalsMonitor();
});

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CoreWebVitalsMonitor;
}