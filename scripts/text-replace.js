// 使用 Hexo 的 filter 注册一个函数，在渲染前修改文章内容
hexo.extend.filter.register('before_post_render', function(data) {
    // 替换文章内容中的 '{' 为 '\\{'
    data.content = data.content.replace(/\{/g, '\\{');
    data.content = data.content.replace(/\}/g, '\\}');
    return data;
});
