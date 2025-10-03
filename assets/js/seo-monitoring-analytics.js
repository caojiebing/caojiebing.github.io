/**
 * SEO监控和分析工具
 * 提供全面的SEO性能监控、分析和报告功能
 */
class SEOMonitoringAnalytics {
    constructor() {
        this.config = {
            // 监控配置
            monitoringInterval: 60000, // 1分钟
            reportInterval: 300000, // 5分钟
            maxDataPoints: 100,
            
            // 分析配置
            analysisThresholds: {
                pageLoadTime: 3000, // 3秒
                firstContentfulPaint: 1800, // 1.8秒
                largestContentfulPaint: 2500, // 2.5秒
                cumulativeLayoutShift: 0.1,
                firstInputDelay: 100, // 100ms
                timeToInteractive: 3800, // 3.8秒
                
                // SEO指标阈值
                titleLength: { min: 30, max: 60 },
                descriptionLength: { min: 120, max: 160 },
                h1Count: { min: 1, max: 1 },
                imageAltMissing: 0,
                internalLinksMin: 3,
                externalLinksMax: 10
            },
            
            // 关键词监控
            targetKeywords: [
                '前端开发', 'JavaScript', 'React', 'Vue.js', 'Node.js',
                'Web开发', 'UI/UX设计', '响应式设计', 'SEO优化', '性能优化'
            ]
        };
        
        this.data = {
            performance: [],
            seo: [],
            keywords: [],
            errors: [],
            analytics: {
                pageViews: 0,
                uniqueVisitors: new Set(),
                bounceRate: 0,
                avgSessionDuration: 0,
                conversionRate: 0
            }
        };
        
        this.intervals = [];
        this.observers = [];
        this.isMonitoring = false;
    }

    /**
     * 初始化SEO监控系统
     */
    init() {
        this.setupPerformanceMonitoring();
        this.setupSEOAnalysis();
        this.setupKeywordTracking();
        this.setupUserBehaviorTracking();
        this.setupErrorTracking();
        this.startMonitoring();
        
        console.log('SEO监控和分析系统已启动');
    }

    /**
     * 设置性能监控
     */
    setupPerformanceMonitoring() {
        // Core Web Vitals监控
        this.monitorCoreWebVitals();
        
        // 页面加载性能监控
        this.monitorPagePerformance();
        
        // 资源加载监控
        this.monitorResourceLoading();
    }

