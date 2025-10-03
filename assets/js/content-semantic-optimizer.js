/**
 * 内容优化和语义搜索适配工具
 * 提升内容质量和搜索引擎理解度
 */
class ContentSemanticOptimizer {
    constructor() {
        this.config = {
            // 关键词密度配置
            keywordDensity: {
                min: 0.5,  // 最小密度 0.5%
                max: 3.0,  // 最大密度 3.0%
                optimal: 1.5  // 最佳密度 1.5%
            },
            // 内容长度配置
            contentLength: {
                min: 300,    // 最小字数
                optimal: 800, // 最佳字数
                max: 2000    // 最大字数
            },
            // 语义相关性配置
            semanticRelevance: {
                threshold: 0.7,  // 相关性阈值
                maxSuggestions: 10  // 最大建议数
            }
        };
        
        // 主要关键词和语义词汇
        this.keywords = {
            primary: ['Java开发', '大数据', 'AI开发', '曹洁冰'],
            secondary: ['Spring Boot', 'Hadoop', 'Spark', '机器学习', 'Python', 'TensorFlow'],
            semantic: {
                'Java开发': ['Spring', '微服务', '架构设计', '后端开发', '企业级应用'],
                '大数据': ['数据处理', '分布式计算', '数据仓库', '实时计算', '数据分析'],
                'AI开发': ['机器学习', '深度学习', '人工智能', '算法', '模型训练'],
                '技术专家': ['架构师', '工程师', '开发者', '技术领导', '专业认证']
            }
        };
        
        // 内容质量评分权重
        this.qualityWeights = {
            keywordOptimization: 0.25,    // 关键词优化
            contentStructure: 0.20,       // 内容结构
            semanticRelevance: 0.20,      // 语义相关性
            readability: 0.15,            // 可读性
            uniqueness: 0.10,             // 独特性
            engagement: 0.10              // 参与度
        };
    }

    /**
     * 分析页面内容质量
     * @returns {Object} 内容分析结果
     */
    analyzeContent() {
        const content = this.extractPageContent();
        const analysis = {
            overview: this.getContentOverview(content),
            keywords: this.analyzeKeywords(content),
            structure: this.analyzeContentStructure(),
            semantic: this.analyzeSemanticRelevance(content),
            readability: this.analyzeReadability(content),
            suggestions: []
        };
        
        // 生成优化建议
        analysis.suggestions = this.generateOptimizationSuggestions(analysis);
        
        // 计算总体质量分数
        analysis.qualityScore = this.calculateQualityScore(analysis);
        
        return analysis;
    }

    /**
     * 提取页面内容
     * @returns {Object} 页面内容对象
     */
    extractPageContent() {
        const content = {
            title: document.title || '',
            metaDescription: this.getMetaContent('description') || '',
            headings: this.extractHeadings(),
            paragraphs: this.extractParagraphs(),
            images: this.extractImages(),
            links: this.extractLinks(),
            fullText: document.body.innerText || ''
        };
        
        return content;
    }

    /**
     * 获取内容概览
     * @param {Object} content 内容对象
     * @returns {Object} 内容概览
     */
    getContentOverview(content) {
        const wordCount = content.fullText.split(/\s+/).length;
        const charCount = content.fullText.length;
        const readingTime = Math.ceil(wordCount / 200); // 假设每分钟200字
        
        return {
            wordCount,
            charCount,
            readingTime,
            headingCount: content.headings.length,
            paragraphCount: content.paragraphs.length,
            imageCount: content.images.length,
            linkCount: content.links.length
        };
    }

    /**
     * 分析关键词使用情况
     * @param {Object} content 内容对象
     * @returns {Object} 关键词分析结果
     */
    analyzeKeywords(content) {
        const text = content.fullText.toLowerCase();
        const wordCount = text.split(/\s+/).length;
        const analysis = {
            primary: {},
            secondary: {},
            density: {},
            distribution: {}
        };
        
        // 分析主要关键词
        this.keywords.primary.forEach(keyword => {
            const count = this.countKeywordOccurrences(text, keyword.toLowerCase());
            const density = (count / wordCount) * 100;
            
            analysis.primary[keyword] = {
                count,
                density: parseFloat(density.toFixed(2)),
                status: this.getKeywordStatus(density)
            };
        });
        
        // 分析次要关键词
        this.keywords.secondary.forEach(keyword => {
            const count = this.countKeywordOccurrences(text, keyword.toLowerCase());
            const density = (count / wordCount) * 100;
            
            analysis.secondary[keyword] = {
                count,
                density: parseFloat(density.toFixed(2))
            };
        });
        
        return analysis;
    }

