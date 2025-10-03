/**
 * 本地SEO优化器
 * 提供本地搜索优化和结构化数据增强功能
 */
class LocalSEOOptimizer {
    constructor() {
        this.businessInfo = {
            name: '曹洁冰',
            type: 'Person',
            jobTitle: '高级技术专家',
            description: '资深Java开发工程师，大数据专家，AI应用开发工程师',
            location: {
                city: '北京',
                country: '中国',
                region: '北京市'
            },
            skills: [
                'Java开发', 'Spring Boot', 'Spring Cloud',
                '大数据开发', 'Hadoop', 'Spark', 'Kafka', 'Flink',
                'AI开发', 'Python', 'TensorFlow', 'PyTorch', '机器学习'
            ],
            certifications: [
                'AI应用工程师认证',
                'Java架构师认证'
            ],
            experience: '8年Java开发经验，6年大数据开发经验，1年AI开发经验',
            website: 'https://caojiebing.github.io',
            email: 'contact@caojiebing.com'
        };
        
        this.structuredDataSchemas = {
            person: this.createPersonSchema(),
            professionalService: this.createProfessionalServiceSchema(),
            webSite: this.createWebSiteSchema(),
            breadcrumbList: this.createBreadcrumbListSchema(),
            faqPage: this.createFAQPageSchema()
        };
    }

    /**
     * 初始化本地SEO优化
     */
    init() {
        this.addStructuredData();
        this.optimizeLocalContent();
        this.addLocalBusinessMarkup();
        this.enhanceContactInformation();
        this.addServiceAreaMarkup();
        this.optimizeForVoiceSearch();
        console.log('本地SEO优化器已初始化');
    }

