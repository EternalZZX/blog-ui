import zhLocale from 'element-ui/lib/locale/lang/zh-CN';

export default {
    header: {
        home: '首页',
        section: '话题',
        favorite: '书签',
        search: '搜索新发现...',
        post: '发帖',
        profile: '我的主页',
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
        password: '密码长度至少6位!'
    },
    ...zhLocale
};
