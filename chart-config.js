/**
 * 能力评估图表配置文件
 * 允许用户自定义图表的各种参数和样式
 */

/**
 * 默认图表配置
 */
const DEFAULT_CHART_CONFIG = {
    // 图表基本设置
    chart: {
        width: 400,
        height: 400,
        backgroundColor: 'transparent',
        padding: 40,
        animationDuration: 1000,
        animationEasing: 'easeOutQuart'
    },
    
    // 雷达图设置
    radar: {
        levels: 5,
        levelStep: 20,
        maxValue: 100,
        showGrid: true,
        showAxes: true,
        showLabels: true,
        showValues: true,
        gridColor: 'rgba(255, 255, 255, 0.1)',
        axisColor: 'rgba(255, 255, 255, 0.2)',
        labelColor: '#94a3b8',
        valueColor: '#06b6d4'
    },
    
    // 数据系列设置
    series: [
        {
            name: '当前能力',
            color: '#06b6d4',
            fillColor: 'rgba(6, 182, 212, 0.2)',
            strokeWidth: 2,
            pointRadius: 4,
            pointColor: '#06b6d4',
            showPoints: true,
            showFill: true
        },
        {
            name: '目标能力',
            color: '#8b5cf6',
            fillColor: 'rgba(139, 92, 246, 0.1)',
            strokeWidth: 2,
            pointRadius: 3,
            pointColor: '#8b5cf6',
            showPoints: true,
            showFill: false
        }
    ],
    
    // 能力标签设置
    labels: [
        '前端开发',
        '后端开发', 
        '移动开发',
        '数据分析',
        '项目管理',
        'UI/UX设计'
    ],
    
    // 交互设置
    interaction: {
        enableHover: true,
        enableClick: true,
        enableTooltip: true,
        hoverRadius: 8,
        hoverColor: '#ffffff',
        tooltipBackground: 'rgba(0, 0, 0, 0.8)',
        tooltipTextColor: '#ffffff',
        tooltipBorderRadius: 8,
        tooltipPadding: 12
    },
    
    // 动画设置
    animation: {
        enableEntryAnimation: true,
        enableHoverAnimation: true,
        enableUpdateAnimation: true,
        entryDelay: 100,
        hoverDuration: 200,
        updateDuration: 800
    },
    
    // 响应式设置
    responsive: {
        enabled: true,
        breakpoints: {
            mobile: 480,
            tablet: 768,
            desktop: 1024
        },
        mobileConfig: {
            chart: {
                width: 280,
                height: 280,
                padding: 30
            },
            radar: {
                levels: 4
            }
        },
        tabletConfig: {
            chart: {
                width: 350,
                height: 350,
                padding: 35
            }
        }
    },
    
    // 主题设置
    themes: {
        dark: {
            chart: {
                backgroundColor: 'transparent'
            },
            radar: {
                gridColor: 'rgba(255, 255, 255, 0.1)',
                axisColor: 'rgba(255, 255, 255, 0.2)',
                labelColor: '#94a3b8'
            }
        },
        light: {
            chart: {
                backgroundColor: '#ffffff'
            },
            radar: {
                gridColor: 'rgba(0, 0, 0, 0.1)',
                axisColor: 'rgba(0, 0, 0, 0.2)',
                labelColor: '#64748b'
            }
        }
    }
};

/**
 * 图表配置管理器
 */
class ChartConfigManager {
    constructor() {
        this.config = this.loadConfig();
        this.listeners = [];
    }
    
    /**
     * 加载配置
     * 从localStorage加载用户自定义配置，如果没有则使用默认配置
     */
    loadConfig() {
        try {
            const savedConfig = localStorage.getItem('abilityChartConfig');
            if (savedConfig) {
                return this.mergeConfig(DEFAULT_CHART_CONFIG, JSON.parse(savedConfig));
            }
        } catch (error) {
            console.warn('加载图表配置失败，使用默认配置:', error);
        }
        return JSON.parse(JSON.stringify(DEFAULT_CHART_CONFIG));
    }
    
    /**
     * 保存配置到localStorage
     */
    saveConfig() {
        try {
            localStorage.setItem('abilityChartConfig', JSON.stringify(this.config));
            this.notifyListeners('configSaved', this.config);
        } catch (error) {
            console.error('保存图表配置失败:', error);
        }
    }
    
    /**
     * 获取当前配置
     */
    getConfig() {
        return JSON.parse(JSON.stringify(this.config));
    }
    
