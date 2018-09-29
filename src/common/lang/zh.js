import zhLocale from 'element-ui/lib/locale/lang/zh-CN';

export default {
    header: {
        home: '首页',
        section: '话题',
        mark: '书签',
        search: '搜索新发现...',
        post: '发帖',
        profile: '我的主页',
        album: '相册',
        setting: '设置',
        signOut: '退出'
    },
    account: {
        username: '用户名',
        password: '密码',
        signIn: '登陆',
        signUp: '注册',
        forgetPassword: '忘记密码?',
        noUsername: '请输入用户名!',
        noPassword: '请输入账号密码!',
        errorPassword: '用户名或密码错误!',
        UsernameConflict: '该用户名已被占用!',
        signUpForbidden: '账号注册已禁用!',
        welcome: '欢迎 {name} !',
        adieu: '{name} 已退出登陆!'
    },
    section: {
        nav: {
            title: '话题',
            create: '新增',
            all: '全部话题',
            hot: '热门话题',
            follow: '我关注的话题',
            manage: '我管理的话题'
        },
        card: {
            detail: '信息详情',
            noPermission: '没有话题阅读权限',
            owner: '发起人',
            moderator: '版主',
            assistant: '小版主'
        },
        create: {
            title: '发起话题'
        }
    },
    album: {
        nav: {
            title: '相册',
            create: '新增',
            all: '全部相册',
            public: '公开相册',
            private: '私有相册',
            other: '其他图片'
        },
        create: {
            title: '创建相册'
        }
    },
    photo: {
        nav: {
            title: '图片',
            back: '返回',
            all: '全部图片',
            public: '公开图片',
            private: '私有图片',
            create: '上传图片',
            edit: '编辑模式',
            browse: '浏览模式'
        },
        create: {
            title: '上传图片',
            success: '上传图片完成!',
            error: '上传图片失败!'
        }
    },
    comment: {
        comment: '评论',
        like: '赞',
        dislike: '踩',
        dialog: '查看对话',
        viewDialog: '查看对话',
        reply: '回复',
        replyUser: '回复{name}...',
        placeholder: '请输入您的评论内容...',
        create: {
            success: '发布评论成功!'
        },
        edit: {
            success: '编辑评论成功!'
        },
        delete: {
            success: '删除评论成功!',
            confirm: '您确定要删除该评论吗?'
        }
    },
    preview: {
        originSize: '原始大小',
        zoomIn: '放大',
        zoomOut: '缩小',
        exitPreview: '退出预览'
    },
    request: {
        errorRequest: '操作请求发生错误!',
        errorPermission: '您没有进行该操作的权限!',
        errorNotFound: '该资源已不存在!',
        errorDuplicate: '该名称的资源已存在!',
        errorServer: '服务器发生错误!',
        errorToken: '认证信息已失效!',
        errorConnection: '连接服务器失败!'
    },
    validate: {
        none: '内容不能为空!',
        integer: '请输入整数!',
        name: '用户名仅支持字母、数字、下划线与中划线, 且至少包含3个字符!',
        nick: '昵称仅支持字母、数字、中文、下划线与中划线, 且至少包含2个字符!',
        email: '请输入正确的邮箱地址!',
        phone: '请输入正确的手机号码!',
        password: '密码长度至少6位!',
        url: '请输入正确的链接地址!'
    },
    editor: {
        placeholder: '请输入内容...',
        insertLink: '插入链接',
        linkText: '请输入链接文本',
        linkUrl: '请输入链接地址',
        insertImage: '插入图片',
        image: {
            back: '返回',
            upload: '上传',
            search: '搜索已上传的图片'
        }
    },
    common: {
        submit: '提交',
        save: '保存',
        confirm: '确定',
        cancel: '取消',
        close: '关闭',
        submitButton: '提 交',
        saveButton: '保 存',
        confirmButton: '确 定',
        cancelButton: '取 消',
        closeButton: '关 闭',
        noMore: '没有更多了',
        noResults: '无检索结果',
        readCount: '阅读',
        likeCount: '点赞',
        commentCount: '评论',
        reply: '回复',
        menu: '菜单',
        edit: '编辑',
        delete: '删除',
        notice: '用户通知',
        confirmMessage: '您确定进行该操作吗?',
        just: '刚刚',
        minuetsAgo: '分钟前',
        hoursAgo: '小时前',
        yesterday: '昨天',
        twoDaysAgo: '前天',
        daysAgo: '天前'
    },
    ...zhLocale
};
