import enLocale from 'element-ui/lib/locale/lang/en';

export default {
    header: {
        home: 'Home',
        section: 'Forum',
        mark: 'Bookmark',
        search: 'Search for new discoveries...',
        post: 'Post',
        profile: 'Profile',
        album: 'Album',
        setting: 'Settings',
        signOut: 'Sign Out'
    },
    account: {
        username: 'Username',
        password: 'Password',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        forgetPassword: 'Forgot password?',
        noUsername: 'Please enter your account!',
        noPassword: 'Please enter password!',
        errorPassword: 'Account or password is wrong!',
        UsernameConflict: 'The username is already taken!',
        signUpForbidden: 'Account sign up is disabled!',
        welcome: 'Welcome {name} !',
        adieu: 'Goodbye {name} !'
    },
    section: {
        nav: {
            title: 'Topics',
            create: 'Add',
            all: 'All Topics',
            hot: 'Hot Topics',
            follow: 'Topics Followed',
            manage: 'Topics Managed'
        },
        card: {
            detail: 'Information details',
            noPermission: 'Topic permission denied',
            owner: 'Initiator',
            moderator: 'Moderator',
            assistant: 'Assistants'
        },
        create: {
            title: 'Add Topic'
        }
    },
    album: {
        nav: {
            title: 'Albums',
            create: 'Add',
            all: 'All Albums',
            public: 'Public Albums',
            private: 'Private Albums',
            other: 'Other Photos'
        },
        create: {
            title: 'Add Album'
        }
    },
    request: {
        errorRequest: 'Request error!',
        errorConnection: 'Failed to connect to the server!'
    },
    validate: {
        none: 'The field can not empty!',
        integer: 'Please enter an integer!',
        name: 'Username supports only letters, digits, underscores and ' +
              'separators, and contains at least 3 characters!',
        nick: 'Nick support only letters, digits, chinese, underscores, ' +
              'and separators, and contain at least 2 characters!',
        email: 'Please enter the correct email address!',
        phone: 'Please enter the correct phone number!',
        password: 'Password contain at least 6 characters!'
    },
    common: {
        submit: 'Submit',
        cancel: 'Cancel',
        noMore: 'No more'
    },
    ...enLocale
};
