/**
 * FAQ和相关内容推荐系统
 * 提升语义搜索效果和用户体验
 */
class FAQContentSystem {
    constructor() {
        this.faqData = [
            {
                id: 'java-experience',
                question: '您有多少年Java开发经验？',
                answer: '我有8年的Java开发经验，精通Spring生态系统、微服务架构设计和高并发系统优化。在这8年中，我参与了多个大型企业级项目的架构设计和开发工作。',
                keywords: ['Java', '开发经验', 'Spring', '微服务', '架构'],
                category: 'experience',
                relatedTopics: ['spring-expertise', 'microservices-architecture', 'performance-optimization']
            },
            {
                id: 'spring-expertise',
                question: '您在Spring框架方面有哪些专业技能？',
                answer: '我精通整个Spring生态系统，包括Spring Boot、Spring Cloud、Spring Security等。能够设计和实现基于Spring的微服务架构，具备丰富的分布式系统开发经验。',
                keywords: ['Spring', 'Spring Boot', 'Spring Cloud', '微服务', '分布式'],
                category: 'technical-skills',
                relatedTopics: ['java-experience', 'microservices-architecture', 'distributed-systems']
            },
            {
                id: 'bigdata-experience',
                question: '您在大数据领域有哪些技术栈和项目经验？',
                answer: '我有6年的大数据开发经验，深度掌握Hadoop生态系统、Spark、Kafka、Flink等技术。曾负责构建企业级数据仓库，处理PB级数据，实现实时数据处理和分析系统。',
                keywords: ['大数据', 'Hadoop', 'Spark', 'Kafka', 'Flink', '数据仓库'],
                category: 'technical-skills',
                relatedTopics: ['data-processing', 'real-time-analytics', 'data-warehouse']
            },
            {
                id: 'ai-development',
                question: '您在AI开发方面有哪些专业能力？',
                answer: '我专注于机器学习模型应用、深度学习算法实现和AI系统集成。具备AI应用工程师专业认证，熟练使用Python、TensorFlow、PyTorch等工具，能够将AI技术应用于实际业务场景。',
                keywords: ['AI', '机器学习', '深度学习', 'Python', 'TensorFlow', 'PyTorch'],
                category: 'technical-skills',
                relatedTopics: ['machine-learning', 'deep-learning', 'ai-certification']
            },
            {
                id: 'microservices-architecture',
                question: '您如何设计和实现微服务架构？',
                answer: '我采用领域驱动设计(DDD)方法进行服务拆分，使用Spring Cloud构建微服务生态，包括服务注册发现、配置管理、熔断降级、链路追踪等。注重服务的高可用性和可扩展性设计。',
                keywords: ['微服务', '架构设计', 'DDD', 'Spring Cloud', '高可用'],
                category: 'architecture',
                relatedTopics: ['spring-expertise', 'distributed-systems', 'performance-optimization']
            },
            {
                id: 'performance-optimization',
                question: '您在系统性能优化方面有哪些经验？',
                answer: '我在高并发、大数据量场景下具备深度的性能调优经验。曾将系统性能提升500%，支撑10万+并发用户访问。优化手段包括数据库调优、缓存策略、代码优化、架构重构等。',
                keywords: ['性能优化', '高并发', '调优', '缓存', '数据库'],
                category: 'optimization',
                relatedTopics: ['java-experience', 'database-optimization', 'caching-strategies']
            },
            {
                id: 'project-management',
                question: '您有团队管理和项目管理经验吗？',
                answer: '我具备优秀的团队协作和技术领导能力，曾带领20+人技术团队，成功交付多个千万级项目。擅长敏捷开发管理、技术方案评审、团队技能培养等。',
                keywords: ['团队管理', '项目管理', '技术领导', '敏捷开发'],
                category: 'management',
                relatedTopics: ['leadership-skills', 'agile-development', 'team-building']
            },
            {
                id: 'ai-certification',
                question: '您有哪些专业认证？',
                answer: '我获得了工业和信息化部颁发的AI应用工程师高级认证，以及Oracle Java架构师专家级认证。这些认证证明了我在相关技术领域的专业能力和深度理解。',
                keywords: ['认证', 'AI应用工程师', 'Java架构师', '专业能力'],
                category: 'certification',
                relatedTopics: ['ai-development', 'java-experience', 'professional-skills']
            },
            {
                id: 'collaboration-approach',
                question: '您的工作协作方式是怎样的？',
                answer: '我注重团队协作和知识分享，善于跨部门沟通协调。采用敏捷开发方法，重视代码质量和技术文档。能够快速适应新技术和业务需求，具备良好的学习能力和创新思维。',
                keywords: ['协作', '沟通', '敏捷开发', '代码质量', '学习能力'],
                category: 'soft-skills',
                relatedTopics: ['team-collaboration', 'agile-development', 'continuous-learning']
            },
            {
                id: 'future-goals',
                question: '您的职业发展目标是什么？',
                answer: '我致力于成为技术与业务并重的复合型人才，在AI和大数据领域持续深耕。希望能够参与更多创新项目，将前沿技术应用于实际业务场景，为企业创造更大价值。',
                keywords: ['职业发展', '技术创新', 'AI', '大数据', '业务价值'],
                category: 'career',
                relatedTopics: ['ai-development', 'bigdata-experience', 'innovation-mindset']
            }
        ];
        
        this.contentRecommendations = {
            'java-experience': [
                { title: 'Spring Boot最佳实践', url: '#spring-practices', type: 'article' },
                { title: '微服务架构设计案例', url: '#microservices-case', type: 'case-study' },
                { title: 'Java性能调优指南', url: '#java-performance', type: 'guide' }
            ],
            'bigdata-experience': [
                { title: 'Hadoop集群优化实战', url: '#hadoop-optimization', type: 'tutorial' },
                { title: '实时数据处理架构', url: '#realtime-processing', type: 'architecture' },
                { title: '数据仓库建设方案', url: '#data-warehouse', type: 'solution' }
            ],
            'ai-development': [
                { title: '机器学习模型部署', url: '#ml-deployment', type: 'technical' },
                { title: 'AI应用开发框架', url: '#ai-framework', type: 'framework' },
                { title: '深度学习实践案例', url: '#dl-cases', type: 'case-study' }
            ]
        };
        
        this.searchIndex = this.buildSearchIndex();
        this.isInitialized = false;
    }

