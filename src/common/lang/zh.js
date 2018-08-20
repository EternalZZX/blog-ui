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
        create: {
            title: '上传图片'
        }
    },
    preview: {
        originSize: '原始大小',
        zoomIn: '放大',
        zoomOut: '缩小',
        exitPreview: '退出预览'
    },
    request: {
        errorRequest: '请求错误!',
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
        submit: '提 交',
        cancel: '取 消',
        noMore: '没有更多了',
        close: '关闭',
        readCount: '阅读',
        likeCount: '点赞',
        commentCount: '评论',
        just: '刚刚',
        minuetsAgo: '分钟前',
        hoursAgo: '小时前',
        yesterday: '昨天',
        twoDaysAgo: '前天',
        daysAgo: '天前'
    },
    ...zhLocale
};
