/**
 * 高级SEO分析和优化工具
 * 实时监控SEO指标，提供优化建议
 * 支持语义搜索、本地SEO、技术SEO分析
 */

class SEOAnalyzer {
    constructor() {
        this.seoData = {
            technicalSEO: {},
            contentSEO: {},
            semanticSEO: {},
            localSEO: {},
            socialSEO: {},
            performanceSEO: {}
        };
        this.init();
    }

    /**
     * 初始化SEO分析器
     */
    init() {
        this.analyzeTechnicalSEO();
        this.analyzeContentSEO();
        this.analyzeSemanticSEO();
        this.analyzeLocalSEO();
        this.analyzeSocialSEO();
        this.analyzePerformanceSEO();
        this.generateSEOReport();
        this.implementOptimizations();
    }

    /**
     * 技术SEO分析
     */
    analyzeTechnicalSEO() {
        const technical = {
            metaTags: this.analyzeMetaTags(),
            structuredData: this.analyzeStructuredData(),
            canonicalURL: this.analyzeCanonicalURL(),
            robotsTxt: this.analyzeRobotsTxt(),
            sitemap: this.analyzeSitemap(),
            httpHeaders: this.analyzeHTTPHeaders(),
            urlStructure: this.analyzeURLStructure(),
            internalLinking: this.analyzeInternalLinking()
        };

        this.seoData.technicalSEO = technical;
        return technical;
    }

    /**
     * 分析Meta标签
     */
    analyzeMetaTags() {
        const metaTags = {
            title: document.querySelector('title')?.textContent || '',
            description: document.querySelector('meta[name="description"]')?.content || '',
            keywords: document.querySelector('meta[name="keywords"]')?.content || '',
            robots: document.querySelector('meta[name="robots"]')?.content || '',
            viewport: document.querySelector('meta[name="viewport"]')?.content || '',
            charset: document.querySelector('meta[charset]')?.getAttribute('charset') || '',
            language: document.querySelector('meta[name="language"]')?.content || '',
            author: document.querySelector('meta[name="author"]')?.content || ''
        };

        // 分析质量
        const analysis = {
            titleLength: metaTags.title.length,
            titleOptimal: metaTags.title.length >= 30 && metaTags.title.length <= 60,
            descriptionLength: metaTags.description.length,
            descriptionOptimal: metaTags.description.length >= 120 && metaTags.description.length <= 160,
            hasKeywords: !!metaTags.keywords,
            hasRobots: !!metaTags.robots,
            hasViewport: !!metaTags.viewport,
            hasCharset: !!metaTags.charset
        };

        return { tags: metaTags, analysis };
    }

    /**
     * 分析结构化数据
     */
    analyzeStructuredData() {
        const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
        const structuredData = [];

        jsonLdScripts.forEach(script => {
            try {
                const data = JSON.parse(script.textContent);
                structuredData.push(data);
            } catch (e) {
                console.warn('无效的JSON-LD结构化数据:', e);
            }
        });

        return {
            count: structuredData.length,
            data: structuredData,
            hasPersonSchema: structuredData.some(data => data['@type'] === 'Person'),
            hasOrganizationSchema: structuredData.some(data => data['@type'] === 'Organization'),
            hasWebsiteSchema: structuredData.some(data => data['@type'] === 'Website')
        };
    }

    /**
     * 分析规范URL
     */
    analyzeCanonicalURL() {
        const canonical = document.querySelector('link[rel="canonical"]');
        return {
            exists: !!canonical,
            url: canonical?.href || '',
            isCorrect: canonical?.href === window.location.href
        };
    }

    /**
     * 分析robots.txt
     */
    analyzeRobotsTxt() {
        // 通过fetch检查robots.txt
        return fetch('/robots.txt')
            .then(response => ({
                exists: response.ok,
                status: response.status
            }))
            .catch(() => ({ exists: false, status: 404 }));
    }

    /**
     * 分析站点地图
     */
    analyzeSitemap() {
        return fetch('/sitemap.xml')
            .then(response => ({
                exists: response.ok,
                status: response.status
            }))
            .catch(() => ({ exists: false, status: 404 }));
    }

    /**
     * 分析HTTP头部
     */
    analyzeHTTPHeaders() {
        // 客户端无法直接获取所有HTTP头部，这里模拟分析
        return {
            contentType: document.contentType,
            charset: document.characterSet,
            lastModified: document.lastModified,
            referrer: document.referrer
        };
    }

    /**
     * 分析URL结构
     */
    analyzeURLStructure() {
        const url = new URL(window.location.href);
        return {
            protocol: url.protocol,
            isHTTPS: url.protocol === 'https:',
            hasWWW: url.hostname.startsWith('www.'),
            pathLength: url.pathname.length,
            hasParameters: url.search.length > 0,
            hasFragment: url.hash.length > 0,
            isClean: !url.search && !url.hash && url.pathname.endsWith('.html') === false
        };
    }

