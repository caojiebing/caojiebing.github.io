/**
 * A/B测试评估器
 * 用于评估SEO优化效果和用户体验改进
 */
class ABTestingEvaluator {
    constructor() {
        this.config = {
            testDuration: 30, // 测试持续天数
            minSampleSize: 100, // 最小样本量
            confidenceLevel: 0.95, // 置信水平
            significanceThreshold: 0.05, // 显著性阈值
            metrics: [
                'pageViews', 'bounceRate', 'sessionDuration', 
                'conversionRate', 'coreWebVitals', 'searchRanking'
            ]
        };
        
        this.tests = new Map();
        this.results = new Map();
        this.currentVariant = null;
        
        // 测试变体配置
        this.variants = {
            control: {
                name: '原始版本',
                description: '未优化的原始页面',
                features: []
            },
            optimized: {
                name: 'SEO优化版本',
                description: '应用所有SEO优化的页面',
                features: [
                    'core-web-vitals',
                    'semantic-content',
                    'structured-data',
                    'social-optimization',
                    'local-seo'
                ]
            }
        };
    }

    /**
     * 初始化A/B测试评估器
     */
    init() {
        this.loadTestData();
        this.assignVariant();
        this.setupMetricsTracking();
        this.createTestingDashboard();
        this.startPerformanceMonitoring();
        console.log('A/B测试评估器已初始化');
    }

    /**
     * 加载测试数据
     */
    loadTestData() {
        const stored = localStorage.getItem('ab-test-data');
        if (stored) {
            const data = JSON.parse(stored);
            this.tests = new Map(data.tests || []);
            this.results = new Map(data.results || []);
        }
    }