    /**
     * 监控Core Web Vitals
     */
    monitorCoreWebVitals() {
        // FCP (First Contentful Paint)
        if ('PerformanceObserver' in window) {
            const fcpObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.name === 'first-contentful-paint') {
                        this.recordMetric('fcp', entry.startTime);
                    }
                }
            });
            fcpObserver.observe({ entryTypes: ['paint'] });
            this.observers.push(fcpObserver);
        }

        // LCP (Largest Contentful Paint)
        if ('PerformanceObserver' in window) {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.recordMetric('lcp', lastEntry.startTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            this.observers.push(lcpObserver);
        }

        // FID (First Input Delay)
        if ('PerformanceObserver' in window) {
            const fidObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    this.recordMetric('fid', entry.processingStart - entry.startTime);
                }
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
            this.observers.push(fidObserver);
        }

        // CLS (Cumulative Layout Shift)
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        this.recordMetric('cls', clsValue);
                    }
                }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            this.observers.push(clsObserver);
        }
    }

    /**
     * 监控页面性能
     */
    monitorPagePerformance() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    this.recordMetric('domContentLoaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
                    this.recordMetric('loadComplete', navigation.loadEventEnd - navigation.loadEventStart);
                    this.recordMetric('totalLoadTime', navigation.loadEventEnd - navigation.fetchStart);
                }
            }, 0);
        });
    }

    /**
     * 监控资源加载
     */
    monitorResourceLoading() {
        if ('PerformanceObserver' in window) {
            const resourceObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 1000) { // 超过1秒的资源
                        this.recordError('slow_resource', {
                            name: entry.name,
                            duration: entry.duration,
                            size: entry.transferSize
                        });
                    }
                }
            });
            resourceObserver.observe({ entryTypes: ['resource'] });
            this.observers.push(resourceObserver);
        }
    }

    /**
     * 设置SEO分析
     */
    setupSEOAnalysis() {
        this.analyzePage();
        
        // 定期分析页面SEO
        const seoInterval = setInterval(() => {
            this.analyzePage();
        }, this.config.reportInterval);
        this.intervals.push(seoInterval);
    }

    /**
     * 分析页面SEO
     */
    analyzePage() {
        const analysis = {
            timestamp: Date.now(),
            title: this.analyzeTitle(),
            description: this.analyzeDescription(),
            headings: this.analyzeHeadings(),
            images: this.analyzeImages(),
            links: this.analyzeLinks(),
            content: this.analyzeContent(),
            schema: this.analyzeSchema(),
            performance: this.getPerformanceScore()
        };
        
        this.data.seo.push(analysis);
        this.trimData('seo');
        
        return analysis;
    }

    /**
     * 分析标题
     */
    analyzeTitle() {
        const title = document.title;
        const length = title.length;
        const { min, max } = this.config.analysisThresholds.titleLength;
        
        return {
            text: title,
            length: length,
            isOptimal: length >= min && length <= max,
            issues: length < min ? ['标题过短'] : length > max ? ['标题过长'] : [],
            keywords: this.findKeywordsInText(title)
        };
    }

    /**
     * 分析描述
     */
    analyzeDescription() {
        const metaDesc = document.querySelector('meta[name="description"]');
        const description = metaDesc ? metaDesc.content : '';
        const length = description.length;
        const { min, max } = this.config.analysisThresholds.descriptionLength;
        
        return {
            text: description,
            length: length,
            exists: !!metaDesc,
            isOptimal: length >= min && length <= max,
            issues: !metaDesc ? ['缺少描述'] : length < min ? ['描述过短'] : length > max ? ['描述过长'] : [],
            keywords: this.findKeywordsInText(description)
        };
    }

    /**
     * 分析标题标签
     */
    analyzeHeadings() {
        const headings = {
            h1: document.querySelectorAll('h1'),
            h2: document.querySelectorAll('h2'),
            h3: document.querySelectorAll('h3'),
            h4: document.querySelectorAll('h4'),
            h5: document.querySelectorAll('h5'),
            h6: document.querySelectorAll('h6')
        };
        
        const issues = [];
        if (headings.h1.length === 0) issues.push('缺少H1标签');
        if (headings.h1.length > 1) issues.push('H1标签过多');
        
        return {
            counts: Object.fromEntries(Object.entries(headings).map(([tag, elements]) => [tag, elements.length])),
            structure: this.analyzeHeadingStructure(),
            issues: issues,
            keywords: this.analyzeHeadingKeywords(headings)
        };
    }

    /**
     * 分析标题结构
     */
    analyzeHeadingStructure() {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        const structure = headings.map(h => ({
            tag: h.tagName.toLowerCase(),
            text: h.textContent.trim(),
            level: parseInt(h.tagName.charAt(1))
        }));
        
        // 检查层级结构
        const issues = [];
        for (let i = 1; i < structure.length; i++) {
            const current = structure[i];
            const previous = structure[i - 1];
            if (current.level > previous.level + 1) {
                issues.push(`标题层级跳跃: ${previous.tag} -> ${current.tag}`);
            }
        }
        
        return { structure, issues };
    }

    /**
     * 分析标题关键词
     */
    analyzeHeadingKeywords(headings) {
        const keywords = {};
        Object.entries(headings).forEach(([tag, elements]) => {
            keywords[tag] = [];
            elements.forEach(element => {
                const foundKeywords = this.findKeywordsInText(element.textContent);
                keywords[tag] = keywords[tag].concat(foundKeywords);
            });
        });
        return keywords;
    }

    /**
     * 分析图片
     */
    analyzeImages() {
        const images = document.querySelectorAll('img');
        let missingAlt = 0;
        let totalSize = 0;
        const issues = [];
        
        images.forEach(img => {
            if (!img.alt || img.alt.trim() === '') {
                missingAlt++;
            }
            
            // 检查图片尺寸
            if (img.naturalWidth > 1920 || img.naturalHeight > 1080) {
                issues.push(`图片尺寸过大: ${img.src}`);
            }
        });
        
        if (missingAlt > this.config.analysisThresholds.imageAltMissing) {
            issues.push(`${missingAlt}张图片缺少alt属性`);
        }
        
        return {
            total: images.length,
            missingAlt: missingAlt,
            issues: issues,
            avgSize: totalSize / images.length || 0
        };
    }

    /**
     * 分析链接
     */
    analyzeLinks() {
        const links = document.querySelectorAll('a[href]');
        let internal = 0;
        let external = 0;
        const issues = [];
        
        links.forEach(link => {
            const href = link.href;
            if (href.startsWith(window.location.origin)) {
                internal++;
            } else if (href.startsWith('http')) {
                external++;
                // 检查外部链接是否有rel="noopener"
                if (!link.rel.includes('noopener')) {
                    issues.push('外部链接缺少rel="noopener"');
                }
            }
        });
        
        if (internal < this.config.analysisThresholds.internalLinksMin) {
            issues.push('内部链接过少');
        }
        if (external > this.config.analysisThresholds.externalLinksMax) {
            issues.push('外部链接过多');
        }
        
        return {
            total: links.length,
            internal: internal,
            external: external,
            issues: issues
        };
    }

    /**
     * 分析内容
     */
    analyzeContent() {
        const content = document.body.textContent || '';
        const wordCount = content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 假设每分钟200字
        
        return {
            wordCount: wordCount,
            readingTime: readingTime,
            keywordDensity: this.calculateKeywordDensity(content),
            readability: this.calculateReadability(content)
        };
    }

    /**
     * 计算关键词密度
     */
    calculateKeywordDensity(content) {
        const density = {};
        const words = content.toLowerCase().split(/\s+/);
        const totalWords = words.length;
        
        this.config.targetKeywords.forEach(keyword => {
            const keywordWords = keyword.toLowerCase().split(/\s+/);
            let count = 0;
            
            for (let i = 0; i <= words.length - keywordWords.length; i++) {
                const phrase = words.slice(i, i + keywordWords.length).join(' ');
                if (phrase === keyword.toLowerCase()) {
                    count++;
                }
            }
            
            density[keyword] = {
                count: count,
                density: (count / totalWords * 100).toFixed(2)
            };
        });
        
        return density;
    }

    /**
     * 计算可读性
     */
    calculateReadability(content) {
        const sentences = content.split(/[.!?]+/).length;
        const words = content.split(/\s+/).length;
        const avgWordsPerSentence = words / sentences;
        
        // 简化的可读性评分
        let score = 100;
        if (avgWordsPerSentence > 20) score -= 10;
        if (avgWordsPerSentence > 30) score -= 20;
        
        return {
            score: Math.max(0, score),
            avgWordsPerSentence: avgWordsPerSentence.toFixed(1),
            level: score > 80 ? '易读' : score > 60 ? '中等' : '困难'
        };
    }

    /**
     * 分析结构化数据
     */
    analyzeSchema() {
        const schemas = document.querySelectorAll('script[type="application/ld+json"]');
        const schemaTypes = [];
        
        schemas.forEach(script => {
            try {
                const data = JSON.parse(script.textContent);
                if (data['@type']) {
                    schemaTypes.push(data['@type']);
                }
            } catch (e) {
                // 忽略解析错误
            }
        });
        
        return {
            count: schemas.length,
            types: schemaTypes,
            hasPersonSchema: schemaTypes.includes('Person'),
            hasWebSiteSchema: schemaTypes.includes('WebSite'),
            hasBreadcrumbSchema: schemaTypes.includes('BreadcrumbList')
        };
    }

    /**
     * 在文本中查找关键词
     */
    findKeywordsInText(text) {
        const found = [];
        const lowerText = text.toLowerCase();
        
        this.config.targetKeywords.forEach(keyword => {
            if (lowerText.includes(keyword.toLowerCase())) {
                found.push(keyword);
            }
        });
        
        return found;
    }

    /**
     * 设置关键词跟踪
     */
    setupKeywordTracking() {
        // 跟踪关键词排名变化
        this.trackKeywordRankings();
        
        // 定期更新关键词数据
        const keywordInterval = setInterval(() => {
            this.trackKeywordRankings();
        }, this.config.reportInterval * 2); // 每10分钟
        this.intervals.push(keywordInterval);
    }

    /**
     * 跟踪关键词排名
     */
    trackKeywordRankings() {
        const rankings = {};
        
        this.config.targetKeywords.forEach(keyword => {
            rankings[keyword] = {
                timestamp: Date.now(),
                density: this.calculateKeywordDensity(document.body.textContent)[keyword],
                positions: this.findKeywordPositions(keyword),
                prominence: this.calculateKeywordProminence(keyword)
            };
        });
        
        this.data.keywords.push(rankings);
        this.trimData('keywords');
    }

    /**
     * 查找关键词位置
     */
    findKeywordPositions(keyword) {
        const positions = {
            title: document.title.toLowerCase().includes(keyword.toLowerCase()),
            description: false,
            h1: false,
            h2: false,
            firstParagraph: false
        };
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            positions.description = metaDesc.content.toLowerCase().includes(keyword.toLowerCase());
        }
        
        const h1 = document.querySelector('h1');
        if (h1) {
            positions.h1 = h1.textContent.toLowerCase().includes(keyword.toLowerCase());
        }
        
        const h2s = document.querySelectorAll('h2');
        positions.h2 = Array.from(h2s).some(h2 => h2.textContent.toLowerCase().includes(keyword.toLowerCase()));
        
        const firstP = document.querySelector('p');
        if (firstP) {
            positions.firstParagraph = firstP.textContent.toLowerCase().includes(keyword.toLowerCase());
        }
        
        return positions;
    }

    /**
     * 计算关键词突出度
     */
    calculateKeywordProminence(keyword) {
        const positions = this.findKeywordPositions(keyword);
        let score = 0;
        
        if (positions.title) score += 30;
        if (positions.description) score += 20;
        if (positions.h1) score += 25;
        if (positions.h2) score += 15;
        if (positions.firstParagraph) score += 10;
        
        return score;
    }

    /**
     * 设置用户行为跟踪
     */
    setupUserBehaviorTracking() {
        // 页面浏览量
        this.data.analytics.pageViews++;
        
        // 唯一访客（基于sessionStorage）
        if (!sessionStorage.getItem('visitor_id')) {
            const visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('visitor_id', visitorId);
            this.data.analytics.uniqueVisitors.add(visitorId);
        }
        
        // 会话时长
        const sessionStart = Date.now();
        window.addEventListener('beforeunload', () => {
            const sessionDuration = Date.now() - sessionStart;
            this.data.analytics.avgSessionDuration = 
                (this.data.analytics.avgSessionDuration + sessionDuration) / 2;
        });
        
        // 滚动深度
        this.trackScrollDepth();
        
        // 点击跟踪
        this.trackClicks();
    }

    /**
     * 跟踪滚动深度
     */
    trackScrollDepth() {
        let maxScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            maxScroll = Math.max(maxScroll, scrollPercent);
        });
        
        window.addEventListener('beforeunload', () => {
            this.recordMetric('scrollDepth', maxScroll);
        });
    }

    /**
     * 跟踪点击
     */
    trackClicks() {
        document.addEventListener('click', (event) => {
            const target = event.target;
            const tagName = target.tagName.toLowerCase();
            
            if (tagName === 'a') {
                this.recordEvent('link_click', {
                    href: target.href,
                    text: target.textContent.trim(),
                    external: !target.href.startsWith(window.location.origin)
                });
            } else if (tagName === 'button') {
                this.recordEvent('button_click', {
                    text: target.textContent.trim(),
                    type: target.type
                });
            }
        });
    }

    /**
     * 设置错误跟踪
     */
    setupErrorTracking() {
        // JavaScript错误
        window.addEventListener('error', (event) => {
            this.recordError('javascript_error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
        });
        
        // Promise拒绝
        window.addEventListener('unhandledrejection', (event) => {
            this.recordError('promise_rejection', {
                reason: event.reason
            });
        });
        
        // 资源加载错误
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.recordError('resource_error', {
                    src: event.target.src || event.target.href,
                    tagName: event.target.tagName
                });
            }
        }, true);
    }

    /**
     * 记录指标
     */
    recordMetric(name, value) {
        this.data.performance.push({
            timestamp: Date.now(),
            metric: name,
            value: value
        });
        this.trimData('performance');
    }

    /**
     * 记录事件
     */
    recordEvent(name, data) {
        // 发送到分析平台
        if (typeof gtag !== 'undefined') {
            gtag('event', name, data);
        }
    }

    /**
     * 记录错误
     */
    recordError(type, details) {
        this.data.errors.push({
            timestamp: Date.now(),
            type: type,
            details: details
        });
        this.trimData('errors');
    }

    /**
     * 修剪数据以保持在限制内
     */
    trimData(dataType) {
        if (this.data[dataType].length > this.config.maxDataPoints) {
            this.data[dataType] = this.data[dataType].slice(-this.config.maxDataPoints);
        }
    }

    /**
     * 获取性能评分
     */
    getPerformanceScore() {
        const recent = this.data.performance.slice(-10);
        if (recent.length === 0) return 0;
        
        let score = 100;
        const thresholds = this.config.analysisThresholds;
        
        recent.forEach(metric => {
            switch (metric.metric) {
                case 'fcp':
                    if (metric.value > thresholds.firstContentfulPaint) score -= 10;
                    break;
                case 'lcp':
                    if (metric.value > thresholds.largestContentfulPaint) score -= 15;
                    break;
                case 'fid':
                    if (metric.value > thresholds.firstInputDelay) score -= 10;
                    break;
                case 'cls':
                    if (metric.value > thresholds.cumulativeLayoutShift) score -= 15;
                    break;
            }
        });
        
        return Math.max(0, score);
    }

    /**
     * 开始监控
     */
    startMonitoring() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        
        // 定期生成报告
        const reportInterval = setInterval(() => {
            this.generateReport();
        }, this.config.reportInterval);
        this.intervals.push(reportInterval);
    }

    /**
     * 停止监控
     */
    stopMonitoring() {
        this.isMonitoring = false;
        
        // 清除所有定时器
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
        
        // 断开所有观察者
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }

    /**
     * 生成综合报告
     */
    generateReport() {
        const report = {
            timestamp: Date.now(),
            summary: {
                performanceScore: this.getPerformanceScore(),
                seoScore: this.calculateSEOScore(),
                totalIssues: this.getTotalIssues(),
                keywordCoverage: this.getKeywordCoverage()
            },
            performance: this.getPerformanceSummary(),
            seo: this.getSEOSummary(),
            keywords: this.getKeywordSummary(),
            analytics: this.getAnalyticsSummary(),
            recommendations: this.generateRecommendations()
        };
        
        return report;
    }

    /**
     * 计算SEO评分
     */
    calculateSEOScore() {
        const latest = this.data.seo[this.data.seo.length - 1];
        if (!latest) return 0;
        
        let score = 100;
        
        // 标题评分
        if (!latest.title.isOptimal) score -= 10;
        
        // 描述评分
        if (!latest.description.exists) score -= 15;
        else if (!latest.description.isOptimal) score -= 5;
        
        // 标题结构评分
        if (latest.headings.issues.length > 0) score -= 10;
        
        // 图片评分
        if (latest.images.missingAlt > 0) score -= 10;
        
        // 链接评分
        if (latest.links.issues.length > 0) score -= 5;
        
        return Math.max(0, score);
    }

    /**
     * 获取总问题数
     */
    getTotalIssues() {
        const latest = this.data.seo[this.data.seo.length - 1];
        if (!latest) return 0;
        
        return latest.title.issues.length +
               latest.description.issues.length +
               latest.headings.issues.length +
               latest.images.issues.length +
               latest.links.issues.length;
    }

    /**
     * 获取关键词覆盖率
     */
    getKeywordCoverage() {
        const latest = this.data.seo[this.data.seo.length - 1];
        if (!latest) return 0;
        
        const totalKeywords = this.config.targetKeywords.length;
        const foundKeywords = new Set();
        
        // 收集所有找到的关键词
        Object.values(latest.title.keywords || []).forEach(kw => foundKeywords.add(kw));
        Object.values(latest.description.keywords || []).forEach(kw => foundKeywords.add(kw));
        Object.values(latest.headings.keywords || {}).forEach(kwArray => {
            kwArray.forEach(kw => foundKeywords.add(kw));
        });
        
        return (foundKeywords.size / totalKeywords * 100).toFixed(1);
    }

    /**
     * 获取性能摘要
     */
    getPerformanceSummary() {
        const recent = this.data.performance.slice(-20);
        const summary = {};
        
        ['fcp', 'lcp', 'fid', 'cls'].forEach(metric => {
            const values = recent.filter(p => p.metric === metric).map(p => p.value);
            if (values.length > 0) {
                summary[metric] = {
                    avg: values.reduce((a, b) => a + b, 0) / values.length,
                    min: Math.min(...values),
                    max: Math.max(...values),
                    latest: values[values.length - 1]
                };
            }
        });
        
        return summary;
    }

    /**
     * 获取SEO摘要
     */
    getSEOSummary() {
        const latest = this.data.seo[this.data.seo.length - 1];
        return latest || {};
    }

    /**
     * 获取关键词摘要
     */
    getKeywordSummary() {
        const latest = this.data.keywords[this.data.keywords.length - 1];
        return latest || {};
    }

    /**
     * 获取分析摘要
     */
    getAnalyticsSummary() {
        return {
            ...this.data.analytics,
            uniqueVisitors: this.data.analytics.uniqueVisitors.size
        };
    }

    /**
     * 生成建议
     */
    generateRecommendations() {
        const recommendations = [];
        const latest = this.data.seo[this.data.seo.length - 1];
        
        if (!latest) return recommendations;
        
        // 性能建议
        const perfScore = this.getPerformanceScore();
        if (perfScore < 80) {
            recommendations.push({
                type: 'performance',
                priority: 'high',
                title: '优化页面性能',
                description: '页面性能评分较低，建议优化Core Web Vitals指标'
            });
        }
        
        // SEO建议
        if (!latest.title.isOptimal) {
            recommendations.push({
                type: 'seo',
                priority: 'high',
                title: '优化页面标题',
                description: `标题长度应在${this.config.analysisThresholds.titleLength.min}-${this.config.analysisThresholds.titleLength.max}字符之间`
            });
        }
        
        if (!latest.description.exists) {
            recommendations.push({
                type: 'seo',
                priority: 'high',
                title: '添加页面描述',
                description: '页面缺少meta description标签'
            });
        }
        
        if (latest.images.missingAlt > 0) {
            recommendations.push({
                type: 'accessibility',
                priority: 'medium',
                title: '添加图片alt属性',
                description: `${latest.images.missingAlt}张图片缺少alt属性`
            });
        }
        
        // 关键词建议
        const keywordCoverage = parseFloat(this.getKeywordCoverage());
        if (keywordCoverage < 50) {
            recommendations.push({
                type: 'content',
                priority: 'medium',
                title: '提高关键词覆盖率',
                description: `当前关键词覆盖率为${keywordCoverage}%，建议增加目标关键词的使用`
            });
        }
        
        return recommendations;
    }

    /**
     * 导出数据
     */
    exportData() {
        return {
            config: this.config,
            data: this.data,
            report: this.generateReport()
        };
    }

    /**
     * 重置数据
     */
    resetData() {
        this.data = {
            performance: [],
            seo: [],
            keywords: [],
            errors: [],
            analytics: {
                pageViews: 0,
                uniqueVisitors: new Set(),
                bounceRate: 0,
                avgSessionDuration: 0,
                conversionRate: 0
            }
        };
    }
}

// 导出类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SEOMonitoringAnalytics;
}