    /**
     * 分析内容结构
     * @returns {Object} 结构分析结果
     */
    analyzeContentStructure() {
        const headings = this.extractHeadings();
        const structure = {
            hierarchy: this.analyzeHeadingHierarchy(headings),
            distribution: this.analyzeContentDistribution(),
            navigation: this.analyzeNavigationStructure(),
            schema: this.analyzeSchemaMarkup()
        };
        
        return structure;
    }

    /**
     * 分析语义相关性
     * @param {Object} content 内容对象
     * @returns {Object} 语义分析结果
     */
    analyzeSemanticRelevance(content) {
        const text = content.fullText.toLowerCase();
        const semantic = {
            topicCoverage: {},
            relatedTerms: {},
            contextualRelevance: 0,
            semanticDensity: 0
        };
        
        // 分析主题覆盖度
        Object.keys(this.keywords.semantic).forEach(topic => {
            const relatedTerms = this.keywords.semantic[topic];
            let coverage = 0;
            
            relatedTerms.forEach(term => {
                if (text.includes(term.toLowerCase())) {
                    coverage++;
                }
            });
            
            semantic.topicCoverage[topic] = {
                coverage: coverage,
                total: relatedTerms.length,
                percentage: parseFloat(((coverage / relatedTerms.length) * 100).toFixed(2))
            };
        });
        
        // 计算语义密度
        semantic.semanticDensity = this.calculateSemanticDensity(text);
        
        return semantic;
    }

    /**
     * 分析可读性
     * @param {Object} content 内容对象
     * @returns {Object} 可读性分析结果
     */
    analyzeReadability(content) {
        const text = content.fullText;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = text.split(/\s+/).filter(w => w.length > 0);
        
        const avgWordsPerSentence = words.length / sentences.length;
        const avgCharsPerWord = text.replace(/\s/g, '').length / words.length;
        
        // 简化的可读性评分（基于句子长度和词汇复杂度）
        let readabilityScore = 100;
        
        // 句子长度惩罚
        if (avgWordsPerSentence > 20) {
            readabilityScore -= (avgWordsPerSentence - 20) * 2;
        }
        
        // 词汇复杂度惩罚
        if (avgCharsPerWord > 6) {
            readabilityScore -= (avgCharsPerWord - 6) * 5;
        }
        
        return {
            score: Math.max(0, Math.min(100, readabilityScore)),
            avgWordsPerSentence: parseFloat(avgWordsPerSentence.toFixed(2)),
            avgCharsPerWord: parseFloat(avgCharsPerWord.toFixed(2)),
            sentenceCount: sentences.length,
            wordCount: words.length,
            level: this.getReadabilityLevel(readabilityScore)
        };
    }