    /**
     * 更新配置
     * @param {Object} newConfig - 新的配置对象
     */
    updateConfig(newConfig) {
        this.config = this.mergeConfig(this.config, newConfig);
        this.saveConfig();
        this.notifyListeners('configUpdated', this.config);
    }
    
    /**
     * 重置为默认配置
     */
    resetConfig() {
        this.config = JSON.parse(JSON.stringify(DEFAULT_CHART_CONFIG));
        this.saveConfig();
        this.notifyListeners('configReset', this.config);
    }
    
    /**
     * 应用主题
     * @param {string} themeName - 主题名称
     */
    applyTheme(themeName) {
        const theme = this.config.themes[themeName];
        if (theme) {
            this.config = this.mergeConfig(this.config, theme);
            this.saveConfig();
            this.notifyListeners('themeApplied', { theme: themeName, config: this.config });
        }
    }
    
    /**
     * 获取响应式配置
     * @param {number} screenWidth - 屏幕宽度
     */
    getResponsiveConfig(screenWidth) {
        const breakpoints = this.config.responsive.breakpoints;
        let responsiveConfig = {};
        
        if (screenWidth <= breakpoints.mobile) {
            responsiveConfig = this.config.responsive.mobileConfig || {};
        } else if (screenWidth <= breakpoints.tablet) {
            responsiveConfig = this.config.responsive.tabletConfig || {};
        }
        
        return this.mergeConfig(this.config, responsiveConfig);
    }
    
    /**
     * 深度合并配置对象
     * @param {Object} target - 目标对象
     * @param {Object} source - 源对象
     */
    mergeConfig(target, source) {
        const result = JSON.parse(JSON.stringify(target));
        
        function merge(obj, src) {
            for (const key in src) {
                if (src[key] && typeof src[key] === 'object' && !Array.isArray(src[key])) {
                    obj[key] = obj[key] || {};
                    merge(obj[key], src[key]);
                } else {
                    obj[key] = src[key];
                }
            }
        }
        
        merge(result, source);
        return result;
    }
    
    /**
     * 添加配置变更监听器
     * @param {Function} listener - 监听器函数
     */
    addListener(listener) {
        this.listeners.push(listener);
    }
    
    /**
     * 移除配置变更监听器
     * @param {Function} listener - 监听器函数
     */
    removeListener(listener) {
        const index = this.listeners.indexOf(listener);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    }
    
    /**
     * 通知所有监听器
     * @param {string} event - 事件类型
     * @param {*} data - 事件数据
     */
    notifyListeners(event, data) {
        this.listeners.forEach(listener => {
            try {
                listener(event, data);
            } catch (error) {
                console.error('配置监听器执行失败:', error);
            }
        });
    }
    
    /**
     * 导出配置
     */
    exportConfig() {
        return JSON.stringify(this.config, null, 2);
    }
    
    /**
     * 导入配置
     * @param {string} configJson - JSON格式的配置字符串
     */
    importConfig(configJson) {
        try {
            const importedConfig = JSON.parse(configJson);
            this.updateConfig(importedConfig);
            return true;
        } catch (error) {
            console.error('导入配置失败:', error);
            return false;
        }
    }
    
    /**
     * 验证配置
     * @param {Object} config - 要验证的配置
     */
    validateConfig(config) {
        const errors = [];
        
        // 验证基本结构
        if (!config.chart || typeof config.chart !== 'object') {
            errors.push('缺少chart配置');
        }
        
        if (!config.radar || typeof config.radar !== 'object') {
            errors.push('缺少radar配置');
        }
        
        if (!Array.isArray(config.series)) {
            errors.push('series必须是数组');
        }
        
        if (!Array.isArray(config.labels)) {
            errors.push('labels必须是数组');
        }
        
        // 验证数值范围
        if (config.chart) {
            if (config.chart.width && (config.chart.width < 200 || config.chart.width > 800)) {
                errors.push('图表宽度必须在200-800之间');
            }
            
            if (config.chart.height && (config.chart.height < 200 || config.chart.height > 800)) {
                errors.push('图表高度必须在200-800之间');
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

// 创建全局配置管理器实例
const chartConfigManager = new ChartConfigManager();

// 导出配置管理器和默认配置
window.ChartConfigManager = ChartConfigManager;
window.chartConfigManager = chartConfigManager;
window.DEFAULT_CHART_CONFIG = DEFAULT_CHART_CONFIG;