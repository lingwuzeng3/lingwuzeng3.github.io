// script.js

/**
 * GitHub Pages 部署指南 - 交互式演示
 * 这个脚本提供了根目录部署和/docs文件夹部署的可视化比较
 */

// 当DOM内容加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const rootBtn = document.getElementById('root-btn');
    const docsBtn = document.getElementById('docs-btn');
    const structureDisplay = document.getElementById('structure-display');
    const step2Desc = document.getElementById('step2-desc');
    const urlSuffix = document.getElementById('url-suffix');
    const simulateVisitBtn = document.getElementById('simulate-visit');
    const modal = document.getElementById('visit-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.querySelector('.close');
    
    // 根目录部署的文件结构模板
    const rootStructure = `
        <div class="file-item folder">repository/</div>
        <div class="file-item file highlight">index.html &nbsp; &nbsp; &nbsp; &nbsp; # 网站主页</div>
        <div class="file-item file">about.html &nbsp; &nbsp; &nbsp; # 关于页面</div>
        <div class="file-item folder">css/</div>
        <div class="file-item file">&nbsp; └── style.css &nbsp; # 样式文件</div>
        <div class="file-item folder">js/</div>
        <div class="file-item file">&nbsp; └── script.js &nbsp; # 脚本文件</div>
        <div class="file-item folder">images/</div>
        <div class="file-item file">&nbsp; └── logo.png &nbsp; # 网站Logo</div>
        <div class="file-item file">README.md &nbsp; &nbsp; # 项目说明</div>
    `;
    
    // /docs文件夹部署的文件结构模板
    const docsStructure = `
        <div class="file-item folder">repository/</div>
        <div class="file-item folder highlight">docs/ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; # 网站文件目录</div>
        <div class="file-item file">&nbsp; ├── index.html &nbsp; # 网站主页</div>
        <div class="file-item file">&nbsp; ├── about.html &nbsp; # 关于页面</div>
        <div class="file-item folder">&nbsp; ├── css/</div>
        <div class="file-item file">&nbsp; │ &nbsp; └── style.css &nbsp; # 样式文件</div>
        <div class="file-item folder">&nbsp; ├── js/</div>
        <div class="file-item file">&nbsp; │ &nbsp; └── script.js &nbsp; # 脚本文件</div>
        <div class="file-item folder">&nbsp; └── images/</div>
        <div class="file-item file">&nbsp; &nbsp; &nbsp; └── logo.png &nbsp; # 网站Logo</div>
        <div class="file-item file">README.md &nbsp; &nbsp; # 项目说明</div>
        <div class="file-item folder">src/ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; # 源代码目录</div>
        <div class="file-item file">package.json &nbsp; # 项目配置</div>
    `;
    
    // 初始化显示根目录结构
    structureDisplay.innerHTML = rootStructure;
    
    /**
     * 根目录按钮点击事件处理
     * 切换到根目录部署视图
     */
    rootBtn.addEventListener('click', function() {
        setActiveButton(rootBtn);
        setInactiveButton(docsBtn);
        structureDisplay.innerHTML = rootStructure;
        step2Desc.textContent = "将网站文件上传到仓库根目录";
        updateDeploySource('root');
    });
    
    /**
     * /docs文件夹按钮点击事件处理
     * 切换到/docs文件夹部署视图
     */
    docsBtn.addEventListener('click', function() {
        setActiveButton(docsBtn);
        setInactiveButton(rootBtn);
        structureDisplay.innerHTML = docsStructure;
        step2Desc.textContent = "将网站文件上传到/docs文件夹";
        updateDeploySource('docs');
    });
    
    /**
     * 部署来源单选按钮事件处理
     * 同步单选按钮与顶部按钮的状态
     */
    const deploySourceRadios = document.querySelectorAll('input[name="deploy-source"]');
    deploySourceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'root') {
                rootBtn.click();
            } else {
                docsBtn.click();
            }
        });
    });
    
    /**
     * 模拟访问按钮点击事件处理
     * 显示模态框展示部署结果
     */
    simulateVisitBtn.addEventListener('click', function() {
        const isRoot = rootBtn.classList.contains('active');
        const branch = document.getElementById('branch-select').value;
        
        let content = '';
        if (isRoot) {
            content = `
                <h3>根目录部署结果</h3>
                <p>您的网站已成功部署！</p>
                <div class="file-item folder">repository/</div>
                <div class="file-item file highlight">index.html &nbsp; ← 这是GitHub Pages访问的文件</div>
                <div class="file-item file">about.html</div>
                <div class="file-item folder">css/</div>
                <div class="file-item file">&nbsp; └── style.css</div>
                <div class="file-item folder">js/</div>
                <div class="file-item file">&nbsp; └── script.js</div>
                <div class="file-item file">README.md</div>
                <p class="success-message">✓ GitHub Pages 从根目录提供网站文件</p>
            `;
        } else {
            content = `
                <h3>/docs文件夹部署结果</h3>
                <p>您的网站已成功部署！</p>
                <div class="file-item folder">repository/</div>
                <div class="file-item folder highlight">docs/ &nbsp; ← GitHub Pages只访问此文件夹</div>
                <div class="file-item file">&nbsp; ├── index.html &nbsp; ← 这是GitHub Pages访问的文件</div>
                <div class="file-item file">&nbsp; ├── about.html</div>
                <div class="file-item folder">&nbsp; ├── css/</div>
                <div class="file-item file">&nbsp; │ &nbsp; └── style.css</div>
                <div class="file-item file">&nbsp; └── README.md</div>
                <div class="file-item file">README.md &nbsp; (仓库的README，不会被GitHub Pages提供)</div>
                <p class="success-message">✓ GitHub Pages 从/docs文件夹提供网站文件</p>
            `;
        }
        
        modalContent.innerHTML = content;
        modal.style.display = 'block';
    });
    
    /**
     * 关闭模态框事件处理
     */
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    /**
     * 点击模态框外部关闭模态框
     */
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    /**
     * 设置活动按钮样式
     * @param {HTMLElement} button - 要设置为活动状态的按钮元素
     */
    function setActiveButton(button) {
        button.classList.add('active');
        button.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    }
    
    /**
     * 设置非活动按钮样式
     * @param {HTMLElement} button - 要设置为非活动状态的按钮元素
     */
    function setInactiveButton(button) {
        button.classList.remove('active');
        button.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
    }
    
    /**
     * 更新部署来源单选按钮状态
     * @param {string} source - 部署来源 ('root' 或 'docs')
     */
    function updateDeploySource(source) {
        const radios = document.querySelectorAll('input[name="deploy-source"]');
        radios.forEach(radio => {
            if (radio.value === source) {
                radio.checked = true;
            }
        });
    }
    
    /**
     * 为使用场景卡片添加悬停效果
     */
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    /**
     * 为部署步骤添加动画效果
     * 每个步骤依次显示，创造渐进式动画
     */
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        // 延迟显示步骤，创造动画效果
        setTimeout(() => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            step.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
    
    /**
     * 添加键盘快捷键支持
     * 按 'r' 键选择根目录部署，按 'd' 键选择/docs文件夹部署
     */
    document.addEventListener('keydown', function(event) {
        if (event.key === 'r' || event.key === 'R') {
            rootBtn.click();
        } else if (event.key === 'd' || event.key === 'D') {
            docsBtn.click();
        } else if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
    
    /**
     * 添加控制台欢迎信息（用于调试）
     */
    console.log('GitHub Pages 部署指南已加载完成！');
    console.log('快捷键: r - 根目录部署, d - /docs文件夹部署, ESC - 关闭模态框');
});