    /**
     * 初始化FAQ系统
     */
    init() {
        if (this.isInitialized) return;
        
        this.createFAQSection();
        this.setupSearchFunctionality();
        this.setupEventListeners();
        this.addStructuredData();
        
        this.isInitialized = true;
        console.log('FAQ内容系统已初始化');
    }

    /**
     * 创建FAQ部分
     */
    createFAQSection() {
        // 检查是否已存在FAQ部分
        if (document.getElementById('faq-section')) return;
        
        const faqSection = document.createElement('section');
        faqSection.id = 'faq-section';
        faqSection.className = 'faq-section';
        faqSection.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">常见问题</h2>
                    <p class="section-subtitle">了解更多关于我的专业技能和经验</p>
                </div>
                
                <div class="faq-search">
                    <div class="search-container">
                        <input type="text" id="faq-search-input" placeholder="搜索问题..." class="search-input">
                        <button id="faq-search-btn" class="search-btn">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                    <div class="faq-categories">
                        <button class="category-btn active" data-category="all">全部</button>
                        <button class="category-btn" data-category="technical-skills">技术技能</button>
                        <button class="category-btn" data-category="experience">工作经验</button>
                        <button class="category-btn" data-category="architecture">架构设计</button>
                        <button class="category-btn" data-category="management">团队管理</button>
                    </div>
                </div>
                
                <div class="faq-container" id="faq-container">
                    ${this.renderFAQItems()}
                </div>
                
                <div class="related-content" id="related-content">
                    <h3>相关内容推荐</h3>
                    <div class="content-recommendations" id="content-recommendations">
                        <!-- 动态生成推荐内容 -->
                    </div>
                </div>
            </div>
        `;
        
        // 插入到联系部分之前
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.parentNode.insertBefore(faqSection, contactSection);
        } else {
            document.body.appendChild(faqSection);
        }
    }

    /**
     * 渲染FAQ项目
     * @param {Array} items FAQ项目数组
     * @returns {string} HTML字符串
     */
    renderFAQItems(items = this.faqData) {
        return items.map(item => `
            <div class="faq-item" data-category="${item.category}" data-id="${item.id}">
                <div class="faq-question" role="button" tabindex="0" aria-expanded="false">
                    <h3>${item.question}</h3>
                    <span class="faq-toggle">
                        <i class="fas fa-chevron-down"></i>
                    </span>
                </div>
                <div class="faq-answer" role="region" aria-hidden="true">
                    <p>${item.answer}</p>
                    <div class="faq-keywords">
                        ${item.keywords.map(keyword => `<span class="keyword-tag">${keyword}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * 设置搜索功能
     */
    setupSearchFunctionality() {
        const searchInput = document.getElementById('faq-search-input');
        const searchBtn = document.getElementById('faq-search-btn');
        
        if (!searchInput || !searchBtn) return;
        
        const performSearch = () => {
            const query = searchInput.value.trim().toLowerCase();
            this.searchFAQ(query);
        };
        
        searchInput.addEventListener('input', performSearch);
        searchBtn.addEventListener('click', performSearch);
        
        // 回车搜索
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    /**
     * 设置事件监听器
     */
    setupEventListeners() {
        // FAQ项目点击事件
        document.addEventListener('click', (e) => {
            if (e.target.closest('.faq-question')) {
                this.toggleFAQItem(e.target.closest('.faq-item'));
            }
        });
        
        // 分类筛选事件
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                this.filterByCategory(e.target.dataset.category);
                
                // 更新按钮状态
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        });
        
        // 键盘导航支持
        document.addEventListener('keydown', (e) => {
            if (e.target.classList.contains('faq-question') && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                this.toggleFAQItem(e.target.closest('.faq-item'));
            }
        });
    }

    /**
     * 切换FAQ项目展开/收起状态
     * @param {Element} faqItem FAQ项目元素
     */
    toggleFAQItem(faqItem) {
        const question = faqItem.querySelector('.faq-question');
        const answer = faqItem.querySelector('.faq-answer');
        const toggle = faqItem.querySelector('.faq-toggle i');
        
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        
        // 切换状态
        question.setAttribute('aria-expanded', !isExpanded);
        answer.setAttribute('aria-hidden', isExpanded);
        
        // 切换样式
        faqItem.classList.toggle('active');
        toggle.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        
        // 显示相关内容推荐
        if (!isExpanded) {
            this.showRelatedContent(faqItem.dataset.id);
        }
        
        // 记录用户交互
        this.trackFAQInteraction(faqItem.dataset.id, !isExpanded ? 'expand' : 'collapse');
    }

    /**
     * 搜索FAQ
     * @param {string} query 搜索查询
     */
    searchFAQ(query) {
        if (!query) {
            this.showAllFAQ();
            return;
        }
        
        const results = this.faqData.filter(item => {
            const searchText = `${item.question} ${item.answer} ${item.keywords.join(' ')}`.toLowerCase();
            return searchText.includes(query);
        });
        
        this.displaySearchResults(results, query);
        this.trackSearch(query, results.length);
    }

    /**
     * 按分类筛选FAQ
     * @param {string} category 分类名称
     */
    filterByCategory(category) {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        this.trackCategoryFilter(category);
    }

    /**
     * 显示搜索结果
     * @param {Array} results 搜索结果
     * @param {string} query 搜索查询
     */
    displaySearchResults(results, query) {
        const container = document.getElementById('faq-container');
        if (!container) return;
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>未找到相关问题</h3>
                    <p>没有找到与"${query}"相关的问题，请尝试其他关键词。</p>
                    <button class="btn btn-primary" onclick="this.closest('.faq-section').querySelector('#faq-search-input').value=''; this.closest('.faq-section').querySelector('#faq-search-input').dispatchEvent(new Event('input'));">
                        查看全部问题
                    </button>
                </div>
            `;
        } else {
            container.innerHTML = this.renderFAQItems(results);
            
            // 高亮搜索关键词
            this.highlightSearchTerms(query);
        }
    }

    /**
     * 显示所有FAQ
     */
    showAllFAQ() {
        const container = document.getElementById('faq-container');
        if (container) {
            container.innerHTML = this.renderFAQItems();
        }
    }

    /**
     * 高亮搜索关键词
     * @param {string} query 搜索查询
     */
    highlightSearchTerms(query) {
        const faqItems = document.querySelectorAll('.faq-item');
        const regex = new RegExp(`(${query})`, 'gi');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3');
            const answer = item.querySelector('.faq-answer p');
            
            if (question) {
                question.innerHTML = question.textContent.replace(regex, '<mark>$1</mark>');
            }
            if (answer) {
                answer.innerHTML = answer.textContent.replace(regex, '<mark>$1</mark>');
            }
        });
    }

    /**
     * 显示相关内容推荐
     * @param {string} faqId FAQ项目ID
     */
    showRelatedContent(faqId) {
        const faqItem = this.faqData.find(item => item.id === faqId);
        if (!faqItem) return;
        
        const container = document.getElementById('content-recommendations');
        if (!container) return;
        
        // 获取相关推荐
        const recommendations = this.getRelatedRecommendations(faqId);
        
        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item">
                <div class="rec-icon">
                    <i class="fas ${this.getIconForType(rec.type)}"></i>
                </div>
                <div class="rec-content">
                    <h4>${rec.title}</h4>
                    <span class="rec-type">${this.getTypeLabel(rec.type)}</span>
                </div>
                <a href="${rec.url}" class="rec-link" aria-label="查看${rec.title}">
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `).join('');
        
        // 显示相关内容区域
        document.getElementById('related-content').style.display = 'block';
    }

    /**
     * 获取相关推荐内容
     * @param {string} faqId FAQ项目ID
     * @returns {Array} 推荐内容数组
     */
    getRelatedRecommendations(faqId) {
        const faqItem = this.faqData.find(item => item.id === faqId);
        if (!faqItem) return [];
        
        let recommendations = [];
        
        // 直接推荐
        if (this.contentRecommendations[faqId]) {
            recommendations = [...this.contentRecommendations[faqId]];
        }
        
        // 基于相关主题的推荐
        faqItem.relatedTopics.forEach(topicId => {
            if (this.contentRecommendations[topicId]) {
                recommendations.push(...this.contentRecommendations[topicId]);
            }
        });
        
        // 去重并限制数量
        const uniqueRecs = recommendations.filter((rec, index, self) => 
            index === self.findIndex(r => r.title === rec.title)
        );
        
        return uniqueRecs.slice(0, 6);
    }

    /**
     * 构建搜索索引
     * @returns {Object} 搜索索引
     */
    buildSearchIndex() {
        const index = {};
        
        this.faqData.forEach(item => {
            const words = `${item.question} ${item.answer} ${item.keywords.join(' ')}`
                .toLowerCase()
                .split(/\s+/)
                .filter(word => word.length > 2);
            
            words.forEach(word => {
                if (!index[word]) {
                    index[word] = [];
                }
                if (!index[word].includes(item.id)) {
                    index[word].push(item.id);
                }
            });
        });
        
        return index;
    }

    /**
     * 添加结构化数据
     */
    addStructuredData() {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": this.faqData.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            }))
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(faqSchema);
        document.head.appendChild(script);
    }

    /**
     * 获取类型对应的图标
     * @param {string} type 内容类型
     * @returns {string} 图标类名
     */
    getIconForType(type) {
        const icons = {
            'article': 'fa-file-alt',
            'case-study': 'fa-chart-bar',
            'guide': 'fa-book',
            'tutorial': 'fa-play-circle',
            'architecture': 'fa-sitemap',
            'solution': 'fa-lightbulb',
            'technical': 'fa-code',
            'framework': 'fa-layer-group'
        };
        return icons[type] || 'fa-link';
    }

    /**
     * 获取类型标签
     * @param {string} type 内容类型
     * @returns {string} 类型标签
     */
    getTypeLabel(type) {
        const labels = {
            'article': '文章',
            'case-study': '案例研究',
            'guide': '指南',
            'tutorial': '教程',
            'architecture': '架构',
            'solution': '解决方案',
            'technical': '技术文档',
            'framework': '框架'
        };
        return labels[type] || '相关内容';
    }

    /**
     * 跟踪FAQ交互
     * @param {string} faqId FAQ项目ID
     * @param {string} action 操作类型
     */
    trackFAQInteraction(faqId, action) {
        // 发送分析数据
        if (typeof gtag !== 'undefined') {
            gtag('event', 'faq_interaction', {
                'faq_id': faqId,
                'action': action,
                'timestamp': new Date().toISOString()
            });
        }
        
        console.log(`FAQ交互: ${faqId} - ${action}`);
    }

    /**
     * 跟踪搜索行为
     * @param {string} query 搜索查询
     * @param {number} resultCount 结果数量
     */
    trackSearch(query, resultCount) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'faq_search', {
                'search_term': query,
                'result_count': resultCount,
                'timestamp': new Date().toISOString()
            });
        }
        
        console.log(`FAQ搜索: "${query}" - ${resultCount}个结果`);
    }

    /**
     * 跟踪分类筛选
     * @param {string} category 分类名称
     */
    trackCategoryFilter(category) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'faq_category_filter', {
                'category': category,
                'timestamp': new Date().toISOString()
            });
        }
        
        console.log(`FAQ分类筛选: ${category}`);
    }

    /**
     * 获取FAQ统计信息
     * @returns {Object} 统计信息
     */
    getStatistics() {
        const categories = {};
        this.faqData.forEach(item => {
            categories[item.category] = (categories[item.category] || 0) + 1;
        });
        
        return {
            totalFAQs: this.faqData.length,
            categories: categories,
            totalKeywords: this.faqData.reduce((sum, item) => sum + item.keywords.length, 0),
            avgKeywordsPerFAQ: (this.faqData.reduce((sum, item) => sum + item.keywords.length, 0) / this.faqData.length).toFixed(2)
        };
    }
}

// 导出类供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FAQContentSystem;
} else if (typeof window !== 'undefined') {
    window.FAQContentSystem = FAQContentSystem;
}