// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 加载最新文章
    loadRecentPosts();
});

// 加载最新文章函数
async function loadRecentPosts() {
    try {
        const response = await fetch('data/posts.json');
        const posts = await response.json();
        
        // 按日期排序，取最新的3篇
        const recentPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
        
        const container = document.getElementById('recent-posts');
        container.innerHTML = recentPosts.map(post => `
            <div class="post-card">
                <h4>${post.title}</h4>
                <div class="date">${formatDate(post.date)}</div>
                <p>${post.excerpt}</p>
                <a href="posts/${post.filename}" class="read-more">阅读全文 →</a>
            </div>
        `).join('');
    } catch (error) {
        console.error('加载文章失败:', error);
    }
}

// 日期格式化函数
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}