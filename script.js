/**
 * 个人技术展示网站 - 主要JavaScript功能
 * 包含视差滚动、动态打字效果、技能雷达图、滚动动画等功能
 */

// 全局变量
let isScrolling = false;
let skillsAnimated = false;

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * 初始化应用程序
 * 设置所有事件监听器和初始化功能
 */
function initializeApp() {
    setupNavigation();
    setupTypingEffect();
    setupScrollEffects();
    setupSkillsRadarChart();
    setupSkillBars();
    setupBackToTop();
    setupParallaxEffect();
    setupScrollAnimations();
    setupMobileMenu();
    setupProjectInteractions();
}

/**
 * 设置导航功能
 * 包含平滑滚动和活动状态管理
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // 平滑滚动到目标区域
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 考虑导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时更新活动导航项
    window.addEventListener('scroll', throttle(updateActiveNavItem, 100));
    
    function updateActiveNavItem() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

/**
 * 设置打字效果
 * 在英雄区域显示动态技术关键词
 */
function setupTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    const keywords = [
        'Java架构师',
        '大数据专家',
        'AI工程师',
        '全栈开发者',
        '技术领导者',
        '性能优化专家',
        '微服务架构师',
        '数据科学家'
    ];
    
    let currentKeywordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeKeyword() {
        const currentKeyword = keywords[currentKeywordIndex];
        
        if (isDeleting) {
            // 删除字符
            typingElement.textContent = currentKeyword.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentKeywordIndex = (currentKeywordIndex + 1) % keywords.length;
                setTimeout(typeKeyword, 500); // 暂停后开始输入下一个词
            } else {
                setTimeout(typeKeyword, 50); // 删除速度
            }
        } else {
            // 添加字符
            typingElement.textContent = currentKeyword.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentKeyword.length) {
                isDeleting = true;
                setTimeout(typeKeyword, 2000); // 显示完整词的时间
            } else {
                setTimeout(typeKeyword, 100); // 输入速度
            }
        }
    }
    
    // 开始打字效果
    setTimeout(typeKeyword, 1000);
}

/**
 * 设置滚动效果
 * 包含导航栏透明度和滚动指示器
 */
function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', throttle(function() {
        const scrollY = window.scrollY;
        
        // 导航栏背景透明度
        if (scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        }
        
        // 隐藏滚动指示器
        if (scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }, 10));
}

/**
 * 设置技能雷达图
 * 使用Canvas绘制技能能力雷达图
 */
function setupSkillsRadarChart() {
    const canvas = document.getElementById('skillsRadar');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    
    // 技能数据
    const skills = [
        { name: 'Java开发', value: 95 },
        { name: '架构设计', value: 90 },
        { name: '大数据', value: 85 },
        { name: '性能优化', value: 88 },
        { name: 'AI/ML', value: 75 },
        { name: '团队管理', value: 80 }
    ];
    
    const colors = {
        grid: 'rgba(59, 130, 246, 0.2)',
        axis: 'rgba(59, 130, 246, 0.4)',
        data: 'rgba(59, 130, 246, 0.6)',
        dataFill: 'rgba(59, 130, 246, 0.1)',
        text: '#cbd5e1'
    };
    
    function drawRadarChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制网格
        drawGrid();
        
        // 绘制轴线和标签
        drawAxes();
        
        // 绘制数据
        drawData();
    }
    
    function drawGrid() {
        const levels = 5;
        
        for (let i = 1; i <= levels; i++) {
            const levelRadius = (radius / levels) * i;
            
            ctx.beginPath();
            ctx.strokeStyle = colors.grid;
            ctx.lineWidth = 1;
            
            // 绘制多边形网格
            for (let j = 0; j < skills.length; j++) {
                const angle = (j * 2 * Math.PI) / skills.length - Math.PI / 2;
                const x = centerX + Math.cos(angle) * levelRadius;
                const y = centerY + Math.sin(angle) * levelRadius;
                
                if (j === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.stroke();
        }
    }
    
    function drawAxes() {
        skills.forEach((skill, index) => {
            const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            // 绘制轴线
            ctx.beginPath();
            ctx.strokeStyle = colors.axis;
            ctx.lineWidth = 1;
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            // 绘制标签
            ctx.fillStyle = colors.text;
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            const labelX = centerX + Math.cos(angle) * (radius + 20);
            const labelY = centerY + Math.sin(angle) * (radius + 20);
            
            ctx.fillText(skill.name, labelX, labelY);
        });
    }
    
    function drawData() {
        ctx.beginPath();
        ctx.strokeStyle = colors.data;
        ctx.fillStyle = colors.dataFill;
        ctx.lineWidth = 2;
        
        skills.forEach((skill, index) => {
            const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
            const value = (skill.value / 100) * radius;
            const x = centerX + Math.cos(angle) * value;
            const y = centerY + Math.sin(angle) * value;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // 绘制数据点
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = colors.data;
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        });
        
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
    
    // 初始绘制
    drawRadarChart();
    
    // 响应式调整
    function resizeCanvas() {
        const container = canvas.parentElement;
        const size = Math.min(container.clientWidth, container.clientHeight, 400);
        canvas.width = size;
        canvas.height = size;
        drawRadarChart();
    }
    
    window.addEventListener('resize', throttle(resizeCanvas, 250));
}

/**
 * 设置技能条动画
 * 当滚动到技能区域时触发动画
 */
function setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        if (skillsAnimated) return;
        
        const skillsSection = document.getElementById('skills');
        const rect = skillsSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            skillsAnimated = true;
            
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                }, index * 200);
            });
        }
    }
    
    window.addEventListener('scroll', throttle(animateSkillBars, 100));
}

