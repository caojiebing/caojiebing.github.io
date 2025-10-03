/**
 * A/B测试框架
 * 用于测试不同SEO优化策略的效果
 * 支持多变量测试、统计分析、自动优化
 */

class ABTestingFramework {
    constructor() {
        this.tests = new Map();
        this.userSegment = null;
        this.analytics = {
            events: [],
            conversions: [],
            metrics: {}
        };
        this.init();
    }

    /**
     * 初始化A/B测试框架
     */
    init() {
        this.loadTestConfigurations();
        this.determineUserSegment();
        this.applyActiveTests();
        this.setupAnalytics();
        this.startMonitoring();
    }

    /**
     * 加载测试配置
     */
    loadTestConfigurations() {
        // SEO相关的A/B测试配置
        const testConfigs = [
            {
                id: 'title-optimization',
                name: '页面标题优化测试',
                type: 'seo',
                status: 'active',
                traffic: 50, // 50%的用户参与测试
                variants: [
                    {
                        id: 'control',
                        name: '原始标题',
                        weight: 50,
                        changes: {
                            title: '曹洁冰 - 高级技术专家 | Java开发 | 大数据 | AI'
                        }
                    },
                    {
                        id: 'variant-a',
                        name: '关键词优化标题',
                        weight: 50,
                        changes: {
                            title: '曹洁冰 - 资深Java工程师 | Spring Boot专家 | 大数据AI开发'
                        }
                    }
                ],
                metrics: ['ctr', 'bounce_rate', 'session_duration', 'search_ranking'],
                duration: 30, // 测试持续30天
                startDate: new Date().toISOString()
            },
            {
                id: 'meta-description-test',
                name: 'Meta描述优化测试',
                type: 'seo',
                status: 'active',
                traffic: 50,
                variants: [
                    {
                        id: 'control',
                        name: '原始描述',
                        weight: 50,
                        changes: {
                            description: '曹洁冰，高级技术专家，专注Java开发、大数据处理和AI应用开发。拥有丰富的企业级项目经验。'
                        }
                    },
                    {
                        id: 'variant-a',
                        name: '行动导向描述',
                        weight: 50,
                        changes: {
                            description: '寻找Java开发专家？曹洁冰提供Spring Boot、微服务、大数据、AI开发服务。立即了解更多！'
                        }
                    }
                ],
                metrics: ['ctr', 'organic_traffic', 'conversion_rate'],
                duration: 30,
                startDate: new Date().toISOString()
            },
            {
                id: 'structured-data-test',
                name: '结构化数据测试',
                type: 'seo',
                status: 'active',
                traffic: 50,
                variants: [
                    {
                        id: 'control',
                        name: '基础Person Schema',
                        weight: 50,
                        changes: {
                            structuredData: 'person-basic'
                        }
                    },
                    {
                        id: 'variant-a',
                        name: '增强Person + Organization Schema',
                        weight: 50,
                        changes: {
                            structuredData: 'person-enhanced'
                        }
                    }
                ],
                metrics: ['rich_snippets', 'search_visibility', 'ctr'],
                duration: 45,
                startDate: new Date().toISOString()
            },
            {
                id: 'content-layout-test',
                name: '内容布局优化测试',
                type: 'ux',
                status: 'active',
                traffic: 30,
                variants: [
                    {
                        id: 'control',
                        name: '原始布局',
                        weight: 50,
                        changes: {
                            layout: 'original'
                        }
                    },
                    {
                        id: 'variant-a',
                        name: '技能优先布局',
                        weight: 50,
                        changes: {
                            layout: 'skills-first'
                        }
                    }
                ],
                metrics: ['engagement_rate', 'scroll_depth', 'time_on_page'],
                duration: 21,
                startDate: new Date().toISOString()
            }
        ];

        testConfigs.forEach(config => {
            this.tests.set(config.id, config);
        });
    }

