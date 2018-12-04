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
            add: 'Add',
            all: 'All Topics',
            hot: 'Hot Topics',
            follow: 'Topics Followed',
            manage: 'Topics Managed',
            create: 'Add Topic'
        },
        card: {
            detail: 'Information details',
            noPermission: 'Topic permission denied',
            owner: 'Sponsor',
            moderator: 'Moderators',
            assistant: 'Assistants'
        },
        create: {
            title: 'Add Topic',
            name: 'Topic Id',
            namePlaceholder: 'Please enter topic ID for the URL',
            nick: 'Topic title',
            nickPlaceholder: 'Please enter topic title',
            description: 'Description',
            descriptionPlaceholder: 'Please enter topic description',
            cover: 'Topic Cover',
            owner: 'Sponsor',
            ownerPlaceholder: 'Please enter topic sponsor',
            moderator: 'Moderators',
            moderatorPlaceholder: 'Please enter topic moderators',
            assistant: 'Assistants',
            assistantPlaceholder: 'Please enter topic assistants',
            readLevel: 'Read Level',
            status: 'Topic Status',
            onlyRoles: 'Role Limit',
            roles: 'Role Allowed',
            rolesPlaceholder: 'Please enter role name',
            success: 'Topic create succeed!',
            error: 'Topic create failed!'
        },
        edit: {
            nav: {
                title: 'Setting',
                basic: 'Basic Setting',
                advanced: 'Advanced Setting',
                policy: 'Policy Setting',
                permission: 'Permission Setting',
                cancel: 'Close Topic',
                delete: 'Delete Topic'
            },
            selectCover: 'Select Topic Cover',
            policy: {
                autoAudit: 'Auto Audit',
                articleMute: 'Article Mute',
                replyMute: 'Comment Mute',
                maxArticles: 'Max Articles',
                maxArticlesPlaceholder: 'Maximum articles per account',
                maxArticlesOneDay: 'Max Articles / Day',
                maxArticlesOneDayPlaceholder: 'Maximum articles per account per day'
            },
            permission: {
                set_permission: 'Set Permission',
                delete_permission: 'Delete Topic',
                set_owner: 'Set Owner',
                set_name: 'Set Topic Id',
                set_nick: 'Set Topic Name',
                set_description: 'Set Description',
                set_cover: 'Set Cover',
                set_moderator: 'Set Moderator',
                set_assistant: 'Set Assistant',
                set_status: 'Set Topic Status',
                set_cancel: 'Close Topic',
                cancel_visible: 'Close Visable',
                set_read_level: 'Set Read Level',
                set_read_user: 'Set Read Limit',
                set_policy: 'Set Topic Policy',
                article_audit: 'Audit Article',
                article_edit: 'Edit Article',
                article_draft: 'Audit Draft',
                article_recycled: 'Recycle Article',
                article_cancel: 'Cancel Article',
                article_delete: 'Delete Article',
                comment_audit: 'Audit Comment',
                comment_edit: 'Edit Comment',
                comment_recycled: 'Recycle Comment',
                comment_cancel: 'Cancel Comment',
                comment_delete: 'Delete Comment'
            },
            permissionRoles: {
                owner: 'Sponsor',
                controller: 'Controllers',
                manager: 'Managers'
            },
            success: 'Topic settings update successfully!',
            error: 'Topic settings update failed!'
        },
        delete: {
            success: 'Topic delete successfully!',
            error: 'Topic delete failed!',
            confirm: 'Are you sure to delete this topic?'
        },
        cancel: {
            success: 'Topic close successfully!',
            error: 'Topic close failed!',
            confirm: 'Are you sure to close this topic?'
        },
        status: {
            normal: 'Normal',
            hide: 'Partly Visible',
            cancel: 'Closed'
        }
    },
    album: {
        nav: {
            title: 'Albums',
            add: 'Add',
            all: 'All Albums',
            public: 'Public Albums',
            private: 'Private Albums',
            other: 'Other Photos',
            create: 'Add Album',
            delete: 'Delete Album',
            check: 'Check All',
            uncheck: 'Uncheck All',
            edit: 'Edit Mode',
            browse: 'Browse Mode'
        },
        create: {
            title: 'Add Album',
            name: 'Album Title',
            namePlaceholder: 'Please enter album title',
            description: 'Description',
            descriptionPlaceholder: 'Please enter album description',
            cover: 'Album Cover',
            privacy: 'Private Album',
            system: 'Public Cover',
            success: 'Album create succeed!',
            error: 'Album create failed!'
        },
        edit: {
            title: 'Edit Album',
            success: 'Album edit successfully!',
            error: 'Album edit failed!'
        },
        delete: {
            success: 'Album delete successfully!',
            error: 'Album delete failed!',
            confirm: 'Are you sure to delete this album?',
            confirmPhotos: 'Are you sure to delete these albums?',
            confirmSelect: 'Please select at least one album to delete!'
        },
        system: {
            none: 'Non-default Album',
            avatar: 'Default Avatar Album',
            album: 'Album Cover Album',
            section: 'Section Cover Album',
            article: 'Article Cover Album'
        }
    },
    photo: {
        nav: {
            title: 'Photos',
            all: 'All Photos',
            public: 'Public Photos',
            private: 'Private Photos',
            create: 'Upload Photo',
            delete: 'Delete Photo',
            check: 'Check All',
            uncheck: 'Uncheck All',
            edit: 'Edit Mode',
            browse: 'Browse Mode'
        },
        create: {
            title: 'Upload Photo',
            file: 'Upload File',
            description: 'Description',
            descriptionPlaceholder: 'Please enter photo description',
            album: 'Photo Album',
            albumPlaceholder: 'Please enter album title',
            audit: 'Audit Status',
            privacy: 'Private Photo',
            readLevel: 'Read Level',
            origin: 'Original Size',
            untreated: 'Uncompressed',
            success: 'Upload photo succeed!',
            error: 'Upload photo failed!'
        },
        edit: {
            title: 'Edit Photo',
            success: 'Photo edit successfully!',
            error: 'Photo edit failed!'
        },
        delete: {
            success: 'Photo delete successfully!',
            error: 'Photo delete failed!',
            confirm: 'Are you sure to delete this photo?',
            confirmPhotos: 'Are you sure to delete these photos?',
            confirmSelect: 'Please select at least one photo to delete!'
        },
        search: 'Search for a photo'
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
            success: 'Comment post successfully!',
            error: 'Comment post failed!'
        },
        edit: {
            success: 'Comment edit successfully!',
            error: 'Comment edit failed!'
        },
        delete: {
            success: 'Comment delete successfully!',
            error: 'Comment delete failed!',
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
    status: {
        draft: 'Draft',
        audit: 'Review',
        active: 'Pass',
        failed: 'Reject',
        recycled: 'Recycle',
        cancel: 'Cnacel'
    },
    validate: {
        none: 'The field can not empty!',
        integer: 'Please enter an integer!',
        name: 'Support letters, digits, underscores and separators, and contains at least 3 characters!',
        nick: 'Support letters, digits, chinese, underscores, and separators, and contain at least 2 characters!',
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
        insertImage: 'Insert Photo'
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
        advanced: 'Advanced',
        readCount: 'Read',
        likeCount: 'Like',
        commentCount: 'Comments',
        reply: 'Reply',
        menu: 'Menu',
        back: 'Back',
        upload: 'Upload',
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