/**
 * 设置返回顶部按钮
 * 滚动时显示/隐藏按钮
 */
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, 100));
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 设置视差滚动效果
 * 为背景元素添加视差效果
 */
function setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.tech-particles, .hero-background');
    
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 10));
}

/**
 * 设置滚动动画
 * 元素进入视口时触发动画
 */
function setupScrollAnimations() {// 观察的元素选择器
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .contact-item, .advantage-item, .certification-item, .achievement-stat, .skill-domain');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll', 'animated');
                
                // 如果是项目卡片，触发统计数据动画
                if (entry.target.classList.contains('project-card')) {
                    animateProjectStats(entry.target);
                }
                
                // 如果是技术成就统计，启动数字动画
                if (entry.target.classList.contains('achievement-stat')) {
                    animateAchievementStat(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

/**
 * 项目统计数据动画
 * 数字递增动画效果
 */
function animateProjectStats(projectCard) {
    const statNumbers = projectCard.querySelectorAll('.stat-number');
    
    statNumbers.forEach(statNumber => {
        const finalValue = statNumber.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        const suffix = finalValue.replace(/[\d.]/g, '');
        
        if (!isNaN(numericValue)) {
            let currentValue = 0;
            const increment = numericValue / 60; // 60帧动画
            const duration = 2000; // 2秒动画
            const frameRate = duration / 60;
            
            statNumber.textContent = '0' + suffix;
            
            const timer = setInterval(() => {
                currentValue += increment;
                
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(timer);
                }
                
                // 格式化数字显示
                let displayValue;
                if (numericValue >= 1000000) {
                    displayValue = (currentValue / 1000000).toFixed(1) + '万';
                } else if (numericValue >= 10000) {
                    displayValue = (currentValue / 10000).toFixed(1) + '万';
                } else if (numericValue >= 1000) {
                    displayValue = (currentValue / 1000).toFixed(1) + 'k';
                } else if (currentValue % 1 === 0) {
                    displayValue = Math.floor(currentValue).toString();
                } else {
                    displayValue = currentValue.toFixed(1);
                }
                
                // 保持原有的后缀
                if (suffix.includes('%')) {
                    displayValue += '%';
                } else if (suffix.includes('+')) {
                    displayValue += '+';
                } else if (suffix.includes('级')) {
                    displayValue = finalValue; // PB级等特殊格式保持原样
                } else if (suffix.includes('万')) {
                    // 已经在上面处理了万的格式
                } else if (suffix.includes('亿')) {
                    displayValue = (currentValue / 100000000).toFixed(1) + '亿';
                }
                
                statNumber.textContent = displayValue;
            }, frameRate);
        }
    });
}

/**
 * 技术成就数字动画
 * @param {Element} achievementStat - 技术成就统计元素
 */
function animateAchievementStat(achievementStat) {
    const statNumber = achievementStat.querySelector('.stat-number');
    if (!statNumber) return;
    
    const finalText = statNumber.textContent;
    const numberMatch = finalText.match(/(\d+(?:\.\d+)?)/);
    
    if (numberMatch) {
        const finalNumber = parseFloat(numberMatch[1]);
        const suffix = finalText.replace(numberMatch[1], '');
        const duration = 2000; // 2秒动画
        const startTime = Date.now();
        
        function updateNumber() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用缓动函数
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentNumber = finalNumber * easeOutQuart;
            
            // 格式化数字显示
            let displayNumber;
            if (finalNumber >= 1000000) {
                displayNumber = (currentNumber / 1000000).toFixed(1);
            } else if (finalNumber >= 1000) {
                displayNumber = (currentNumber / 1000).toFixed(0);
            } else if (finalNumber % 1 !== 0) {
                displayNumber = currentNumber.toFixed(1);
            } else {
                displayNumber = Math.floor(currentNumber);
            }
            
            statNumber.textContent = displayNumber + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                statNumber.textContent = finalText; // 确保最终显示正确的文本
            }
        }
        
        updateNumber();
    }
}