    /**
     * 创建Person结构化数据
     */
    createPersonSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": this.businessInfo.name,
            "jobTitle": this.businessInfo.jobTitle,
            "description": this.businessInfo.description,
            "url": this.businessInfo.website,
            "image": `${this.businessInfo.website}/assets/images/ai-engineer.jpg`,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": this.businessInfo.location.city,
                "addressCountry": this.businessInfo.location.country,
                "addressRegion": this.businessInfo.location.region
            },
            "knowsAbout": this.businessInfo.skills,
            "hasCredential": this.businessInfo.certifications.map(cert => ({
                "@type": "EducationalOccupationalCredential",
                "name": cert
            })),
            "workLocation": {
                "@type": "Place",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": this.businessInfo.location.city,
                    "addressCountry": this.businessInfo.location.country
                }
            },
            "sameAs": [
                this.businessInfo.website
            ]
        };
    }

    /**
     * 创建专业服务结构化数据
     */
    createProfessionalServiceSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": `${this.businessInfo.name} - 技术咨询服务`,
            "description": "提供Java开发、大数据处理、AI应用开发等技术咨询服务",
            "provider": {
                "@type": "Person",
                "name": this.businessInfo.name,
                "jobTitle": this.businessInfo.jobTitle
            },
            "areaServed": {
                "@type": "Country",
                "name": this.businessInfo.location.country
            },
            "serviceType": [
                "Java应用开发",
                "大数据架构设计",
                "AI模型开发",
                "技术架构咨询",
                "性能优化服务"
            ],
            "url": this.businessInfo.website,
            "contactPoint": {
                "@type": "ContactPoint",
                "email": this.businessInfo.email,
                "contactType": "customer service",
                "availableLanguage": ["Chinese", "English"]
            }
        };
    }

    /**
     * 创建网站结构化数据
     */
    createWebSiteSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": `${this.businessInfo.name}个人网站`,
            "description": this.businessInfo.description,
            "url": this.businessInfo.website,
            "author": {
                "@type": "Person",
                "name": this.businessInfo.name
            },
            "inLanguage": "zh-CN",
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${this.businessInfo.website}?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
            }
        };
    }

    /**
     * 创建面包屑导航结构化数据
     */
    createBreadcrumbListSchema() {
        const sections = ['首页', '关于我', '技能', '项目', '联系'];
        const items = sections.map((section, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": section,
            "item": index === 0 ? this.businessInfo.website : 
                   `${this.businessInfo.website}#${section.toLowerCase().replace(/\s+/g, '-')}`
        }));

        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items
        };
    }

    /**
     * 创建FAQ页面结构化数据
     */
    createFAQPageSchema() {
        const faqs = [
            {
                question: "您有多少年的Java开发经验？",
                answer: "我有8年的Java开发经验，熟练掌握Spring Boot、Spring Cloud等主流框架。"
            },
            {
                question: "您在大数据领域有哪些技术专长？",
                answer: "我在大数据领域有6年经验，精通Hadoop、Spark、Kafka、Flink等技术栈。"
            },
            {
                question: "您是否提供技术咨询服务？",
                answer: "是的，我提供Java开发、大数据架构、AI应用开发等技术咨询服务。"
            },
            {
                question: "如何联系您进行技术合作？",
                answer: "您可以通过邮箱或网站联系表单与我取得联系，讨论技术合作机会。"
            }
        ];

        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
    }

    /**
     * 添加结构化数据到页面
     */
    addStructuredData() {
        Object.entries(this.structuredDataSchemas).forEach(([key, schema]) => {
            const existingScript = document.querySelector(`script[data-schema="${key}"]`);
            if (!existingScript) {
                const script = document.createElement('script');
                script.type = 'application/ld+json';
                script.setAttribute('data-schema', key);
                script.textContent = JSON.stringify(schema, null, 2);
                document.head.appendChild(script);
            }
        });
    }

    /**
     * 优化本地内容
     */
    optimizeLocalContent() {
        // 添加地理位置相关的meta标签
        this.addGeoMetaTags();
        
        // 优化标题和描述中的地理信息
        this.optimizeGeoContent();
        
        // 添加本地化关键词
        this.addLocalKeywords();
    }

    /**
     * 添加地理位置meta标签
     */
    addGeoMetaTags() {
        const geoTags = [
            { name: 'geo.region', content: 'CN-BJ' },
            { name: 'geo.placename', content: '北京' },
            { name: 'geo.position', content: '39.9042;116.4074' },
            { name: 'ICBM', content: '39.9042, 116.4074' }
        ];

        geoTags.forEach(tag => {
            if (!document.querySelector(`meta[name="${tag.name}"]`)) {
                const meta = document.createElement('meta');
                meta.name = tag.name;
                meta.content = tag.content;
                document.head.appendChild(meta);
            }
        });
    }

    /**
     * 优化地理内容
     */
    optimizeGeoContent() {
        const title = document.querySelector('title');
        if (title && !title.textContent.includes('北京')) {
            title.textContent = title.textContent.replace(
                '曹洁冰',
                '曹洁冰 - 北京技术专家'
            );
        }

        const description = document.querySelector('meta[name="description"]');
        if (description && !description.content.includes('北京')) {
            description.content = description.content.replace(
                '资深技术专家',
                '北京资深技术专家'
            );
        }
    }

    /**
     * 添加本地化关键词
     */
    addLocalKeywords() {
        const keywords = document.querySelector('meta[name="keywords"]');
        if (keywords) {
            const localKeywords = [
                '北京Java开发',
                '北京大数据工程师',
                '北京AI开发',
                '北京技术咨询',
                '北京软件开发'
            ];
            
            const currentKeywords = keywords.content.split(',').map(k => k.trim());
            const newKeywords = [...currentKeywords, ...localKeywords];
            keywords.content = [...new Set(newKeywords)].join(', ');
        }
    }

    /**
     * 添加本地商业标记
     */
    addLocalBusinessMarkup() {
        const businessSchema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `${this.businessInfo.name} 技术服务`,
            "description": "专业的Java开发、大数据处理、AI应用开发技术服务",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": this.businessInfo.location.city,
                "addressCountry": this.businessInfo.location.country,
                "addressRegion": this.businessInfo.location.region
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "39.9042",
                "longitude": "116.4074"
            },
            "url": this.businessInfo.website,
            "telephone": "+86-xxx-xxxx-xxxx",
            "email": this.businessInfo.email,
            "openingHours": "Mo-Fr 09:00-18:00",
            "priceRange": "$$",
            "paymentAccepted": "Cash, Credit Card, Bank Transfer",
            "currenciesAccepted": "CNY"
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-schema', 'local-business');
        script.textContent = JSON.stringify(businessSchema, null, 2);
        document.head.appendChild(script);
    }

    /**
     * 增强联系信息
     */
    enhanceContactInformation() {
        // 添加联系信息的结构化数据
        const contactSchema = {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "联系曹洁冰",
            "description": "与技术专家曹洁冰取得联系",
            "url": `${this.businessInfo.website}#contact`,
            "mainEntity": {
                "@type": "Person",
                "name": this.businessInfo.name,
                "contactPoint": {
                    "@type": "ContactPoint",
                    "email": this.businessInfo.email,
                    "contactType": "customer service",
                    "availableLanguage": ["Chinese", "English"],
                    "areaServed": this.businessInfo.location.country
                }
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-schema', 'contact-page');
        script.textContent = JSON.stringify(contactSchema, null, 2);
        document.head.appendChild(script);

        // 为联系信息添加微数据标记
        this.addContactMicrodata();
    }

    /**
     * 添加联系信息微数据
     */
    addContactMicrodata() {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.setAttribute('itemscope', '');
            contactSection.setAttribute('itemtype', 'https://schema.org/ContactPage');
            
            const emailElements = contactSection.querySelectorAll('[href^="mailto:"]');
            emailElements.forEach(el => {
                el.setAttribute('itemprop', 'email');
            });
            
            const phoneElements = contactSection.querySelectorAll('[href^="tel:"]');
            phoneElements.forEach(el => {
                el.setAttribute('itemprop', 'telephone');
            });
        }
    }

    /**
     * 添加服务区域标记
     */
    addServiceAreaMarkup() {
        const serviceAreaSchema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "技术咨询服务",
            "provider": {
                "@type": "Person",
                "name": this.businessInfo.name
            },
            "areaServed": [
                {
                    "@type": "Country",
                    "name": "中国"
                },
                {
                    "@type": "City",
                    "name": "北京"
                },
                {
                    "@type": "City",
                    "name": "上海"
                },
                {
                    "@type": "City",
                    "name": "深圳"
                },
                {
                    "@type": "City",
                    "name": "杭州"
                }
            ],
            "serviceType": [
                "Java应用开发",
                "大数据架构设计",
                "AI模型开发",
                "技术架构咨询"
            ]
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-schema', 'service-area');
        script.textContent = JSON.stringify(serviceAreaSchema, null, 2);
        document.head.appendChild(script);
    }

    /**
     * 优化语音搜索
     */
    optimizeForVoiceSearch() {
        // 添加自然语言问答内容
        const voiceSearchQuestions = [
            "谁是曹洁冰",
            "曹洁冰的技能有哪些",
            "如何联系曹洁冰",
            "曹洁冰在哪里工作",
            "曹洁冰有什么经验"
        ];

        // 为语音搜索优化页面内容
        this.addVoiceSearchContent(voiceSearchQuestions);
        
        // 添加FAQ结构化数据以支持语音搜索
        this.enhanceFAQForVoiceSearch();
    }

    /**
     * 添加语音搜索内容
     */
    addVoiceSearchContent(questions) {
        const voiceSearchData = {
            "@context": "https://schema.org",
            "@type": "QAPage",
            "mainEntity": questions.map(question => ({
                "@type": "Question",
                "name": question,
                "answerCount": 1,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": this.generateAnswerForQuestion(question)
                }
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-schema', 'voice-search');
        script.textContent = JSON.stringify(voiceSearchData, null, 2);
        document.head.appendChild(script);
    }

    /**
     * 为问题生成答案
     */
    generateAnswerForQuestion(question) {
        const answers = {
            "谁是曹洁冰": `${this.businessInfo.name}是一位${this.businessInfo.jobTitle}，${this.businessInfo.description}。`,
            "曹洁冰的技能有哪些": `曹洁冰的主要技能包括：${this.businessInfo.skills.join('、')}。`,
            "如何联系曹洁冰": `您可以通过邮箱${this.businessInfo.email}或访问网站${this.businessInfo.website}联系曹洁冰。`,
            "曹洁冰在哪里工作": `曹洁冰在${this.businessInfo.location.city}提供技术服务。`,
            "曹洁冰有什么经验": this.businessInfo.experience
        };

        return answers[question] || `关于${question}的详细信息，请访问${this.businessInfo.website}了解更多。`;
    }

    /**
     * 增强FAQ以支持语音搜索
     */
    enhanceFAQForVoiceSearch() {
        // 为FAQ添加speakable标记
        const faqElements = document.querySelectorAll('.faq-item');
        faqElements.forEach(faq => {
            faq.setAttribute('itemscope', '');
            faq.setAttribute('itemtype', 'https://schema.org/Question');
            
            const question = faq.querySelector('.faq-question h3');
            if (question) {
                question.setAttribute('itemprop', 'name');
            }
            
            const answer = faq.querySelector('.faq-answer');
            if (answer) {
                answer.setAttribute('itemscope', '');
                answer.setAttribute('itemtype', 'https://schema.org/Answer');
                answer.setAttribute('itemprop', 'acceptedAnswer');
                
                const answerText = answer.querySelector('p');
                if (answerText) {
                    answerText.setAttribute('itemprop', 'text');
                }
            }
        });
    }

    /**
     * 获取本地SEO分析报告
     */
    getLocalSEOReport() {
        const report = {
            structuredData: {
                schemas: Object.keys(this.structuredDataSchemas),
                count: Object.keys(this.structuredDataSchemas).length,
                status: 'implemented'
            },
            localContent: {
                geoTags: this.hasGeoTags(),
                localKeywords: this.hasLocalKeywords(),
                contactInfo: this.hasContactInfo()
            },
            voiceSearch: {
                faqOptimized: this.isFAQOptimized(),
                naturalLanguage: this.hasNaturalLanguageContent()
            },
            businessInfo: this.businessInfo,
            recommendations: this.generateLocalSEORecommendations()
        };

        return report;
    }

    /**
     * 检查是否有地理标签
     */
    hasGeoTags() {
        return document.querySelector('meta[name="geo.region"]') !== null;
    }

    /**
     * 检查是否有本地关键词
     */
    hasLocalKeywords() {
        const keywords = document.querySelector('meta[name="keywords"]');
        return keywords && keywords.content.includes('北京');
    }

    /**
     * 检查是否有联系信息
     */
    hasContactInfo() {
        return document.querySelector('#contact') !== null;
    }

    /**
     * 检查FAQ是否优化
     */
    isFAQOptimized() {
        return document.querySelector('.faq-item[itemtype]') !== null;
    }

    /**
     * 检查是否有自然语言内容
     */
    hasNaturalLanguageContent() {
        return document.querySelector('script[data-schema="voice-search"]') !== null;
    }

    /**
     * 生成本地SEO建议
     */
    generateLocalSEORecommendations() {
        const recommendations = [];

        if (!this.hasGeoTags()) {
            recommendations.push({
                type: 'geo-tags',
                priority: 'high',
                message: '添加地理位置meta标签以提高本地搜索可见性'
            });
        }

        if (!this.hasLocalKeywords()) {
            recommendations.push({
                type: 'local-keywords',
                priority: 'medium',
                message: '在关键词中添加地理位置信息'
            });
        }

        if (!this.isFAQOptimized()) {
            recommendations.push({
                type: 'faq-optimization',
                priority: 'medium',
                message: '为FAQ添加结构化数据标记以支持语音搜索'
            });
        }

        return recommendations;
    }
}

// 导出类以供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LocalSEOOptimizer;
}