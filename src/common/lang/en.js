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
    photo: {
        nav: {
            title: 'Photos',
            back: 'Back',
            all: 'All Photos',
            public: 'Public Photos',
            private: 'Private Photos',
            create: 'Upload Photo',
            edit: 'Edit Mode',
            browse: 'Browse Mode'
        },
        create: {
            title: 'Upload Photo',
            success: 'Upload photo succeed!',
            error: 'Upload photo failed!'
        }
    },
    comment: {
        comment: 'Comment',
        like: 'Upvote',
        dislike: 'Downvote',
        dialog: 'Dialog',
        viewDialog: 'View conversation',
        reply: 'reply',
        replyUser: 'Reply {name}...',
        placeholder: 'Please enter comment...',
        create: {
            success: 'Comment post successfully!'
        },
        edit: {
            success: 'Comment edit successfully!'
        },
        delete: {
            success: 'Comment delete successfully!',
            confirm: 'Are you sure to delete this comment?'
        }
    },
    preview: {
        originSize: 'Origin Size',
        zoomIn: 'Zoom In',
        zoomOut: 'Zoom Out',
        exitPreview: 'Exit Preview'
    },
    request: {
        errorRequest: 'Request error!',
        errorPermission: 'You do not have permission to perform this operation!',
        errorNotFound: 'The resource does not exist!',
        errorDuplicate: 'The resource for this name already exists!',
        errorServer: 'Server error!',
        errorToken: 'Authentication information has expired!',
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
        password: 'Password contain at least 6 characters!',
        url: 'Please enter the correct url address!'
    },
    editor: {
        placeholder: 'Please enter contents...',
        insertLink: 'Insert link',
        linkText: 'Please enter link text',
        linkUrl: 'Please enter link url',
        insertImage: 'Insert Photo',
        image: {
            back: 'Back',
            upload: 'Upload',
            search: 'Search for a photo'
        }
    },
    common: {
        submit: 'Submit',
        save: 'Save',
        confirm: 'Confirm',
        cancel: 'Cancel',
        close: 'Close',
        submitButton: 'Submit',
        saveButton: 'Save',
        confirmButton: 'Confirm',
        cancelButton: 'Cancel',
        closeButton: 'Close',
        noMore: 'No more',
        noResults: 'No results',
        readCount: 'Read',
        likeCount: 'Like',
        commentCount: 'Comments',
        reply: 'Reply',
        menu: 'Menu',
        edit: 'Edit',
        delete: 'Delete',
        notice: 'Notice',
        confirmMessage: 'Determine this operation?',
        just: 'Just now',
        minuetsAgo: 'm ago',
        hoursAgo: 'h ago',
        yesterday: 'Yesterday',
        twoDaysAgo: 'Two days ago',
        daysAgo: 'd ago'
    },
    ...enLocale
};