    /**
     * 确定用户分组
     */
    determineUserSegment() {
        // 获取或生成用户ID
        let userId = localStorage.getItem('ab_user_id');
        if (!userId) {
            userId = this.generateUserId();
            localStorage.setItem('ab_user_id', userId);
        }

        // 基于用户ID和其他因素确定分组
        this.userSegment = {
            userId,
            hash: this.hashUserId(userId),
            source: this.getTrafficSource(),
            device: this.getDeviceType(),
            location: this.getLocation(),
            timestamp: new Date().toISOString()
        };

        // 保存用户分组信息
        localStorage.setItem('ab_user_segment', JSON.stringify(this.userSegment));
    }

    /**
     * 生成用户ID
     */
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * 哈希用户ID
     */
    hashUserId(userId) {
        let hash = 0;
        for (let i = 0; i < userId.length; i++) {
            const char = userId.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // 转换为32位整数
        }
        return Math.abs(hash);
    }

    /**
     * 获取流量来源
     */
    getTrafficSource() {
        const referrer = document.referrer;
        const utm = new URLSearchParams(window.location.search);
        
        if (utm.get('utm_source')) {
            return {
                type: 'campaign',
                source: utm.get('utm_source'),
                medium: utm.get('utm_medium'),
                campaign: utm.get('utm_campaign')
            };
        }
        
        if (referrer) {
            if (referrer.includes('google')) return { type: 'search', source: 'google' };
            if (referrer.includes('baidu')) return { type: 'search', source: 'baidu' };
            if (referrer.includes('bing')) return { type: 'search', source: 'bing' };
            return { type: 'referral', source: new URL(referrer).hostname };
        }
        
        return { type: 'direct', source: 'direct' };
    }