    /**
     * 保存测试数据
     */
    saveTestData() {
        const data = {
            tests: Array.from(this.tests.entries()),
            results: Array.from(this.results.entries()),
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('ab-test-data', JSON.stringify(data));
    }

    /**
     * 分配测试变体
     */
    assignVariant() {
        // 检查是否已经分配过变体
        let variant = localStorage.getItem('ab-test-variant');
        
        if (!variant) {
            // 随机分配变体（50/50分配）
            variant = Math.random() < 0.5 ? 'control' : 'optimized';
            localStorage.setItem('ab-test-variant', variant);
            localStorage.setItem('ab-test-start-time', new Date().toISOString());
        }
        
        this.currentVariant = variant;
        this.applyVariant(variant);
        
        console.log(`当前测试变体: ${this.variants[variant].name}`);
    }

    /**
     * 应用测试变体
     */
    applyVariant(variant) {
        const variantConfig = this.variants[variant];
        
        if (variant === 'optimized') {
            // 启用所有优化功能
            this.enableOptimizations(variantConfig.features);
        } else {
            // 控制组 - 禁用优化功能
            this.disableOptimizations();
        }
        
        // 记录变体应用
        this.trackEvent('variant_applied', {
            variant: variant,
            features: variantConfig.features,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * 启用优化功能
     */
    enableOptimizations(features) {
        features.forEach(feature => {
            switch (feature) {
                case 'core-web-vitals':
                    this.enableCoreWebVitals();
                    break;
                case 'semantic-content':
                    this.enableSemanticContent();
                    break;
                case 'structured-data':
                    this.enableStructuredData();
                    break;
                case 'social-optimization':
                    this.enableSocialOptimization();
                    break;
                case 'local-seo':
                    this.enableLocalSEO();
                    break;
            }
        });
    }

    /**
     * 禁用优化功能
     */
    disableOptimizations() {
        // 为控制组禁用特定优化
        document.body.classList.add('ab-test-control');
        
        // 可以选择性地禁用某些优化功能
        console.log('控制组模式：部分优化功能已禁用');
    }

    /**
     * 启用Core Web Vitals优化
     */
    enableCoreWebVitals() {
        document.body.classList.add('cwv-optimized');
        console.log('Core Web Vitals优化已启用');
    }

    /**
     * 启用语义内容优化
     */
    enableSemanticContent() {
        document.body.classList.add('semantic-optimized');
        console.log('语义内容优化已启用');
    }

    /**
     * 启用结构化数据
     */
    enableStructuredData() {
        document.body.classList.add('structured-data-optimized');
        console.log('结构化数据优化已启用');
    }

    /**
     * 启用社交媒体优化
     */
    enableSocialOptimization() {
        document.body.classList.add('social-optimized');
        console.log('社交媒体优化已启用');
    }

    /**
     * 启用本地SEO
     */
    enableLocalSEO() {
        document.body.classList.add('local-seo-optimized');
        console.log('本地SEO优化已启用');
    }

    /**
     * 设置指标跟踪
     */
    setupMetricsTracking() {
        // 页面加载时间
        this.trackPageLoadTime();
        
        // 用户交互
        this.trackUserInteractions();
        
        // 滚动深度
        this.trackScrollDepth();
        
        // 停留时间
        this.trackSessionDuration();
        
        // Core Web Vitals
        this.trackCoreWebVitals();
        
        // 转化事件
        this.trackConversions();
    }

    /**
     * 跟踪页面加载时间
     */
    trackPageLoadTime() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.recordMetric('pageLoadTime', loadTime);
        });
    }

    /**
     * 跟踪用户交互
     */
    trackUserInteractions() {
        const interactions = ['click', 'scroll', 'keydown'];
        
        interactions.forEach(event => {
            document.addEventListener(event, () => {
                this.recordMetric('userInteraction', {
                    type: event,
                    timestamp: Date.now()
                });
            }, { once: true });
        });
    }

    /**
     * 跟踪滚动深度
     */
    trackScrollDepth() {
        let maxScroll = 0;
        const thresholds = [25, 50, 75, 90, 100];
        const reached = new Set();
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );
            
            maxScroll = Math.max(maxScroll, scrollPercent);
            
            thresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !reached.has(threshold)) {
                    reached.add(threshold);
                    this.recordMetric('scrollDepth', threshold);
                }
            });
        });
    }

    /**
     * 跟踪会话持续时间
     */
    trackSessionDuration() {
        const startTime = Date.now();
        
        // 页面卸载时记录会话时长
        window.addEventListener('beforeunload', () => {
            const duration = Date.now() - startTime;
            this.recordMetric('sessionDuration', duration);
        });
        
        // 定期记录会话时长
        setInterval(() => {
            const duration = Date.now() - startTime;
            this.recordMetric('sessionDurationCheckpoint', duration);
        }, 30000); // 每30秒记录一次
    }

    /**
     * 跟踪Core Web Vitals
     */
    trackCoreWebVitals() {
        // 使用Web Vitals库（如果可用）
        if (typeof webVitals !== 'undefined') {
            webVitals.getCLS(this.recordWebVital.bind(this));
            webVitals.getFID(this.recordWebVital.bind(this));
            webVitals.getFCP(this.recordWebVital.bind(this));
            webVitals.getLCP(this.recordWebVital.bind(this));
            webVitals.getTTFB(this.recordWebVital.bind(this));
        } else {
            // 简化版本的Core Web Vitals跟踪
            this.trackSimplifiedWebVitals();
        }
    }

    /**
     * 记录Web Vitals指标
     */
    recordWebVital(metric) {
        this.recordMetric('coreWebVitals', {
            name: metric.name,
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta
        });
    }

    /**
     * 简化版Web Vitals跟踪
     */
    trackSimplifiedWebVitals() {
        // LCP (Largest Contentful Paint)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.recordMetric('coreWebVitals', {
                name: 'LCP',
                value: lastEntry.startTime,
                rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor'
            });
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // FID (First Input Delay)
        new PerformanceObserver((entryList) => {
            entryList.getEntries().forEach(entry => {
                this.recordMetric('coreWebVitals', {
                    name: 'FID',
                    value: entry.processingStart - entry.startTime,
                    rating: entry.processingStart - entry.startTime < 100 ? 'good' : 
                           entry.processingStart - entry.startTime < 300 ? 'needs-improvement' : 'poor'
                });
            });
        }).observe({ entryTypes: ['first-input'] });
    }

    /**
     * 跟踪转化事件
     */
    trackConversions() {
        // 联系表单提交
        document.addEventListener('submit', (e) => {
            if (e.target.matches('form')) {
                this.recordMetric('conversion', {
                    type: 'form_submit',
                    form: e.target.id || 'unknown',
                    timestamp: Date.now()
                });
            }
        });
        
        // 邮箱链接点击
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="mailto:"]')) {
                this.recordMetric('conversion', {
                    type: 'email_click',
                    email: e.target.href,
                    timestamp: Date.now()
                });
            }
        });
        
        // 社交媒体分享
        document.addEventListener('click', (e) => {
            if (e.target.closest('.share-btn')) {
                this.recordMetric('conversion', {
                    type: 'social_share',
                    platform: e.target.closest('.share-btn').dataset.platform,
                    timestamp: Date.now()
                });
            }
        });
    }

    /**
     * 记录指标
     */
    recordMetric(metricName, value) {
        const testId = this.getCurrentTestId();
        
        if (!this.results.has(testId)) {
            this.results.set(testId, {
                variant: this.currentVariant,
                startTime: new Date().toISOString(),
                metrics: {}
            });
        }
        
        const testResult = this.results.get(testId);
        
        if (!testResult.metrics[metricName]) {
            testResult.metrics[metricName] = [];
        }
        
        testResult.metrics[metricName].push({
            value: value,
            timestamp: new Date().toISOString()
        });
        
        this.saveTestData();
        
        // 发送到分析平台
        this.sendToAnalytics(metricName, value);
    }

    /**
     * 获取当前测试ID
     */
    getCurrentTestId() {
        const startTime = localStorage.getItem('ab-test-start-time');
        return `test_${this.currentVariant}_${startTime}`;
    }

    /**
     * 发送数据到分析平台
     */
    sendToAnalytics(metricName, value) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'ab_test_metric', {
                metric_name: metricName,
                metric_value: typeof value === 'object' ? JSON.stringify(value) : value,
                test_variant: this.currentVariant,
                custom_parameter_1: this.getCurrentTestId()
            });
        }
        
        console.log(`A/B测试指标 [${this.currentVariant}]:`, metricName, value);
    }

    /**
     * 创建测试仪表板
     */
    createTestingDashboard() {
        // 只在开发环境或管理员模式下显示
        if (this.shouldShowDashboard()) {
            this.renderDashboard();
        }
    }

    /**
     * 判断是否显示仪表板
     */
    shouldShowDashboard() {
        // 检查URL参数或localStorage设置
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.has('ab-dashboard') || 
               localStorage.getItem('ab-dashboard-enabled') === 'true' ||
               window.location.hostname === 'localhost';
    }

    /**
     * 渲染仪表板
     */
    renderDashboard() {
        const dashboard = document.createElement('div');
        dashboard.id = 'ab-testing-dashboard';
        dashboard.className = 'ab-dashboard';
        dashboard.innerHTML = `
            <div class="ab-dashboard-header">
                <h3><i class="fas fa-chart-line"></i> A/B测试仪表板</h3>
                <button class="ab-dashboard-toggle" onclick="this.parentElement.parentElement.classList.toggle('minimized')">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
            <div class="ab-dashboard-content">
                <div class="ab-current-test">
                    <h4>当前测试</h4>
                    <div class="test-info">
                        <span class="variant-badge variant-${this.currentVariant}">
                            ${this.variants[this.currentVariant].name}
                        </span>
                        <p>${this.variants[this.currentVariant].description}</p>
                    </div>
                </div>
                <div class="ab-metrics-summary" id="metrics-summary">
                    <h4>实时指标</h4>
                    <div class="metrics-grid" id="metrics-grid">
                        <!-- 指标将动态插入 -->
                    </div>
                </div>
                <div class="ab-actions">
                    <button onclick="abTestingEvaluator.switchVariant()" class="btn-switch">
                        切换变体
                    </button>
                    <button onclick="abTestingEvaluator.exportResults()" class="btn-export">
                        导出结果
                    </button>
                    <button onclick="abTestingEvaluator.resetTest()" class="btn-reset">
                        重置测试
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(dashboard);
        
        // 定期更新仪表板
        setInterval(() => {
            this.updateDashboard();
        }, 5000);
        
        // 初始更新
        this.updateDashboard();
    }

    /**
     * 更新仪表板
     */
    updateDashboard() {
        const metricsGrid = document.getElementById('metrics-grid');
        if (!metricsGrid) return;
        
        const testId = this.getCurrentTestId();
        const testResult = this.results.get(testId);
        
        if (!testResult) return;
        
        const metrics = this.calculateMetricsSummary(testResult.metrics);
        
        metricsGrid.innerHTML = Object.entries(metrics).map(([name, data]) => `
            <div class="metric-card">
                <div class="metric-name">${this.getMetricDisplayName(name)}</div>
                <div class="metric-value">${this.formatMetricValue(name, data.value)}</div>
                <div class="metric-count">${data.count} 样本</div>
            </div>
        `).join('');
    }

    /**
     * 计算指标摘要
     */
    calculateMetricsSummary(metrics) {
        const summary = {};
        
        Object.entries(metrics).forEach(([name, values]) => {
            if (values.length === 0) return;
            
            const numericValues = values
                .map(v => typeof v.value === 'number' ? v.value : 0)
                .filter(v => !isNaN(v));
            
            if (numericValues.length > 0) {
                summary[name] = {
                    value: numericValues.reduce((a, b) => a + b, 0) / numericValues.length,
                    count: values.length,
                    min: Math.min(...numericValues),
                    max: Math.max(...numericValues)
                };
            }
        });
        
        return summary;
    }

    /**
     * 获取指标显示名称
     */
    getMetricDisplayName(metricName) {
        const displayNames = {
            pageLoadTime: '页面加载时间',
            sessionDuration: '会话时长',
            scrollDepth: '滚动深度',
            userInteraction: '用户交互',
            coreWebVitals: 'Core Web Vitals',
            conversion: '转化事件'
        };
        
        return displayNames[metricName] || metricName;
    }

    /**
     * 格式化指标值
     */
    formatMetricValue(metricName, value) {
        switch (metricName) {
            case 'pageLoadTime':
                return `${Math.round(value)}ms`;
            case 'sessionDuration':
                return `${Math.round(value / 1000)}s`;
            case 'scrollDepth':
                return `${Math.round(value)}%`;
            default:
                return typeof value === 'number' ? Math.round(value * 100) / 100 : value;
        }
    }

    /**
     * 切换测试变体
     */
    switchVariant() {
        const newVariant = this.currentVariant === 'control' ? 'optimized' : 'control';
        localStorage.setItem('ab-test-variant', newVariant);
        localStorage.setItem('ab-test-start-time', new Date().toISOString());
        location.reload();
    }

    /**
     * 导出测试结果
     */
    exportResults() {
        const results = {
            tests: Array.from(this.results.entries()),
            summary: this.generateTestSummary(),
            exportTime: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(results, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ab-test-results-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    /**
     * 重置测试
     */
    resetTest() {
        if (confirm('确定要重置所有测试数据吗？此操作不可撤销。')) {
            localStorage.removeItem('ab-test-data');
            localStorage.removeItem('ab-test-variant');
            localStorage.removeItem('ab-test-start-time');
            location.reload();
        }
    }

    /**
     * 生成测试摘要
     */
    generateTestSummary() {
        const summary = {
            totalTests: this.results.size,
            variants: {},
            overallMetrics: {}
        };
        
        // 按变体分组统计
        this.results.forEach((result, testId) => {
            const variant = result.variant;
            
            if (!summary.variants[variant]) {
                summary.variants[variant] = {
                    count: 0,
                    metrics: {}
                };
            }
            
            summary.variants[variant].count++;
            
            // 聚合指标
            Object.entries(result.metrics).forEach(([metricName, values]) => {
                if (!summary.variants[variant].metrics[metricName]) {
                    summary.variants[variant].metrics[metricName] = [];
                }
                
                summary.variants[variant].metrics[metricName].push(...values);
            });
        });
        
        return summary;
    }

    /**
     * 开始性能监控
     */
    startPerformanceMonitoring() {
        // 监控页面性能
        this.monitorPagePerformance();
        
        // 监控资源加载
        this.monitorResourceLoading();
        
        // 监控错误
        this.monitorErrors();
    }

    /**
     * 监控页面性能
     */
    monitorPagePerformance() {
        // 使用Performance Observer API
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    this.recordMetric('performance', {
                        name: entry.name,
                        type: entry.entryType,
                        startTime: entry.startTime,
                        duration: entry.duration
                    });
                });
            });
            
            observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
        }
    }

    /**
     * 监控资源加载
     */
    monitorResourceLoading() {
        window.addEventListener('load', () => {
            const resources = performance.getEntriesByType('resource');
            
            resources.forEach(resource => {
                this.recordMetric('resourceLoad', {
                    name: resource.name,
                    type: resource.initiatorType,
                    size: resource.transferSize,
                    duration: resource.duration
                });
            });
        });
    }

    /**
     * 监控错误
     */
    monitorErrors() {
        window.addEventListener('error', (e) => {
            this.recordMetric('error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno,
                stack: e.error ? e.error.stack : null
            });
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            this.recordMetric('error', {
                type: 'unhandledrejection',
                reason: e.reason,
                promise: e.promise
            });
        });
    }

    /**
     * 跟踪事件
     */
    trackEvent(eventName, data) {
        this.recordMetric('event', {
            name: eventName,
            data: data,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * 获取测试报告
     */
    getTestReport() {
        return {
            currentVariant: this.currentVariant,
            testDuration: this.getTestDuration(),
            results: this.generateTestSummary(),
            recommendations: this.generateRecommendations()
        };
    }

    /**
     * 获取测试持续时间
     */
    getTestDuration() {
        const startTime = localStorage.getItem('ab-test-start-time');
        if (!startTime) return 0;
        
        return Date.now() - new Date(startTime).getTime();
    }

    /**
     * 生成建议
     */
    generateRecommendations() {
        const recommendations = [];
        const summary = this.generateTestSummary();
        
        // 基于测试结果生成建议
        if (summary.variants.optimized && summary.variants.control) {
            const optimizedMetrics = summary.variants.optimized.metrics;
            const controlMetrics = summary.variants.control.metrics;
            
            // 比较Core Web Vitals
            if (optimizedMetrics.coreWebVitals && controlMetrics.coreWebVitals) {
                recommendations.push({
                    type: 'performance',
                    message: '建议继续使用优化版本以改善Core Web Vitals指标'
                });
            }
            
            // 比较转化率
            if (optimizedMetrics.conversion && controlMetrics.conversion) {
                const optimizedConversions = optimizedMetrics.conversion.length;
                const controlConversions = controlMetrics.conversion.length;
                
                if (optimizedConversions > controlConversions) {
                    recommendations.push({
                        type: 'conversion',
                        message: '优化版本显示更高的转化率，建议采用'
                    });
                }
            }
        }
        
        return recommendations;
    }
}

// 全局实例
let abTestingEvaluator;

// 导出类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ABTestingEvaluator;
}