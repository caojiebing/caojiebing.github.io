/**
 * 社交媒体优化器
 * 提供社交媒体分享优化和社交SEO功能
 */
class SocialMediaOptimizer {
    constructor() {
        this.config = {
            siteName: '曹洁冰个人网站',
            siteUrl: 'https://caojiebing.github.io',
            author: '曹洁冰',
            defaultImage: 'https://caojiebing.github.io/assets/images/ai-engineer.jpg',
            twitterHandle: '@caojiebing',
            locale: 'zh_CN',
            socialPlatforms: [
                'facebook', 'twitter', 'linkedin', 'wechat', 
                'weibo', 'qq', 'telegram', 'whatsapp'
            ]
        };
        
        this.shareData = {
            title: '曹洁冰 - Java开发专家 | 大数据工程师 | AI应用开发',
            description: '资深技术专家，8年Java开发经验，6年大数据开发经验，1年AI开发经验。专注于Java、大数据、AI技术领域。',
            url: this.config.siteUrl,
            image: this.config.defaultImage
        };
    }

    /**
     * 初始化社交媒体优化
     */
    init() {
        this.enhanceOpenGraphTags();
        this.enhanceTwitterCardTags();
        this.addSocialMediaMetaTags();
        this.createSocialShareButtons();
        this.addSocialMediaStructuredData();
        this.initSocialAnalytics();
        this.addSocialMediaWidgets();
        console.log('社交媒体优化器已初始化');
    }

    /**
     * 增强Open Graph标签
     */
    enhanceOpenGraphTags() {
        const ogTags = [
            { property: 'og:type', content: 'profile' },
            { property: 'og:title', content: this.shareData.title },
            { property: 'og:description', content: this.shareData.description },
            { property: 'og:url', content: this.shareData.url },
            { property: 'og:image', content: this.shareData.image },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:image:type', content: 'image/jpeg' },
            { property: 'og:site_name', content: this.config.siteName },
            { property: 'og:locale', content: this.config.locale },
            { property: 'profile:first_name', content: '洁冰' },
            { property: 'profile:last_name', content: '曹' },
            { property: 'profile:username', content: 'caojiebing' },
            { property: 'article:author', content: this.config.author },
            { property: 'article:publisher', content: this.config.siteUrl }
        ];

        ogTags.forEach(tag => {
            this.updateOrCreateMetaTag('property', tag.property, tag.content);
        });
    }

    /**
     * 增强Twitter Card标签
     */
    enhanceTwitterCardTags() {
        const twitterTags = [
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: this.config.twitterHandle },
            { name: 'twitter:creator', content: this.config.twitterHandle },
            { name: 'twitter:title', content: this.shareData.title },
            { name: 'twitter:description', content: this.shareData.description },
            { name: 'twitter:image', content: this.shareData.image },
            { name: 'twitter:image:alt', content: '曹洁冰 - 技术专家头像' },
            { name: 'twitter:domain', content: 'caojiebing.github.io' }
        ];