    /**
     * 获取设备类型
     */
    getDeviceType() {
        const userAgent = navigator.userAgent;
        if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
            return 'mobile';
        }
        if (/Tablet|iPad/.test(userAgent)) {
            return 'tablet';
        }
        return 'desktop';
    }

    /**
     * 获取地理位置（简化版）
     */
    getLocation() {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const language = navigator.language;
        
        return {
            timezone,
            language,
            country: this.getCountryFromTimezone(timezone)
        };
    }

    /**
     * 从时区推断国家
     */
    getCountryFromTimezone(timezone) {
        if (timezone.includes('Asia/Shanghai') || timezone.includes('Asia/Beijing')) return 'CN';
        if (timezone.includes('America/New_York')) return 'US';
        if (timezone.includes('Europe/London')) return 'GB';
        return 'Unknown';
    }

    /**
     * 应用激活的测试
     */
    applyActiveTests() {
        this.tests.forEach((test, testId) => {
            if (test.status === 'active' && this.shouldParticipateInTest(test)) {
                const variant = this.selectVariant(test);
                this.applyVariant(testId, variant);
                this.trackTestParticipation(testId, variant.id);
            }
        });
    }

    /**
     * 判断用户是否应该参与测试
     */
    shouldParticipateInTest(test) {
        // 基于流量分配百分比
        const trafficThreshold = (this.userSegment.hash % 100) < test.traffic;
        
        // 检查测试是否过期
        const startDate = new Date(test.startDate);
        const endDate = new Date(startDate.getTime() + test.duration * 24 * 60 * 60 * 1000);
        const isActive = new Date() <= endDate;
        
        return trafficThreshold && isActive;
    }

    /**
     * 选择测试变体
     */
    selectVariant(test) {
        const hash = this.userSegment.hash;
        const totalWeight = test.variants.reduce((sum, variant) => sum + variant.weight, 0);
        const threshold = hash % totalWeight;
        
        let currentWeight = 0;
        for (const variant of test.variants) {
            currentWeight += variant.weight;
            if (threshold < currentWeight) {
                return variant;
            }
        }
        
        return test.variants[0]; // 默认返回第一个变体
    }

    /**
     * 应用测试变体
     */
    applyVariant(testId, variant) {
        const changes = variant.changes;
        
        switch (testId) {
            case 'title-optimization':
                this.applyTitleChange(changes.title);
                break;
            case 'meta-description-test':
                this.applyDescriptionChange(changes.description);
                break;
            case 'structured-data-test':
                this.applyStructuredDataChange(changes.structuredData);
                break;
            case 'content-layout-test':
                this.applyLayoutChange(changes.layout);
                break;
        }
        
        // 记录应用的变体
        this.recordAppliedVariant(testId, variant);
    }

    /**
     * 应用标题变更
     */
    applyTitleChange(newTitle) {
        document.title = newTitle;
        
        // 更新Open Graph标题
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.content = newTitle;
        }
        
        // 更新Twitter标题
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.content = newTitle;
        }
    }

    /**
     * 应用描述变更
     */
    applyDescriptionChange(newDescription) {
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = newDescription;
        }
        
        // 更新Open Graph描述
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.content = newDescription;
        }
        
        // 更新Twitter描述
        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) {
            twitterDescription.content = newDescription;
        }
    }

    /**
     * 应用结构化数据变更
     */
    applyStructuredDataChange(schemaType) {
        const existingSchema = document.querySelector('script[type="application/ld+json"]');
        
        let newSchema;
        if (schemaType === 'person-enhanced') {
            newSchema = {
                "@context": "https://schema.org",
                "@type": ["Person", "ProfessionalService"],
                "name": "曹洁冰",
                "jobTitle": "高级技术专家",
                "description": "资深Java开发工程师，大数据专家，AI应用开发工程师",
                "url": window.location.origin,
                "sameAs": [
                    "https://github.com/caojiebing",
                    "https://linkedin.com/in/caojiebing"
                ],
                "knowsAbout": [
                    "Java开发", "Spring Boot", "微服务架构",
                    "大数据开发", "Hadoop", "Spark",
                    "AI开发", "机器学习", "深度学习"
                ],
                "hasOccupation": {
                    "@type": "Occupation",
                    "name": "软件开发工程师",
                    "occupationLocation": {
                        "@type": "Country",
                        "name": "中国"
                    }
                },
                "memberOf": {
                    "@type": "Organization",
                    "@id": "#organization"
                }
            };
        } else {
            // 保持原有的基础Schema
            return;
        }
        
        if (existingSchema) {
            existingSchema.textContent = JSON.stringify(newSchema, null, 2);
        } else {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(newSchema, null, 2);
            document.head.appendChild(script);
        }
    }

    /**
     * 应用布局变更
     */
    applyLayoutChange(layoutType) {
        if (layoutType === 'skills-first') {
            // 将技能部分移到更显眼的位置
            const skillsSection = document.querySelector('#skills, .skills');
            const heroSection = document.querySelector('.hero, #hero');
            
            if (skillsSection && heroSection) {
                heroSection.parentNode.insertBefore(skillsSection, heroSection.nextSibling);
                skillsSection.classList.add('ab-test-skills-first');
            }
        }
    }

    /**
     * 记录应用的变体
     */
    recordAppliedVariant(testId, variant) {
        const appliedVariants = JSON.parse(localStorage.getItem('ab_applied_variants') || '{}');
        appliedVariants[testId] = {
            variantId: variant.id,
            variantName: variant.name,
            appliedAt: new Date().toISOString()
        };
        localStorage.setItem('ab_applied_variants', JSON.stringify(appliedVariants));
    }

    /**
     * 跟踪测试参与
     */
    trackTestParticipation(testId, variantId) {
        const event = {
            type: 'test_participation',
            testId,
            variantId,
            userId: this.userSegment.userId,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        this.analytics.events.push(event);
        this.sendAnalyticsEvent(event);
    }

    /**
     * 设置分析跟踪
     */
    setupAnalytics() {
        // 跟踪页面浏览
        this.trackPageView();
        
        // 跟踪用户交互
        this.setupInteractionTracking();
        
        // 跟踪转化事件
        this.setupConversionTracking();
        
        // 跟踪SEO指标
        this.setupSEOMetricsTracking();
    }

    /**
     * 跟踪页面浏览
     */
    trackPageView() {
        const event = {
            type: 'page_view',
            userId: this.userSegment.userId,
            url: window.location.href,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            appliedTests: JSON.parse(localStorage.getItem('ab_applied_variants') || '{}')
        };
        
        this.analytics.events.push(event);
        this.sendAnalyticsEvent(event);
    }

    /**
     * 设置交互跟踪
     */
    setupInteractionTracking() {
        // 跟踪点击事件
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target.tagName === 'A' || target.closest('a')) {
                this.trackLinkClick(target.closest('a'));
            }
        });
        
        // 跟踪滚动深度
        this.setupScrollTracking();
        
        // 跟踪停留时间
        this.setupTimeTracking();
    }

    /**
     * 跟踪链接点击
     */
    trackLinkClick(link) {
        const event = {
            type: 'link_click',
            userId: this.userSegment.userId,
            linkText: link.textContent.trim(),
            linkHref: link.href,
            linkType: this.classifyLink(link),
            timestamp: new Date().toISOString()
        };
        
        this.analytics.events.push(event);
        this.sendAnalyticsEvent(event);
    }

    /**
     * 分类链接类型
     */
    classifyLink(link) {
        const href = link.href;
        if (href.includes('mailto:')) return 'email';
        if (href.includes('tel:')) return 'phone';
        if (href.includes('github')) return 'github';
        if (href.includes('linkedin')) return 'linkedin';
        if (href.startsWith(window.location.origin)) return 'internal';
        return 'external';
    }

    /**
     * 设置滚动跟踪
     */
    setupScrollTracking() {
        let maxScroll = 0;
        const scrollMilestones = [25, 50, 75, 90, 100];
        const reachedMilestones = new Set();
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            maxScroll = Math.max(maxScroll, scrollPercent);
            
            scrollMilestones.forEach(milestone => {
                if (scrollPercent >= milestone && !reachedMilestones.has(milestone)) {
                    reachedMilestones.add(milestone);
                    this.trackScrollMilestone(milestone);
                }
            });
        });
    }

    /**
     * 跟踪滚动里程碑
     */
    trackScrollMilestone(percentage) {
        const event = {
            type: 'scroll_milestone',
            userId: this.userSegment.userId,
            percentage,
            timestamp: new Date().toISOString()
        };
        
        this.analytics.events.push(event);
        this.sendAnalyticsEvent(event);
    }

    /**
     * 设置时间跟踪
     */
    setupTimeTracking() {
        const startTime = Date.now();
        
        // 跟踪页面停留时间
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Date.now() - startTime;
            this.trackTimeOnPage(timeOnPage);
        });
        
        // 定期发送心跳
        setInterval(() => {
            this.trackHeartbeat(Date.now() - startTime);
        }, 30000); // 每30秒发送一次心跳
    }

    /**
     * 跟踪页面停留时间
     */
    trackTimeOnPage(duration) {
        const event = {
            type: 'time_on_page',
            userId: this.userSegment.userId,
            duration,
            timestamp: new Date().toISOString()
        };
        
        this.analytics.events.push(event);
        this.sendAnalyticsEvent(event);
    }

    /**
     * 跟踪心跳
     */
    trackHeartbeat(duration) {
        const event = {
            type: 'heartbeat',
            userId: this.userSegment.userId,
            duration,
            timestamp: new Date().toISOString()
        };
        
        this.analytics.events.push(event);
        this.sendAnalyticsEvent(event);
    }

    /**
     * 设置转化跟踪
     */
    setupConversionTracking() {
        // 跟踪联系方式点击
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a');
            if (target && (target.href.includes('mailto:') || target.href.includes('tel:'))) {
                this.trackConversion('contact_click', {
                    contactType: target.href.includes('mailto:') ? 'email' : 'phone',
                    contactValue: target.href
                });
            }
        });
        
        // 跟踪社交媒体链接点击
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a');
            if (target && (target.href.includes('github') || target.href.includes('linkedin'))) {
                this.trackConversion('social_click', {
                    platform: target.href.includes('github') ? 'github' : 'linkedin',
                    url: target.href
                });
            }
        });
    }

    /**
     * 跟踪转化事件
     */
    trackConversion(conversionType, data = {}) {
        const conversion = {
            type: conversionType,
            userId: this.userSegment.userId,
            data,
            timestamp: new Date().toISOString(),
            appliedTests: JSON.parse(localStorage.getItem('ab_applied_variants') || '{}')
        };
        
        this.analytics.conversions.push(conversion);
        this.sendAnalyticsEvent({
            type: 'conversion',
            ...conversion
        });
    }

    /**
     * 设置SEO指标跟踪
     */
    setupSEOMetricsTracking() {
        // 跟踪搜索引擎来源
        if (this.userSegment.source.type === 'search') {
            this.trackSEOMetrics();
        }
        
        // 跟踪页面性能
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.trackPerformanceMetrics();
            }, 1000);
        });
    }

    /**
     * 跟踪SEO指标
     */
    trackSEOMetrics() {
        const event = {
            type: 'seo_metrics',
            userId: this.userSegment.userId,
            searchEngine: this.userSegment.source.source,
            landingPage: window.location.pathname,
            timestamp: new Date().toISOString(),
            appliedTests: JSON.parse(localStorage.getItem('ab_applied_variants') || '{}')
        };
        
        this.analytics.events.push(event);
        this.sendAnalyticsEvent(event);
    }

    /**
     * 跟踪性能指标
     */
    trackPerformanceMetrics() {
        const timing = performance.timing;
        const metrics = {
            loadTime: timing.loadEventEnd - timing.navigationStart,
            domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
            firstPaint: this.getFirstPaint(),
            largestContentfulPaint: this.getLCP(),
            cumulativeLayoutShift: this.getCLS()
        };
        
        const event = {
            type: 'performance_metrics',
            userId: this.userSegment.userId,
            metrics,
            timestamp: new Date().toISOString()
        };
        
        this.analytics.events.push(event);
        this.sendAnalyticsEvent(event);
    }

    /**
     * 获取首次绘制时间
     */
    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        return firstPaint ? firstPaint.startTime : null;
    }

    /**
     * 获取最大内容绘制时间
     */
    getLCP() {
        return new Promise((resolve) => {
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    resolve(lastEntry.startTime);
                });
                observer.observe({ entryTypes: ['largest-contentful-paint'] });
                
                // 超时处理
                setTimeout(() => resolve(null), 5000);
            } else {
                resolve(null);
            }
        });
    }

    /**
     * 获取累积布局偏移
     */
    getCLS() {
        return new Promise((resolve) => {
            if ('PerformanceObserver' in window) {
                let clsValue = 0;
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    }
                });
                observer.observe({ entryTypes: ['layout-shift'] });
                
                // 5秒后返回结果
                setTimeout(() => {
                    observer.disconnect();
                    resolve(clsValue);
                }, 5000);
            } else {
                resolve(null);
            }
        });
    }

    /**
     * 开始监控
     */
    startMonitoring() {
        // 定期发送分析数据
        setInterval(() => {
            this.sendBatchAnalytics();
        }, 60000); // 每分钟发送一次
        
        // 页面卸载时发送剩余数据
        window.addEventListener('beforeunload', () => {
            this.sendBatchAnalytics();
        });
    }

    /**
     * 发送单个分析事件
     */
    sendAnalyticsEvent(event) {
        // 这里可以发送到实际的分析服务
        console.log('Analytics Event:', event);
        
        // 模拟发送到服务器
        if (navigator.sendBeacon) {
            const data = JSON.stringify(event);
            navigator.sendBeacon('/api/analytics', data);
        }
    }

    /**
     * 批量发送分析数据
     */
    sendBatchAnalytics() {
        if (this.analytics.events.length > 0) {
            const batch = {
                userId: this.userSegment.userId,
                events: this.analytics.events.splice(0),
                conversions: this.analytics.conversions.splice(0),
                timestamp: new Date().toISOString()
            };
            
            console.log('Analytics Batch:', batch);
            
            // 发送到服务器
            if (navigator.sendBeacon) {
                const data = JSON.stringify(batch);
                navigator.sendBeacon('/api/analytics/batch', data);
            }
        }
    }

    /**
     * 获取测试结果
     */
    getTestResults(testId) {
        const test = this.tests.get(testId);
        if (!test) return null;
        
        // 这里应该从服务器获取实际的测试结果
        // 现在返回模拟数据
        return {
            testId,
            testName: test.name,
            status: test.status,
            participants: this.getParticipantCount(testId),
            variants: test.variants.map(variant => ({
                ...variant,
                metrics: this.getVariantMetrics(testId, variant.id)
            })),
            winner: this.determineWinner(testId),
            confidence: this.calculateConfidence(testId),
            recommendations: this.generateTestRecommendations(testId)
        };
    }

    /**
     * 获取参与者数量（模拟）
     */
    getParticipantCount(testId) {
        return Math.floor(Math.random() * 1000) + 100;
    }

    /**
     * 获取变体指标（模拟）
     */
    getVariantMetrics(testId, variantId) {
        return {
            impressions: Math.floor(Math.random() * 500) + 50,
            clicks: Math.floor(Math.random() * 50) + 5,
            conversions: Math.floor(Math.random() * 10) + 1,
            ctr: (Math.random() * 0.1 + 0.02).toFixed(3),
            conversionRate: (Math.random() * 0.05 + 0.01).toFixed(3),
            bounceRate: (Math.random() * 0.3 + 0.4).toFixed(3),
            avgSessionDuration: Math.floor(Math.random() * 300) + 60
        };
    }

    /**
     * 确定获胜者（模拟）
     */
    determineWinner(testId) {
        const test = this.tests.get(testId);
        if (!test) return null;
        
        // 简单的随机选择获胜者
        const randomIndex = Math.floor(Math.random() * test.variants.length);
        return test.variants[randomIndex].id;
    }

    /**
     * 计算置信度（模拟）
     */
    calculateConfidence(testId) {
        return Math.floor(Math.random() * 30) + 70; // 70-100%的置信度
    }

    /**
     * 生成测试建议
     */
    generateTestRecommendations(testId) {
        const recommendations = [];
        const test = this.tests.get(testId);
        
        if (!test) return recommendations;
        
        switch (testId) {
            case 'title-optimization':
                recommendations.push({
                    type: 'optimization',
                    title: '标题长度优化',
                    description: '建议将标题长度控制在50-60个字符之间，以获得最佳的搜索结果显示效果'
                });
                break;
            case 'meta-description-test':
                recommendations.push({
                    type: 'content',
                    title: '描述内容优化',
                    description: '在描述中加入行动号召词汇，如"了解更多"、"立即联系"等，可以提高点击率'
                });
                break;
            case 'structured-data-test':
                recommendations.push({
                    type: 'technical',
                    title: '结构化数据扩展',
                    description: '考虑添加更多类型的结构化数据，如技能、项目经验等，以提升搜索可见性'
                });
                break;
        }
        
        return recommendations;
    }

    /**
     * 导出测试数据
     */
    exportTestData() {
        const data = {
            userSegment: this.userSegment,
            appliedVariants: JSON.parse(localStorage.getItem('ab_applied_variants') || '{}'),
            analytics: this.analytics,
            tests: Array.from(this.tests.entries()).map(([id, test]) => ({
                id,
                ...test,
                results: this.getTestResults(id)
            }))
        };
        
        return data;
    }
}

// 初始化A/B测试框架
document.addEventListener('DOMContentLoaded', () => {
    window.abTesting = new ABTestingFramework();
});

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ABTestingFramework;
}