    /**
     * 生成优化建议
     * @param {Object} analysis 分析结果
     * @returns {Array} 优化建议列表
     */
    generateOptimizationSuggestions(analysis) {
        const suggestions = [];
        
        // 关键词优化建议
        Object.entries(analysis.keywords.primary).forEach(([keyword, data]) => {
            if (data.status === 'low') {
                suggestions.push({
                    type: 'keyword',
                    priority: 'high',
                    title: `增加关键词"${keyword}"的使用频率`,
                    description: `当前密度${data.density}%，建议提升至${this.config.keywordDensity.optimal}%`,
                    action: 'increase_keyword_density'
                });
            } else if (data.status === 'high') {
                suggestions.push({
                    type: 'keyword',
                    priority: 'medium',
                    title: `减少关键词"${keyword}"的使用频率`,
                    description: `当前密度${data.density}%，建议降低至${this.config.keywordDensity.optimal}%`,
                    action: 'decrease_keyword_density'
                });
            }
        });
        
        // 内容长度建议
        if (analysis.overview.wordCount < this.config.contentLength.min) {
            suggestions.push({
                type: 'content',
                priority: 'high',
                title: '增加内容长度',
                description: `当前${analysis.overview.wordCount}字，建议增加至${this.config.contentLength.optimal}字以上`,
                action: 'increase_content_length'
            });
        }
        
        // 语义相关性建议
        Object.entries(analysis.semantic.topicCoverage).forEach(([topic, data]) => {
            if (data.percentage < 50) {
                suggestions.push({
                    type: 'semantic',
                    priority: 'medium',
                    title: `增强"${topic}"主题的语义覆盖`,
                    description: `当前覆盖率${data.percentage}%，建议添加更多相关术语`,
                    action: 'enhance_semantic_coverage'
                });
            }
        });
        
        // 可读性建议
        if (analysis.readability.score < 60) {
            suggestions.push({
                type: 'readability',
                priority: 'medium',
                title: '提升内容可读性',
                description: `当前可读性评分${analysis.readability.score}，建议简化句子结构`,
                action: 'improve_readability'
            });
        }
        
        return suggestions;
    }

    /**
     * 计算内容质量分数
     * @param {Object} analysis 分析结果
     * @returns {number} 质量分数 (0-100)
     */
    calculateQualityScore(analysis) {
        let score = 0;
        
        // 关键词优化分数
        const keywordScore = this.calculateKeywordScore(analysis.keywords);
        score += keywordScore * this.qualityWeights.keywordOptimization;
        
        // 内容结构分数
        const structureScore = this.calculateStructureScore(analysis.structure);
        score += structureScore * this.qualityWeights.contentStructure;
        
        // 语义相关性分数
        const semanticScore = this.calculateSemanticScore(analysis.semantic);
        score += semanticScore * this.qualityWeights.semanticRelevance;
        
        // 可读性分数
        score += analysis.readability.score * this.qualityWeights.readability;
        
        // 内容长度分数
        const lengthScore = this.calculateLengthScore(analysis.overview.wordCount);
        score += lengthScore * this.qualityWeights.uniqueness;
        
        return Math.round(Math.max(0, Math.min(100, score)));
    }

    /**
     * 自动优化内容
     * @param {Array} suggestions 优化建议
     */
    autoOptimize(suggestions = null) {
        if (!suggestions) {
            const analysis = this.analyzeContent();
            suggestions = analysis.suggestions;
        }
        
        suggestions.forEach(suggestion => {
            switch (suggestion.action) {
                case 'add_missing_meta':
                    this.addMissingMetaTags();
                    break;
                case 'optimize_headings':
                    this.optimizeHeadings();
                    break;
                case 'enhance_semantic_markup':
                    this.enhanceSemanticMarkup();
                    break;
                case 'improve_internal_linking':
                    this.improveInternalLinking();
                    break;
            }
        });
    }

    /**
     * 添加缺失的meta标签
     */
    addMissingMetaTags() {
        // 添加缺失的meta标签
        const metaTags = [
            { name: 'author', content: '曹洁冰' },
            { name: 'keywords', content: 'Java开发,大数据,AI开发,Spring Boot,Hadoop,机器学习' },
            { property: 'article:author', content: '曹洁冰' },
            { property: 'article:section', content: '技术博客' }
        ];
        
        metaTags.forEach(tag => {
            if (!this.getMetaContent(tag.name || tag.property)) {
                const meta = document.createElement('meta');
                if (tag.name) meta.name = tag.name;
                if (tag.property) meta.property = tag.property;
                meta.content = tag.content;
                document.head.appendChild(meta);
            }
        });
    }

    /**
     * 优化标题结构
     */
    optimizeHeadings() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
            // 确保标题包含相关关键词
            const text = heading.textContent.toLowerCase();
            const hasKeyword = this.keywords.primary.some(keyword => 
                text.includes(keyword.toLowerCase())
            );
            