        twitterTags.forEach(tag => {
            this.updateOrCreateMetaTag('name', tag.name, tag.content);
        });
    }

    /**
     * 添加社交媒体meta标签
     */
    addSocialMediaMetaTags() {
        const socialTags = [
            // LinkedIn特定标签
            { property: 'linkedin:owner', content: 'caojiebing' },
            
            // 微信分享标签
            { name: 'wechat:card', content: 'summary_large_image' },
            { name: 'wechat:title', content: this.shareData.title },
            { name: 'wechat:description', content: this.shareData.description },
            { name: 'wechat:image', content: this.shareData.image },
            
            // 微博分享标签
            { name: 'weibo:card', content: 'summary_large_image' },
            { name: 'weibo:title', content: this.shareData.title },
            { name: 'weibo:description', content: this.shareData.description },
            { name: 'weibo:image', content: this.shareData.image },
            
            // 通用社交标签
            { name: 'author', content: this.config.author },
            { name: 'publisher', content: this.config.siteName },
            { name: 'application-name', content: this.config.siteName }
        ];

        socialTags.forEach(tag => {
            const attr = tag.property ? 'property' : 'name';
            const value = tag.property || tag.name;
            this.updateOrCreateMetaTag(attr, value, tag.content);
        });
    }

    /**
     * 创建社交分享按钮
     */
    createSocialShareButtons() {
        const shareContainer = document.createElement('div');
        shareContainer.className = 'social-share-container';
        shareContainer.innerHTML = `
            <div class="social-share-header">
                <h3><i class="fas fa-share-alt"></i> 分享到社交媒体</h3>
                <p>分享这个页面给更多人了解</p>
            </div>
            <div class="social-share-buttons">
                ${this.generateShareButtons()}
            </div>
            <div class="share-stats">
                <span class="share-count" data-platform="total">总分享: <span class="count">0</span></span>
            </div>
        `;

        // 将分享按钮添加到联系部分
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.appendChild(shareContainer);
        }

        // 绑定分享事件
        this.bindShareEvents();
    }

    /**
     * 生成分享按钮HTML
     */
    generateShareButtons() {
        const buttons = [
            {
                platform: 'wechat',
                icon: 'fab fa-weixin',
                label: '微信',
                color: '#07C160',
                action: 'showQRCode'
            },
            {
                platform: 'weibo',
                icon: 'fab fa-weibo',
                label: '微博',
                color: '#E6162D',
                url: `https://service.weibo.com/share/share.php?url=${encodeURIComponent(this.shareData.url)}&title=${encodeURIComponent(this.shareData.title)}&pic=${encodeURIComponent(this.shareData.image)}`
            },
            {
                platform: 'qq',
                icon: 'fab fa-qq',
                label: 'QQ空间',
                color: '#12B7F5',
                url: `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(this.shareData.url)}&title=${encodeURIComponent(this.shareData.title)}&desc=${encodeURIComponent(this.shareData.description)}&pics=${encodeURIComponent(this.shareData.image)}`
            },
            {
                platform: 'linkedin',
                icon: 'fab fa-linkedin',
                label: 'LinkedIn',
                color: '#0077B5',
                url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.shareData.url)}`
            },
            {
                platform: 'twitter',
                icon: 'fab fa-twitter',
                label: 'Twitter',
                color: '#1DA1F2',
                url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.shareData.url)}&text=${encodeURIComponent(this.shareData.title)}&via=${this.config.twitterHandle.replace('@', '')}`
            },
            {
                platform: 'facebook',
                icon: 'fab fa-facebook',
                label: 'Facebook',
                color: '#1877F2',
                url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.shareData.url)}`
            },
            {
                platform: 'telegram',
                icon: 'fab fa-telegram',
                label: 'Telegram',
                color: '#0088CC',
                url: `https://t.me/share/url?url=${encodeURIComponent(this.shareData.url)}&text=${encodeURIComponent(this.shareData.title)}`
            },
            {
                platform: 'copy',
                icon: 'fas fa-copy',
                label: '复制链接',
                color: '#6B7280',
                action: 'copyLink'
            }
        ];

        return buttons.map(button => `
            <button class="share-btn" 
                    data-platform="${button.platform}"
                    data-url="${button.url || ''}"
                    data-action="${button.action || 'share'}"
                    style="--btn-color: ${button.color}"
                    title="分享到${button.label}">
                <i class="${button.icon}"></i>
                <span>${button.label}</span>
            </button>
        `).join('');
    }

    /**
     * 绑定分享事件
     */
    bindShareEvents() {
        document.addEventListener('click', (e) => {
            const shareBtn = e.target.closest('.share-btn');
            if (!shareBtn) return;

            const platform = shareBtn.dataset.platform;
            const action = shareBtn.dataset.action;
            const url = shareBtn.dataset.url;

            switch (action) {
                case 'share':
                    this.openShareWindow(url, platform);
                    break;
                case 'showQRCode':
                    this.showWeChatQRCode();
                    break;
                case 'copyLink':
                    this.copyToClipboard();
                    break;
            }

            // 记录分享事件
            this.trackShareEvent(platform);
        });
    }

    /**
     * 打开分享窗口
     */
    openShareWindow(url, platform) {
        if (!url) return;

        const width = 600;
        const height = 400;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        window.open(
            url,
            `share-${platform}`,
            `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
        );
    }

    /**
     * 显示微信二维码
     */
    showWeChatQRCode() {
        // 创建二维码模态框
        const modal = document.createElement('div');
        modal.className = 'qr-modal';
        modal.innerHTML = `
            <div class="qr-modal-content">
                <div class="qr-header">
                    <h3><i class="fab fa-weixin"></i> 微信扫码分享</h3>
                    <button class="qr-close">&times;</button>
                </div>
                <div class="qr-body">
                    <div class="qr-code" id="wechat-qr"></div>
                    <p>使用微信扫描二维码分享</p>
                    <div class="qr-url">${this.shareData.url}</div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 生成二维码（这里使用简单的文本显示，实际项目中可以使用QR码库）
        this.generateQRCode('wechat-qr', this.shareData.url);

        // 绑定关闭事件
        modal.querySelector('.qr-close').onclick = () => {
            document.body.removeChild(modal);
        };

        modal.onclick = (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        };
    }

    /**
     * 生成二维码
     */
    generateQRCode(containerId, text) {
        const container = document.getElementById(containerId);
        if (container) {
            // 简单的二维码占位符，实际项目中可以使用qrcode.js等库
            container.innerHTML = `
                <div class="qr-placeholder">
                    <i class="fas fa-qrcode"></i>
                    <p>二维码</p>
                    <small>${text}</small>
                </div>
            `;
        }
    }

    /**
     * 复制链接到剪贴板
     */
    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.shareData.url);
            this.showToast('链接已复制到剪贴板', 'success');
        } catch (err) {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = this.shareData.url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showToast('链接已复制到剪贴板', 'success');
        }
    }

    /**
     * 显示提示消息
     */
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'info'}-circle"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        // 显示动画
        setTimeout(() => toast.classList.add('show'), 100);

        // 自动隐藏
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }

    /**
     * 添加社交媒体结构化数据
     */
    addSocialMediaStructuredData() {
        const socialSchema = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": this.config.author,
            "url": this.config.siteUrl,
            "sameAs": [
                "https://linkedin.com/in/caojiebing",
                "https://twitter.com/caojiebing",
                "https://github.com/caojiebing"
            ],
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": this.config.siteUrl
            },
            "image": this.shareData.image,
            "description": this.shareData.description
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-schema', 'social-media');
        script.textContent = JSON.stringify(socialSchema, null, 2);
        document.head.appendChild(script);
    }

    /**
     * 初始化社交分析
     */
    initSocialAnalytics() {
        // 监听社交媒体引荐流量
        this.trackSocialReferrers();
        
        // 监听分享事件
        this.setupShareTracking();
        
        // 初始化分享计数
        this.initShareCounts();
    }

    /**
     * 跟踪社交媒体引荐
     */
    trackSocialReferrers() {
        const referrer = document.referrer;
        const socialPlatforms = {
            'facebook.com': 'Facebook',
            'twitter.com': 'Twitter',
            't.co': 'Twitter',
            'linkedin.com': 'LinkedIn',
            'weibo.com': '微博',
            'qq.com': 'QQ',
            'wechat.com': '微信'
        };

        for (const [domain, platform] of Object.entries(socialPlatforms)) {
            if (referrer.includes(domain)) {
                this.trackEvent('social_referral', {
                    platform: platform,
                    referrer: referrer
                });
                break;
            }
        }
    }

    /**
     * 设置分享跟踪
     */
    setupShareTracking() {
        // 监听Web Share API
        if (navigator.share) {
            this.addNativeShareButton();
        }

        // 监听页面可见性变化（用户可能在其他应用中分享）
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.updateShareCounts();
            }
        });
    }

    /**
     * 添加原生分享按钮
     */
    addNativeShareButton() {
        const nativeShareBtn = document.createElement('button');
        nativeShareBtn.className = 'share-btn native-share';
        nativeShareBtn.innerHTML = `
            <i class="fas fa-share"></i>
            <span>分享</span>
        `;

        nativeShareBtn.onclick = async () => {
            try {
                await navigator.share({
                    title: this.shareData.title,
                    text: this.shareData.description,
                    url: this.shareData.url
                });
                this.trackShareEvent('native');
            } catch (err) {
                console.log('分享取消或失败:', err);
            }
        };

        const shareButtons = document.querySelector('.social-share-buttons');
        if (shareButtons) {
            shareButtons.appendChild(nativeShareBtn);
        }
    }

    /**
     * 初始化分享计数
     */
    initShareCounts() {
        // 从localStorage获取分享计数
        const counts = this.getShareCounts();
        this.updateShareCountDisplay(counts);
    }

    /**
     * 获取分享计数
     */
    getShareCounts() {
        const stored = localStorage.getItem('social-share-counts');
        return stored ? JSON.parse(stored) : { total: 0 };
    }

    /**
     * 更新分享计数
     */
    updateShareCounts() {
        const counts = this.getShareCounts();
        this.updateShareCountDisplay(counts);
    }

    /**
     * 更新分享计数显示
     */
    updateShareCountDisplay(counts) {
        const totalElement = document.querySelector('.share-count[data-platform="total"] .count');
        if (totalElement) {
            totalElement.textContent = counts.total || 0;
        }
    }

    /**
     * 跟踪分享事件
     */
    trackShareEvent(platform) {
        // 更新本地计数
        const counts = this.getShareCounts();
        counts.total = (counts.total || 0) + 1;
        counts[platform] = (counts[platform] || 0) + 1;
        localStorage.setItem('social-share-counts', JSON.stringify(counts));

        // 更新显示
        this.updateShareCountDisplay(counts);

        // 发送分析事件
        this.trackEvent('social_share', {
            platform: platform,
            url: this.shareData.url,
            title: this.shareData.title
        });

        console.log(`分享到${platform}:`, this.shareData.url);
    }

    /**
     * 跟踪事件
     */
    trackEvent(eventName, parameters) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }

        // 自定义分析
        if (window.customAnalytics) {
            window.customAnalytics.track(eventName, parameters);
        }

        console.log('社交媒体事件:', eventName, parameters);
    }

    /**
     * 添加社交媒体小部件
     */
    addSocialMediaWidgets() {
        // 添加关注按钮
        this.addFollowButtons();
        
        // 添加社交媒体feed（如果需要）
        this.addSocialFeed();
    }

    /**
     * 添加关注按钮
     */
    addFollowButtons() {
        const followContainer = document.createElement('div');
        followContainer.className = 'social-follow-container';
        followContainer.innerHTML = `
            <div class="follow-header">
                <h3><i class="fas fa-users"></i> 关注我</h3>
                <p>获取最新技术动态和分享</p>
            </div>
            <div class="follow-buttons">
                <a href="https://github.com/caojiebing" target="_blank" class="follow-btn github">
                    <i class="fab fa-github"></i>
                    <span>GitHub</span>
                </a>
                <a href="https://linkedin.com/in/caojiebing" target="_blank" class="follow-btn linkedin">
                    <i class="fab fa-linkedin"></i>
                    <span>LinkedIn</span>
                </a>
                <a href="mailto:contact@caojiebing.com" class="follow-btn email">
                    <i class="fas fa-envelope"></i>
                    <span>邮箱</span>
                </a>
            </div>
        `;

        // 添加到页面底部
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.appendChild(followContainer);
        }
    }

    /**
     * 添加社交媒体feed
     */
    addSocialFeed() {
        // 这里可以添加Twitter timeline、LinkedIn posts等
        // 由于需要API密钥，这里只是占位符
        console.log('社交媒体feed功能已准备就绪');
    }

    /**
     * 更新或创建meta标签
     */
    updateOrCreateMetaTag(attribute, value, content) {
        let meta = document.querySelector(`meta[${attribute}="${value}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(attribute, value);
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    /**
     * 获取社交媒体优化报告
     */
    getSocialMediaReport() {
        return {
            openGraph: this.hasOpenGraphTags(),
            twitterCard: this.hasTwitterCardTags(),
            shareButtons: this.hasShareButtons(),
            structuredData: this.hasSocialStructuredData(),
            analytics: this.hasAnalyticsSetup(),
            shareCounts: this.getShareCounts(),
            recommendations: this.generateSocialRecommendations()
        };
    }

    /**
     * 检查Open Graph标签
     */
    hasOpenGraphTags() {
        return document.querySelector('meta[property^="og:"]') !== null;
    }

    /**
     * 检查Twitter Card标签
     */
    hasTwitterCardTags() {
        return document.querySelector('meta[name^="twitter:"]') !== null;
    }

    /**
     * 检查分享按钮
     */
    hasShareButtons() {
        return document.querySelector('.social-share-buttons') !== null;
    }

    /**
     * 检查社交结构化数据
     */
    hasSocialStructuredData() {
        return document.querySelector('script[data-schema="social-media"]') !== null;
    }

    /**
     * 检查分析设置
     */
    hasAnalyticsSetup() {
        return typeof gtag !== 'undefined' || window.customAnalytics;
    }

    /**
     * 生成社交媒体建议
     */
    generateSocialRecommendations() {
        const recommendations = [];

        if (!this.hasOpenGraphTags()) {
            recommendations.push({
                type: 'open-graph',
                priority: 'high',
                message: '添加Open Graph标签以优化社交媒体分享效果'
            });
        }

        if (!this.hasShareButtons()) {
            recommendations.push({
                type: 'share-buttons',
                priority: 'medium',
                message: '添加社交分享按钮以提高内容传播'
            });
        }

        if (!this.hasAnalyticsSetup()) {
            recommendations.push({
                type: 'analytics',
                priority: 'medium',
                message: '设置社交媒体分析以跟踪分享效果'
            });
        }

        return recommendations;
    }
}

// 导出类以供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SocialMediaOptimizer;
}