    /**
     * 分析内部链接
     */
    analyzeInternalLinking() {
        const links = document.querySelectorAll('a[href]');
        const internalLinks = [];
        const externalLinks = [];

        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('/') || href.includes(window.location.hostname)) {
                internalLinks.push({
                    href,
                    text: link.textContent.trim(),
                    hasTitle: !!link.title,
                    hasAlt: !!link.querySelector('img')?.alt
                });
            } else if (href.startsWith('http')) {
                externalLinks.push({
                    href,
                    text: link.textContent.trim(),
                    hasNofollow: link.rel.includes('nofollow'),
                    hasNoopener: link.rel.includes('noopener')
                });
            }
        });

        return {
            totalLinks: links.length,
            internalCount: internalLinks.length,
            externalCount: externalLinks.length,
            internalLinks,
            externalLinks
        };
    }

    /**
     * 内容SEO分析
     */
    analyzeContentSEO() {
        const content = {
            headings: this.analyzeHeadings(),
            images: this.analyzeImages(),
            textContent: this.analyzeTextContent(),
            keywords: this.analyzeKeywordDensity(),
            readability: this.analyzeReadability()
        };

        this.seoData.contentSEO = content;
        return content;
    }

    /**
     * 分析标题结构
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

        const analysis = {
            h1Count: headings.h1.length,
            h1Text: Array.from(headings.h1).map(h => h.textContent.trim()),
            hasProperHierarchy: this.checkHeadingHierarchy(),
            totalHeadings: Object.values(headings).reduce((sum, nodeList) => sum + nodeList.length, 0)
        };

        return { headings, analysis };
    }

    /**
     * 检查标题层次结构
     */
    checkHeadingHierarchy() {
        const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let previousLevel = 0;
        let isProper = true;

        allHeadings.forEach(heading => {
            const currentLevel = parseInt(heading.tagName.charAt(1));
            if (currentLevel > previousLevel + 1) {
                isProper = false;
            }
            previousLevel = currentLevel;
        });

        return isProper;
    }

    /**
     * 分析图片SEO
     */
    analyzeImages() {
        const images = document.querySelectorAll('img');
        const analysis = {
            totalImages: images.length,
            withAlt: 0,
            withTitle: 0,
            withLazyLoading: 0,
            optimizedFormats: 0,
            issues: []
        };

        images.forEach((img, index) => {
            if (img.alt) analysis.withAlt++;
            if (img.title) analysis.withTitle++;
            if (img.loading === 'lazy') analysis.withLazyLoading++;
            
            const src = img.src || img.dataset.src;
            if (src && (src.includes('.webp') || src.includes('.avif'))) {
                analysis.optimizedFormats++;
            }

            // 检查问题
            if (!img.alt) {
                analysis.issues.push(`图片 ${index + 1} 缺少alt属性`);
            }
            if (!img.width || !img.height) {
                analysis.issues.push(`图片 ${index + 1} 缺少尺寸属性`);
            }
        });

        return analysis;
    }

    /**
     * 分析文本内容
     */
    analyzeTextContent() {
        const textContent = document.body.textContent || '';
        const words = textContent.split(/\s+/).filter(word => word.length > 0);
        
        return {
            totalCharacters: textContent.length,
            totalWords: words.length,
            averageWordsPerSentence: this.calculateAverageWordsPerSentence(textContent),
            readingTime: Math.ceil(words.length / 200) // 假设每分钟200词
        };
    }

    /**
     * 计算平均每句话的词数
     */
    calculateAverageWordsPerSentence(text) {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        if (sentences.length === 0) return 0;
        
        const totalWords = sentences.reduce((sum, sentence) => {
            return sum + sentence.split(/\s+/).filter(word => word.length > 0).length;
        }, 0);
        
        return Math.round(totalWords / sentences.length);
    }

    /**
     * 分析关键词密度
     */
    analyzeKeywordDensity() {
        const metaKeywords = document.querySelector('meta[name="keywords"]')?.content || '';
        const keywords = metaKeywords.split(',').map(k => k.trim().toLowerCase());
        const textContent = document.body.textContent.toLowerCase();
        
        const density = {};
        keywords.forEach(keyword => {
            if (keyword) {
                const regex = new RegExp(keyword, 'gi');
                const matches = textContent.match(regex) || [];
                density[keyword] = {
                    count: matches.length,
                    density: (matches.length / textContent.split(/\s+/).length * 100).toFixed(2)
                };
            }
        });

        return density;
    }

    /**
     * 分析可读性
     */
    analyzeReadability() {
        const textContent = document.body.textContent || '';
        const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = textContent.split(/\s+/).filter(word => word.length > 0);
        const syllables = this.countSyllables(textContent);

        // Flesch Reading Ease Score
        const fleschScore = 206.835 - (1.015 * (words.length / sentences.length)) - (84.6 * (syllables / words.length));
        
        return {
            fleschScore: Math.round(fleschScore),
            readabilityLevel: this.getReadabilityLevel(fleschScore),
            averageSentenceLength: Math.round(words.length / sentences.length),
            averageSyllablesPerWord: Math.round(syllables / words.length * 100) / 100
        };
    }

    /**
     * 计算音节数（简化版）
     */
    countSyllables(text) {
        // 简化的音节计算，适用于中文
        const chineseChars = text.match(/[\u4e00-\u9fff]/g) || [];
        const englishWords = text.match(/[a-zA-Z]+/g) || [];
        
        let syllables = chineseChars.length; // 中文字符通常一个字一个音节
        
        englishWords.forEach(word => {
            syllables += Math.max(1, word.match(/[aeiouAEIOU]/g)?.length || 1);
        });
        
        return syllables;
    }

    /**
     * 获取可读性等级
     */
    getReadabilityLevel(score) {
        if (score >= 90) return '非常容易';
        if (score >= 80) return '容易';
        if (score >= 70) return '较容易';
        if (score >= 60) return '标准';
        if (score >= 50) return '较难';
        if (score >= 30) return '难';
        return '非常难';
    }

    /**
     * 语义SEO分析
     */
    analyzeSemanticSEO() {
        const semantic = {
            entities: this.extractEntities(),
            topics: this.extractTopics(),
            context: this.analyzeContext(),
            semanticMarkup: this.analyzeSemanticMarkup()
        };

        this.seoData.semanticSEO = semantic;
        return semantic;
    }

    /**
     * 提取实体
     */
    extractEntities() {
        const textContent = document.body.textContent || '';
        
        // 简化的实体提取（实际应用中可使用NLP库）
        const entities = {
            persons: this.extractPersons(textContent),
            organizations: this.extractOrganizations(textContent),
            technologies: this.extractTechnologies(textContent),
            locations: this.extractLocations(textContent)
        };

        return entities;
    }

    /**
     * 提取人名
     */
    extractPersons(text) {
        const personPatterns = [
            /曹洁冰/g,
            /[A-Z][a-z]+ [A-Z][a-z]+/g // 英文姓名模式
        ];
        
        const persons = new Set();
        personPatterns.forEach(pattern => {
            const matches = text.match(pattern) || [];
            matches.forEach(match => persons.add(match));
        });
        
        return Array.from(persons);
    }

    /**
     * 提取组织机构
     */
    extractOrganizations(text) {
        const orgPatterns = [
            /[A-Z][a-zA-Z]+ (Inc|Corp|Ltd|LLC|Company)/g,
            /(公司|企业|机构|组织)/g
        ];
        
        const organizations = new Set();
        orgPatterns.forEach(pattern => {
            const matches = text.match(pattern) || [];
            matches.forEach(match => organizations.add(match));
        });
        
        return Array.from(organizations);
    }

    /**
     * 提取技术关键词
     */
    extractTechnologies(text) {
        const techKeywords = [
            'Java', 'Spring Boot', 'Python', 'JavaScript', 'React', 'Vue',
            'Hadoop', 'Spark', 'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes',
            'MySQL', 'Redis', 'MongoDB', 'Elasticsearch', 'Kafka', 'RabbitMQ',
            '大数据', '人工智能', '机器学习', '深度学习', '微服务', '云计算'
        ];
        
        const foundTech = techKeywords.filter(tech => 
            text.toLowerCase().includes(tech.toLowerCase())
        );
        
        return foundTech;
    }

    /**
     * 提取地理位置
     */
    extractLocations(text) {
        const locationPatterns = [
            /(北京|上海|广州|深圳|杭州|南京|成都|武汉|西安|重庆)/g,
            /[A-Z][a-z]+ (City|State|Province|Country)/g
        ];
        
        const locations = new Set();
        locationPatterns.forEach(pattern => {
            const matches = text.match(pattern) || [];
            matches.forEach(match => locations.add(match));
        });
        
        return Array.from(locations);
    }

    /**
     * 提取主题
     */
    extractTopics() {
        const textContent = document.body.textContent || '';
        const topics = [
            { name: 'Java开发', keywords: ['Java', 'Spring', 'Maven', 'Gradle'], score: 0 },
            { name: '大数据', keywords: ['Hadoop', 'Spark', 'Hive', 'HBase'], score: 0 },
            { name: '人工智能', keywords: ['AI', '机器学习', '深度学习', 'TensorFlow'], score: 0 },
            { name: '云计算', keywords: ['Docker', 'Kubernetes', '微服务', '容器'], score: 0 },
            { name: '数据库', keywords: ['MySQL', 'Redis', 'MongoDB', 'SQL'], score: 0 }
        ];

        topics.forEach(topic => {
            topic.keywords.forEach(keyword => {
                const regex = new RegExp(keyword, 'gi');
                const matches = textContent.match(regex) || [];
                topic.score += matches.length;
            });
        });

        return topics.sort((a, b) => b.score - a.score);
    }

    /**
     * 分析上下文
     */
    analyzeContext() {
        return {
            pageType: this.determinePageType(),
            contentType: this.determineContentType(),
            audience: this.determineAudience(),
            intent: this.determineIntent()
        };
    }

    /**
     * 确定页面类型
     */
    determinePageType() {
        const title = document.title.toLowerCase();
        const url = window.location.pathname.toLowerCase();
        
        if (title.includes('简历') || title.includes('resume') || url.includes('resume')) {
            return 'resume';
        }
        if (title.includes('博客') || title.includes('blog') || url.includes('blog')) {
            return 'blog';
        }
        if (title.includes('项目') || title.includes('project') || url.includes('project')) {
            return 'portfolio';
        }
        return 'homepage';
    }

    /**
     * 确定内容类型
     */
    determineContentType() {
        const headings = document.querySelectorAll('h1, h2, h3');
        const headingText = Array.from(headings).map(h => h.textContent.toLowerCase()).join(' ');
        
        if (headingText.includes('技能') || headingText.includes('skill')) {
            return 'skills';
        }
        if (headingText.includes('经验') || headingText.includes('experience')) {
            return 'experience';
        }
        if (headingText.includes('项目') || headingText.includes('project')) {
            return 'projects';
        }
        return 'general';
    }

    /**
     * 确定目标受众
     */
    determineAudience() {
        const content = document.body.textContent.toLowerCase();
        
        if (content.includes('招聘') || content.includes('hr') || content.includes('人力资源')) {
            return 'recruiters';
        }
        if (content.includes('技术') || content.includes('开发') || content.includes('工程师')) {
            return 'technical';
        }
        if (content.includes('管理') || content.includes('领导') || content.includes('团队')) {
            return 'management';
        }
        return 'general';
    }

    /**
     * 确定搜索意图
     */
    determineIntent() {
        const title = document.title.toLowerCase();
        const description = document.querySelector('meta[name="description"]')?.content.toLowerCase() || '';
        
        if (title.includes('招聘') || description.includes('求职')) {
            return 'job-seeking';
        }
        if (title.includes('技术') || description.includes('技术分享')) {
            return 'knowledge-sharing';
        }
        if (title.includes('服务') || description.includes('咨询')) {
            return 'service-offering';
        }
        return 'informational';
    }

    /**
     * 分析语义标记
     */
    analyzeSemanticMarkup() {
        const semanticElements = {
            article: document.querySelectorAll('article').length,
            section: document.querySelectorAll('section').length,
            nav: document.querySelectorAll('nav').length,
            header: document.querySelectorAll('header').length,
            footer: document.querySelectorAll('footer').length,
            main: document.querySelectorAll('main').length,
            aside: document.querySelectorAll('aside').length
        };

        const ariaLabels = document.querySelectorAll('[aria-label]').length;
        const ariaDescribedBy = document.querySelectorAll('[aria-describedby]').length;
        const roles = document.querySelectorAll('[role]').length;

        return {
            semanticElements,
            accessibility: {
                ariaLabels,
                ariaDescribedBy,
                roles
            },
            score: this.calculateSemanticScore(semanticElements)
        };
    }

    /**
     * 计算语义化评分
     */
    calculateSemanticScore(elements) {
        let score = 0;
        Object.values(elements).forEach(count => {
            if (count > 0) score += 10;
        });
        return Math.min(score, 100);
    }

    /**
     * 本地SEO分析
     */
    analyzeLocalSEO() {
        const local = {
            businessInfo: this.extractBusinessInfo(),
            locationData: this.extractLocationData(),
            contactInfo: this.extractContactInfo(),
            localSchema: this.analyzeLocalSchema()
        };

        this.seoData.localSEO = local;
        return local;
    }

    /**
     * 提取业务信息
     */
    extractBusinessInfo() {
        const textContent = document.body.textContent || '';
        
        return {
            businessName: this.extractBusinessName(textContent),
            businessType: this.extractBusinessType(textContent),
            services: this.extractServices(textContent)
        };
    }

    /**
     * 提取业务名称
     */
    extractBusinessName(text) {
        const namePatterns = [
            /曹洁冰/g,
            /个人工作室/g,
            /技术咨询/g
        ];
        
        for (const pattern of namePatterns) {
            const match = text.match(pattern);
            if (match) return match[0];
        }
        
        return '';
    }

    /**
     * 提取业务类型
     */
    extractBusinessType(text) {
        if (text.includes('软件开发') || text.includes('程序员')) return '软件开发';
        if (text.includes('技术咨询') || text.includes('顾问')) return '技术咨询';
        if (text.includes('培训') || text.includes('教育')) return '技术培训';
        return '技术服务';
    }

    /**
     * 提取服务项目
     */
    extractServices(text) {
        const services = [];
        const serviceKeywords = [
            'Java开发', 'Spring Boot开发', '微服务架构',
            '大数据开发', 'Hadoop开发', 'Spark开发',
            'AI开发', '机器学习', '深度学习',
            '技术咨询', '架构设计', '性能优化'
        ];
        
        serviceKeywords.forEach(service => {
            if (text.includes(service)) {
                services.push(service);
            }
        });
        
        return services;
    }

    /**
     * 提取位置数据
     */
    extractLocationData() {
        const textContent = document.body.textContent || '';
        
        return {
            country: '中国',
            regions: this.extractLocations(textContent),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
    }

    /**
     * 提取联系信息
     */
    extractContactInfo() {
        const textContent = document.body.textContent || '';
        
        return {
            email: this.extractEmail(textContent),
            phone: this.extractPhone(textContent),
            website: window.location.origin,
            socialMedia: this.extractSocialMedia()
        };
    }

    /**
     * 提取邮箱
     */
    extractEmail(text) {
        const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const matches = text.match(emailPattern);
        return matches ? matches[0] : '';
    }

    /**
     * 提取电话
     */
    extractPhone(text) {
        const phonePatterns = [
            /1[3-9]\d{9}/g, // 中国手机号
            /\+86\s*1[3-9]\d{9}/g, // 带国际区号的中国手机号
            /\d{3}-\d{4}-\d{4}/g // 美国电话格式
        ];
        
        for (const pattern of phonePatterns) {
            const matches = text.match(pattern);
            if (matches) return matches[0];
        }
        
        return '';
    }

    /**
     * 提取社交媒体
     */
    extractSocialMedia() {
        const socialLinks = document.querySelectorAll('a[href*="github"], a[href*="linkedin"], a[href*="twitter"], a[href*="weibo"]');
        const social = {};
        
        socialLinks.forEach(link => {
            const href = link.href;
            if (href.includes('github')) social.github = href;
            if (href.includes('linkedin')) social.linkedin = href;
            if (href.includes('twitter')) social.twitter = href;
            if (href.includes('weibo')) social.weibo = href;
        });
        
        return social;
    }

    /**
     * 分析本地Schema
     */
    analyzeLocalSchema() {
        const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
        let hasLocalBusiness = false;
        let hasPerson = false;
        let hasOrganization = false;
        
        jsonLdScripts.forEach(script => {
            try {
                const data = JSON.parse(script.textContent);
                if (data['@type'] === 'LocalBusiness') hasLocalBusiness = true;
                if (data['@type'] === 'Person') hasPerson = true;
                if (data['@type'] === 'Organization') hasOrganization = true;
            } catch (e) {
                // 忽略解析错误
            }
        });
        
        return {
            hasLocalBusiness,
            hasPerson,
            hasOrganization
        };
    }

    /**
     * 社交媒体SEO分析
     */
    analyzeSocialSEO() {
        const social = {
            openGraph: this.analyzeOpenGraph(),
            twitterCard: this.analyzeTwitterCard(),
            socialSharing: this.analyzeSocialSharing(),
            socialProof: this.analyzeSocialProof()
        };

        this.seoData.socialSEO = social;
        return social;
    }

    /**
     * 分析Open Graph标签
     */
    analyzeOpenGraph() {
        const ogTags = {
            title: document.querySelector('meta[property="og:title"]')?.content || '',
            description: document.querySelector('meta[property="og:description"]')?.content || '',
            image: document.querySelector('meta[property="og:image"]')?.content || '',
            url: document.querySelector('meta[property="og:url"]')?.content || '',
            type: document.querySelector('meta[property="og:type"]')?.content || '',
            siteName: document.querySelector('meta[property="og:site_name"]')?.content || '',
            locale: document.querySelector('meta[property="og:locale"]')?.content || ''
        };

        const analysis = {
            hasTitle: !!ogTags.title,
            hasDescription: !!ogTags.description,
            hasImage: !!ogTags.image,
            hasUrl: !!ogTags.url,
            hasType: !!ogTags.type,
            completeness: Object.values(ogTags).filter(Boolean).length / Object.keys(ogTags).length * 100
        };

        return { tags: ogTags, analysis };
    }

    /**
     * 分析Twitter Card标签
     */
    analyzeTwitterCard() {
        const twitterTags = {
            card: document.querySelector('meta[name="twitter:card"]')?.content || '',
            title: document.querySelector('meta[name="twitter:title"]')?.content || '',
            description: document.querySelector('meta[name="twitter:description"]')?.content || '',
            image: document.querySelector('meta[name="twitter:image"]')?.content || '',
            site: document.querySelector('meta[name="twitter:site"]')?.content || '',
            creator: document.querySelector('meta[name="twitter:creator"]')?.content || ''
        };

        const analysis = {
            hasCard: !!twitterTags.card,
            hasTitle: !!twitterTags.title,
            hasDescription: !!twitterTags.description,
            hasImage: !!twitterTags.image,
            completeness: Object.values(twitterTags).filter(Boolean).length / Object.keys(twitterTags).length * 100
        };

        return { tags: twitterTags, analysis };
    }

    /**
     * 分析社交分享功能
     */
    analyzeSocialSharing() {
        const shareButtons = document.querySelectorAll('[data-share], .share-button, .social-share');
        const platforms = ['facebook', 'twitter', 'linkedin', 'weibo', 'wechat'];
        
        const availablePlatforms = [];
        platforms.forEach(platform => {
            const button = document.querySelector(`[data-share="${platform}"], .share-${platform}`);
            if (button) availablePlatforms.push(platform);
        });

        return {
            hasShareButtons: shareButtons.length > 0,
            shareButtonCount: shareButtons.length,
            availablePlatforms,
            platformCount: availablePlatforms.length
        };
    }

    /**
     * 分析社交证明
     */
    analyzeSocialProof() {
        const textContent = document.body.textContent.toLowerCase();
        
        return {
            hasTestimonials: textContent.includes('推荐') || textContent.includes('评价'),
            hasReviews: textContent.includes('评论') || textContent.includes('反馈'),
            hasCertifications: textContent.includes('认证') || textContent.includes('证书'),
            hasAwards: textContent.includes('奖项') || textContent.includes('荣誉')
        };
    }

    /**
     * 性能SEO分析
     */
    analyzePerformanceSEO() {
        const performance = {
            pageSpeed: this.analyzePageSpeed(),
            mobileOptimization: this.analyzeMobileOptimization(),
            coreWebVitals: this.analyzeCoreWebVitals(),
            technicalOptimization: this.analyzeTechnicalOptimization()
        };

        this.seoData.performanceSEO = performance;
        return performance;
    }

    /**
     * 分析页面速度
     */
    analyzePageSpeed() {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
        const firstPaint = performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint');
        
        return {
            loadTime,
            domContentLoaded,
            firstPaint: firstPaint ? firstPaint.startTime : null,
            isOptimal: loadTime < 3000,
            grade: this.getSpeedGrade(loadTime)
        };
    }

    /**
     * 获取速度等级
     */
    getSpeedGrade(loadTime) {
        if (loadTime < 1000) return 'A';
        if (loadTime < 2000) return 'B';
        if (loadTime < 3000) return 'C';
        if (loadTime < 5000) return 'D';
        return 'F';
    }

    /**
     * 分析移动端优化
     */
    analyzeMobileOptimization() {
        const viewport = document.querySelector('meta[name="viewport"]');
        const touchIcons = document.querySelectorAll('link[rel*="apple-touch-icon"]');
        const manifest = document.querySelector('link[rel="manifest"]');
        
        return {
            hasViewport: !!viewport,
            viewportContent: viewport?.content || '',
            hasTouchIcons: touchIcons.length > 0,
            hasManifest: !!manifest,
            isMobileFriendly: !!viewport && viewport.content.includes('width=device-width')
        };
    }

    /**
     * 分析Core Web Vitals
     */
    analyzeCoreWebVitals() {
        // 这里会与Core Web Vitals监控器集成
        return {
            hasMonitoring: !!window.coreWebVitalsMonitor,
            monitoringActive: !!window.coreWebVitalsMonitor?.vitals
        };
    }

    /**
     * 分析技术优化
     */
    analyzeTechnicalOptimization() {
        const scripts = document.querySelectorAll('script[src]');
        const styles = document.querySelectorAll('link[rel="stylesheet"]');
        const images = document.querySelectorAll('img');
        
        let deferredScripts = 0;
        let asyncScripts = 0;
        scripts.forEach(script => {
            if (script.defer) deferredScripts++;
            if (script.async) asyncScripts++;
        });

        let lazyImages = 0;
        images.forEach(img => {
            if (img.loading === 'lazy') lazyImages++;
        });

        return {
            totalScripts: scripts.length,
            deferredScripts,
            asyncScripts,
            totalStyles: styles.length,
            totalImages: images.length,
            lazyImages,
            optimizationScore: this.calculateOptimizationScore({
                deferredScripts,
                asyncScripts,
                lazyImages,
                totalScripts: scripts.length,
                totalImages: images.length
            })
        };
    }

    /**
     * 计算优化评分
     */
    calculateOptimizationScore(data) {
        let score = 0;
        
        // 脚本优化评分
        if (data.totalScripts > 0) {
            const scriptOptimization = (data.deferredScripts + data.asyncScripts) / data.totalScripts;
            score += scriptOptimization * 30;
        }
        
        // 图片优化评分
        if (data.totalImages > 0) {
            const imageOptimization = data.lazyImages / data.totalImages;
            score += imageOptimization * 30;
        }
        
        // 基础优化评分
        score += 40;
        
        return Math.round(score);
    }

    /**
     * 生成SEO报告
     */
    generateSEOReport() {
        const report = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            overall: this.calculateOverallScore(),
            technical: this.seoData.technicalSEO,
            content: this.seoData.contentSEO,
            semantic: this.seoData.semanticSEO,
            local: this.seoData.localSEO,
            social: this.seoData.socialSEO,
            performance: this.seoData.performanceSEO,
            recommendations: this.generateRecommendations()
        };

        // 输出报告到控制台
        console.group('🔍 SEO分析报告');
        console.log('总体评分:', report.overall.score + '/100');
        console.log('技术SEO:', report.overall.technical + '/100');
        console.log('内容SEO:', report.overall.content + '/100');
        console.log('语义SEO:', report.overall.semantic + '/100');
        console.log('本地SEO:', report.overall.local + '/100');
        console.log('社交SEO:', report.overall.social + '/100');
        console.log('性能SEO:', report.overall.performance + '/100');
        console.groupEnd();

        // 输出建议
        if (report.recommendations.length > 0) {
            console.group('💡 优化建议');
            report.recommendations.forEach((rec, index) => {
                console.log(`${index + 1}. ${rec.title}: ${rec.description}`);
            });
            console.groupEnd();
        }

        return report;
    }

    /**
     * 计算总体评分
     */
    calculateOverallScore() {
        const scores = {
            technical: this.calculateTechnicalScore(),
            content: this.calculateContentScore(),
            semantic: this.calculateSemanticScore(this.seoData.semanticSEO?.semanticMarkup?.semanticElements || {}),
            local: this.calculateLocalScore(),
            social: this.calculateSocialScore(),
            performance: this.calculatePerformanceScore()
        };

        const weights = {
            technical: 0.25,
            content: 0.25,
            semantic: 0.15,
            local: 0.10,
            social: 0.10,
            performance: 0.15
        };

        const overallScore = Object.keys(scores).reduce((sum, key) => {
            return sum + (scores[key] * weights[key]);
        }, 0);

        return {
            score: Math.round(overallScore),
            ...scores
        };
    }

    /**
     * 计算技术SEO评分
     */
    calculateTechnicalScore() {
        const technical = this.seoData.technicalSEO;
        let score = 0;

        // Meta标签评分 (40分)
        if (technical.metaTags?.analysis) {
            const meta = technical.metaTags.analysis;
            if (meta.titleOptimal) score += 10;
            if (meta.descriptionOptimal) score += 10;
            if (meta.hasKeywords) score += 5;
            if (meta.hasRobots) score += 5;
            if (meta.hasViewport) score += 5;
            if (meta.hasCharset) score += 5;
        }

        // 结构化数据评分 (20分)
        if (technical.structuredData?.count > 0) score += 20;

        // 规范URL评分 (10分)
        if (technical.canonicalURL?.exists) score += 10;

        // URL结构评分 (15分)
        if (technical.urlStructure) {
            if (technical.urlStructure.isHTTPS) score += 5;
            if (technical.urlStructure.isClean) score += 10;
        }

        // 内部链接评分 (15分)
        if (technical.internalLinking?.internalCount > 0) score += 15;

        return Math.min(score, 100);
    }

    /**
     * 计算内容SEO评分
     */
    calculateContentScore() {
        const content = this.seoData.contentSEO;
        let score = 0;

        // 标题结构评分 (30分)
        if (content.headings?.analysis) {
            const headings = content.headings.analysis;
            if (headings.h1Count === 1) score += 15;
            if (headings.hasProperHierarchy) score += 15;
        }

        // 图片优化评分 (25分)
        if (content.images) {
            const images = content.images;
            if (images.totalImages > 0) {
                const altRatio = images.withAlt / images.totalImages;
                score += altRatio * 25;
            }
        }

        // 文本内容评分 (25分)
        if (content.textContent?.totalWords > 300) score += 25;

        // 可读性评分 (20分)
        if (content.readability?.fleschScore > 60) score += 20;

        return Math.min(score, 100);
    }

    /**
     * 计算本地SEO评分
     */
    calculateLocalScore() {
        const local = this.seoData.localSEO;
        let score = 0;

        // 业务信息评分 (40分)
        if (local.businessInfo?.businessName) score += 20;
        if (local.businessInfo?.services?.length > 0) score += 20;

        // 联系信息评分 (30分)
        if (local.contactInfo?.email) score += 10;
        if (local.contactInfo?.website) score += 10;
        if (Object.keys(local.contactInfo?.socialMedia || {}).length > 0) score += 10;

        // 本地Schema评分 (30分)
        if (local.localSchema?.hasPerson) score += 30;

        return Math.min(score, 100);
    }

    /**
     * 计算社交SEO评分
     */
    calculateSocialScore() {
        const social = this.seoData.socialSEO;
        let score = 0;

        // Open Graph评分 (50分)
        if (social.openGraph?.analysis?.completeness) {
            score += social.openGraph.analysis.completeness * 0.5;
        }

        // Twitter Card评分 (30分)
        if (social.twitterCard?.analysis?.completeness) {
            score += social.twitterCard.analysis.completeness * 0.3;
        }

        // 社交分享评分 (20分)
        if (social.socialSharing?.hasShareButtons) score += 20;

        return Math.min(score, 100);
    }

    /**
     * 计算性能SEO评分
     */
    calculatePerformanceScore() {
        const performance = this.seoData.performanceSEO;
        let score = 0;

        // 页面速度评分 (40分)
        if (performance.pageSpeed?.isOptimal) score += 40;
        else if (performance.pageSpeed?.loadTime < 5000) score += 20;

        // 移动端优化评分 (30分)
        if (performance.mobileOptimization?.isMobileFriendly) score += 30;

        // 技术优化评分 (30分)
        if (performance.technicalOptimization?.optimizationScore) {
            score += performance.technicalOptimization.optimizationScore * 0.3;
        }

        return Math.min(score, 100);
    }

    /**
     * 生成优化建议
     */
    generateRecommendations() {
        const recommendations = [];
        const technical = this.seoData.technicalSEO;
        const content = this.seoData.contentSEO;
        const social = this.seoData.socialSEO;
        const performance = this.seoData.performanceSEO;

        // 技术SEO建议
        if (!technical.metaTags?.analysis?.titleOptimal) {
            recommendations.push({
                category: 'technical',
                priority: 'high',
                title: '优化页面标题',
                description: '页面标题长度应在30-60个字符之间，包含主要关键词'
            });
        }

        if (!technical.metaTags?.analysis?.descriptionOptimal) {
            recommendations.push({
                category: 'technical',
                priority: 'high',
                title: '优化Meta描述',
                description: 'Meta描述长度应在120-160个字符之间，吸引用户点击'
            });
        }

        if (!technical.structuredData?.count) {
            recommendations.push({
                category: 'technical',
                priority: 'medium',
                title: '添加结构化数据',
                description: '添加JSON-LD结构化数据，提升搜索结果展示效果'
            });
        }

        // 内容SEO建议
        if (content.headings?.analysis?.h1Count !== 1) {
            recommendations.push({
                category: 'content',
                priority: 'high',
                title: '优化H1标签',
                description: '每个页面应该有且仅有一个H1标签'
            });
        }

        if (content.images?.totalImages > 0 && content.images.withAlt / content.images.totalImages < 0.8) {
            recommendations.push({
                category: 'content',
                priority: 'medium',
                title: '完善图片Alt属性',
                description: '为所有图片添加描述性的Alt属性，提升可访问性和SEO'
            });
        }

        // 社交SEO建议
        if (social.openGraph?.analysis?.completeness < 80) {
            recommendations.push({
                category: 'social',
                priority: 'medium',
                title: '完善Open Graph标签',
                description: '添加完整的Open Graph标签，优化社交媒体分享效果'
            });
        }

        // 性能SEO建议
        if (!performance.pageSpeed?.isOptimal) {
            recommendations.push({
                category: 'performance',
                priority: 'high',
                title: '优化页面加载速度',
                description: '压缩资源、启用缓存、优化图片，提升页面加载速度'
            });
        }

        if (!performance.mobileOptimization?.isMobileFriendly) {
            recommendations.push({
                category: 'performance',
                priority: 'high',
                title: '优化移动端体验',
                description: '确保网站在移动设备上的良好显示和交互体验'
            });
        }

        return recommendations;
    }

    /**
     * 实施自动优化
     */
    implementOptimizations() {
        // 自动添加缺失的Meta标签
        this.autoAddMetaTags();
        
        // 自动优化图片
        this.autoOptimizeImages();
        
        // 自动添加结构化数据
        this.autoAddStructuredData();
        
        // 自动优化内部链接
        this.autoOptimizeInternalLinks();
    }

    /**
     * 自动添加Meta标签
     */
    autoAddMetaTags() {
        // 添加缺失的robots标签
        if (!document.querySelector('meta[name="robots"]')) {
            const robotsMeta = document.createElement('meta');
            robotsMeta.name = 'robots';
            robotsMeta.content = 'index, follow';
            document.head.appendChild(robotsMeta);
        }

        // 添加缺失的author标签
        if (!document.querySelector('meta[name="author"]')) {
            const authorMeta = document.createElement('meta');
            authorMeta.name = 'author';
            authorMeta.content = '曹洁冰';
            document.head.appendChild(authorMeta);
        }
    }

    /**
     * 自动优化图片
     */
    autoOptimizeImages() {
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach((img, index) => {
            // 为缺失alt属性的图片添加默认alt
            if (!img.alt) {
                img.alt = `图片 ${index + 1}`;
            }
            
            // 添加loading="lazy"属性
            if (!img.loading && index > 2) { // 前3张图片不使用懒加载
                img.loading = 'lazy';
            }
        });
    }

    /**
     * 自动添加结构化数据
     */
    autoAddStructuredData() {
        // 检查是否已有Person类型的结构化数据
        const existingPersonSchema = document.querySelector('script[type="application/ld+json"]');
        if (!existingPersonSchema) {
            const personSchema = {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "曹洁冰",
                "jobTitle": "高级技术专家",
                "description": "资深Java开发工程师，大数据专家，AI应用开发工程师",
                "url": window.location.origin,
                "knowsAbout": [
                    "Java开发", "Spring Boot", "微服务架构",
                    "大数据开发", "Hadoop", "Spark",
                    "AI开发", "机器学习", "深度学习"
                ]
            };

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(personSchema, null, 2);
            document.head.appendChild(script);
        }
    }

    /**
     * 自动优化内部链接
     */
    autoOptimizeInternalLinks() {
        const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="#"]');
        internalLinks.forEach(link => {
            // 为内部链接添加title属性
            if (!link.title && link.textContent.trim()) {
                link.title = link.textContent.trim();
            }
        });

        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
        externalLinks.forEach(link => {
            // 为外部链接添加安全属性
            if (!link.rel.includes('noopener')) {
                link.rel = link.rel ? link.rel + ' noopener' : 'noopener';
            }
            if (!link.rel.includes('noreferrer')) {
                link.rel = link.rel + ' noreferrer';
            }
        });
    }
}

// 初始化SEO分析器
document.addEventListener('DOMContentLoaded', () => {
    window.seoAnalyzer = new SEOAnalyzer();
});

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SEOAnalyzer;
}