            if (!hasKeyword && heading.tagName === 'H2') {
                // 为H2标题添加语义标记
                heading.setAttribute('data-semantic-enhanced', 'true');
            }
        });
    }

    /**
     * 增强语义标记
     */
    enhanceSemanticMarkup() {
        // 添加微数据标记
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const id = section.id;
            if (id === 'about') {
                section.setAttribute('itemscope', '');
                section.setAttribute('itemtype', 'https://schema.org/Person');
            } else if (id === 'skills') {
                section.setAttribute('itemscope', '');
                section.setAttribute('itemtype', 'https://schema.org/SkillSet');
            } else if (id === 'projects') {
                section.setAttribute('itemscope', '');
                section.setAttribute('itemtype', 'https://schema.org/CreativeWork');
            }
        });
    }

    /**
     * 改善内部链接
     */
    improveInternalLinking() {
        // 自动添加相关内部链接
        const content = document.querySelectorAll('p, li');
        content.forEach(element => {
            let text = element.innerHTML;
            
            // 为关键词添加内部链接
            this.keywords.primary.forEach(keyword => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                if (regex.test(text) && !element.querySelector('a')) {
                    text = text.replace(regex, `<a href="#${keyword.toLowerCase().replace(/\s+/g, '-')}" class="internal-link">${keyword}</a>`);
                }
            });
            
            element.innerHTML = text;
        });
    }

    // 辅助方法
    getMetaContent(name) {
        const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
        return meta ? meta.content : null;
    }

    extractHeadings() {
        const headings = [];
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
            headings.push({
                level: parseInt(heading.tagName.charAt(1)),
                text: heading.textContent.trim(),
                id: heading.id || ''
            });
        });
        return headings;
    }

    extractParagraphs() {
        const paragraphs = [];
        document.querySelectorAll('p').forEach(p => {
            if (p.textContent.trim().length > 0) {
                paragraphs.push(p.textContent.trim());
            }
        });
        return paragraphs;
    }

    extractImages() {
        const images = [];
        document.querySelectorAll('img').forEach(img => {
            images.push({
                src: img.src,
                alt: img.alt || '',
                title: img.title || ''
            });
        });
        return images;
    }

    extractLinks() {
        const links = [];
        document.querySelectorAll('a[href]').forEach(link => {
            links.push({
                href: link.href,
                text: link.textContent.trim(),
                title: link.title || '',
                isInternal: link.href.startsWith(window.location.origin)
            });
        });
        return links;
    }

    countKeywordOccurrences(text, keyword) {
        const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        const matches = text.match(regex);
        return matches ? matches.length : 0;
    }

    getKeywordStatus(density) {
        if (density < this.config.keywordDensity.min) return 'low';
        if (density > this.config.keywordDensity.max) return 'high';
        return 'optimal';
    }

    analyzeHeadingHierarchy(headings) {
        const hierarchy = { valid: true, issues: [] };
        let previousLevel = 0;
        
        headings.forEach((heading, index) => {
            if (index === 0 && heading.level !== 1) {
                hierarchy.valid = false;
                hierarchy.issues.push('页面应该以H1标题开始');
            }
            
            if (heading.level - previousLevel > 1) {
                hierarchy.valid = false;
                hierarchy.issues.push(`标题层级跳跃：从H${previousLevel}直接到H${heading.level}`);
            }
            
            previousLevel = heading.level;
        });
        
        return hierarchy;
    }

    analyzeContentDistribution() {
        const sections = document.querySelectorAll('section');
        const distribution = [];
        
        sections.forEach(section => {
            const wordCount = section.textContent.split(/\s+/).length;
            distribution.push({
                id: section.id || 'unnamed',
                wordCount,
                percentage: 0 // 将在后面计算
            });
        });
        
        const totalWords = distribution.reduce((sum, section) => sum + section.wordCount, 0);
        distribution.forEach(section => {
            section.percentage = parseFloat(((section.wordCount / totalWords) * 100).toFixed(2));
        });
        
        return distribution;
    }

    analyzeNavigationStructure() {
        const nav = document.querySelector('nav');
        const breadcrumbs = document.querySelector('.breadcrumbs');
        
        return {
            hasMainNav: !!nav,
            hasBreadcrumbs: !!breadcrumbs,
            navLinkCount: nav ? nav.querySelectorAll('a').length : 0,
            hasSkipLinks: !!document.querySelector('a[href^="#"]')
        };
    }

    analyzeSchemaMarkup() {
        const jsonLd = document.querySelectorAll('script[type="application/ld+json"]');
        const microdata = document.querySelectorAll('[itemscope]');
        
        return {
            hasJsonLd: jsonLd.length > 0,
            jsonLdCount: jsonLd.length,
            hasMicrodata: microdata.length > 0,
            microdataCount: microdata.length
        };
    }

    calculateSemanticDensity(text) {
        let semanticTermCount = 0;
        const totalWords = text.split(/\s+/).length;
        
        Object.values(this.keywords.semantic).forEach(terms => {
            terms.forEach(term => {
                semanticTermCount += this.countKeywordOccurrences(text, term.toLowerCase());
            });
        });
        
        return parseFloat(((semanticTermCount / totalWords) * 100).toFixed(2));
    }

    getReadabilityLevel(score) {
        if (score >= 90) return '非常易读';
        if (score >= 80) return '易读';
        if (score >= 70) return '较易读';
        if (score >= 60) return '标准';
        if (score >= 50) return '较难读';
        return '难读';
    }

    calculateKeywordScore(keywords) {
        let score = 0;
        let totalKeywords = 0;
        
        Object.values(keywords.primary).forEach(data => {
            totalKeywords++;
            if (data.status === 'optimal') {
                score += 100;
            } else if (data.status === 'low') {
                score += Math.max(0, data.density * 20);
            } else {
                score += Math.max(0, 100 - (data.density - this.config.keywordDensity.max) * 10);
            }
        });
        
        return totalKeywords > 0 ? score / totalKeywords : 0;
    }

    calculateStructureScore(structure) {
        let score = 100;
        
        if (!structure.hierarchy.valid) {
            score -= structure.hierarchy.issues.length * 10;
        }
        
        if (!structure.navigation.hasMainNav) score -= 20;
        if (!structure.schema.hasJsonLd) score -= 15;
        
        return Math.max(0, score);
    }

    calculateSemanticScore(semantic) {
        const coverageScores = Object.values(semantic.topicCoverage).map(data => data.percentage);
        const avgCoverage = coverageScores.reduce((sum, score) => sum + score, 0) / coverageScores.length;
        
        return Math.min(100, avgCoverage + semantic.semanticDensity * 10);
    }

    calculateLengthScore(wordCount) {
        if (wordCount < this.config.contentLength.min) {
            return (wordCount / this.config.contentLength.min) * 50;
        } else if (wordCount <= this.config.contentLength.optimal) {
            return 50 + ((wordCount - this.config.contentLength.min) / 
                (this.config.contentLength.optimal - this.config.contentLength.min)) * 50;
        } else if (wordCount <= this.config.contentLength.max) {
            return 100 - ((wordCount - this.config.contentLength.optimal) / 
                (this.config.contentLength.max - this.config.contentLength.optimal)) * 20;
        } else {
            return Math.max(60, 80 - (wordCount - this.config.contentLength.max) / 100);
        }
    }

    /**
     * 生成内容优化报告
     * @returns {Object} 优化报告
     */
    generateOptimizationReport() {
        const analysis = this.analyzeContent();
        
        return {
            timestamp: new Date().toISOString(),
            analysis,
            recommendations: {
                immediate: analysis.suggestions.filter(s => s.priority === 'high'),
                planned: analysis.suggestions.filter(s => s.priority === 'medium'),
                optional: analysis.suggestions.filter(s => s.priority === 'low')
            },
            metrics: {
                qualityScore: analysis.qualityScore,
                improvementPotential: Math.max(0, 100 - analysis.qualityScore),
                keywordOptimization: this.calculateKeywordScore(analysis.keywords),
                contentStructure: this.calculateStructureScore(analysis.structure),
                semanticRelevance: this.calculateSemanticScore(analysis.semantic),
                readability: analysis.readability.score
            }
        };
    }
}

// 导出类供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentSemanticOptimizer;
} else if (typeof window !== 'undefined') {
    window.ContentSemanticOptimizer = ContentSemanticOptimizer;
}