/**
 * 设置项目交互效果
 * 包括3D倾斜效果和技术标签动画
 */
function setupProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // 3D倾斜效果
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
        
        // 技术标签动画
        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach((tag, index) => {
            tag.addEventListener('mouseenter', function() {
                // 为相邻的标签添加轻微的动画效果
                techTags.forEach((otherTag, otherIndex) => {
                    if (Math.abs(index - otherIndex) <= 1 && index !== otherIndex) {
                        otherTag.style.transform = 'translateY(-2px) scale(1.05)';
                    }
                });
            });
            
            tag.addEventListener('mouseleave', function() {
                techTags.forEach(otherTag => {
                    otherTag.style.transform = '';
                });
            });
        });
        
        // 统计数据悬停效果
        const stats = card.querySelectorAll('.stat');
        stats.forEach(stat => {
            stat.addEventListener('mouseenter', function() {
                const statNumber = stat.querySelector('.stat-number');
                if (statNumber) {
                    statNumber.style.transform = 'scale(1.1)';
                    statNumber.style.textShadow = '0 0 20px rgba(6, 182, 212, 0.5)';
                }
            });
            
            stat.addEventListener('mouseleave', function() {
                const statNumber = stat.querySelector('.stat-number');
                if (statNumber) {
                    statNumber.style.transform = '';
                    statNumber.style.textShadow = '';
                }
            });
        });
    });
}

/**
 * 设置移动端菜单
 * 汉堡菜单切换功能
 */
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // 点击导航链接时关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // 点击外部区域关闭菜单
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/**
 * 节流函数
 * 限制函数执行频率，提高性能
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 节流时间间隔（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * 防抖函数
 * 延迟函数执行，避免频繁触发
 * @param {Function} func - 要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(func, delay) {
    let timeoutId;
    return function() {
        const args = arguments;
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
}

/**
 * 平滑滚动到指定元素
 * @param {string} targetId - 目标元素ID
 * @param {number} offset - 偏移量
 */
function smoothScrollTo(targetId, offset = 70) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const targetPosition = targetElement.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * 检查元素是否在视口中
 * @param {Element} element - 要检查的元素
 * @returns {boolean} 是否在视口中
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * 添加页面加载动画
 * 页面加载完成后显示内容
 */
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 为主要区块添加加载动画
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('loading');
        }, index * 100);
    });
});

/**
 * 处理表单提交（如果有联系表单）
 * @param {Event} event - 表单提交事件
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    // 这里可以添加表单验证和提交逻辑
    const formData = new FormData(event.target);
    
    // 显示提交成功消息
    showNotification('消息已发送，我会尽快回复您！', 'success');
}

/**
 * 显示通知消息
 * @param {string} message - 通知内容
 * @param {string} type - 通知类型（success, error, info）
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏通知
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * 初始化性能监控
 * 监控页面性能指标
 */
function initPerformanceMonitoring() {
    // 监控页面加载时间
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`页面加载时间: ${loadTime}ms`);
    });
    
    // 监控滚动性能
    let scrollCount = 0;
    window.addEventListener('scroll', function() {
        scrollCount++;
        if (scrollCount % 100 === 0) {
            console.log(`滚动事件触发次数: ${scrollCount}`);
        }
    });
}

// 初始化性能监控（仅在开发环境）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    initPerformanceMonitoring();
}