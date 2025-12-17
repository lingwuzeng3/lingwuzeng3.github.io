// 移动端菜单切换
document.getElementById('menuToggle').addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
    
    // 切换菜单图标
    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// 点击菜单项后关闭移动端菜单
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            document.getElementById('navMenu').classList.remove('active');
            document.querySelector('#menuToggle i').classList.remove('fa-times');
            document.querySelector('#menuToggle i').classList.add('fa-bars');
        }
    });
});

// 技能条动画
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// 滚动时触发技能条动画
function checkSkillAnimation() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const sectionPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (sectionPosition < screenPosition) {
        animateSkillBars();
        // 移除监听器，避免重复触发
        window.removeEventListener('scroll', checkSkillAnimation);
    }
}

// 滚动动画
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.1;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 初始设置动画元素
document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

// 表单提交处理
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('感谢您的留言！我会尽快回复您。');
    this.reset();
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (!header) return;
    
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// 滚动事件监听
window.addEventListener('scroll', function() {
    animateOnScroll();
    checkSkillAnimation();
});

// 页面加载完成后触发一次
window.addEventListener('load', function() {
    animateOnScroll();
    
    // 如果技能区域在可视区域内，直接触发动画
    setTimeout(checkSkillAnimation, 300);
});

// 添加控制台欢迎信息（可选）
console.log('欢迎使用极简个人网站模板！');
console.log('您可以轻松修改和扩展此模板。');
console.log('如需帮助，请参考代码注释。');

// 黑暗模式切换功能（可选扩展）
function initializeDarkModeToggle() {
    // 检查localStorage中是否保存了用户偏好
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
    
    // 创建切换按钮
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌓';
    darkModeToggle.classList.add('dark-mode-toggle');
    darkModeToggle.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 20px;
    `;
    
    // 将按钮添加到导航栏
    const headerContainer = document.querySelector('.header-container');
    if (headerContainer) {
        headerContainer.appendChild(darkModeToggle);
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // 更新按钮文本
            darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌓';
            
            // 保存用户偏好到localStorage
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
    }
}

// 初始化黑暗模式切换（如需使用，取消注释）
// initializeDarkModeToggle();
