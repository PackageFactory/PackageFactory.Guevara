/**
 * Simple mapper from Neos Icon names to Fontawesome 5 icon classes.
 */
const mapper = icon => {
    const map = {
        'address-book-o': 'far fa-address-book',
        'address-card-o': 'far fa-address-card',
        'area-chart': 'fas fa-chart-area',
        'arrow-circle-o-down': 'far fa-arrow-alt-circle-down',
        'arrow-circle-o-left': 'far fa-arrow-alt-circle-left',
        'arrow-circle-o-right': 'far fa-arrow-alt-circle-right',
        'arrow-circle-o-up': 'far fa-arrow-alt-circle-up',
        'arrows-alt': 'fas fa-expand-arrows-alt',
        'arrows-h': 'fas fa-arrows-alt-h',
        'arrows-v': 'fas fa-arrows-alt-v',
        'arrows': 'fas fa-arrows-alt',
        'asl-interpreting': 'fas fa-american-sign-language-interpreting',
        'automobile': 'fas fa-car',
        'bank': 'fas fa-university',
        'bar-chart-o': 'far fa-chart-bar',
        'bar-chart': 'far fa-chart-bar',
        'bathtub': 'fas fa-bath',
        'battery-0': 'fas fa-battery-empty',
        'battery-1': 'fas fa-battery-quarter',
        'battery-2': 'fas fa-battery-half',
        'battery-3': 'fas fa-battery-three-quarters',
        'battery-4': 'fas fa-battery-full',
        'battery': 'fas fa-battery-full',
        'bell-o': 'far fa-bell',
        'bell-slash-o': 'far fa-bell-slash',
        'bitbucket-square': 'fab fa-bitbucket',
        'bitcoin': 'fab fa-btc',
        'bookmark-o': 'far fa-bookmark',
        'building-o': 'far fa-building',
        'cab': 'fas fa-taxi',
        'calendar-check-o': 'far fa-calendar-check',
        'calendar-minus-o': 'far fa-calendar-minus',
        'calendar-empty': 'far fa-calendar',
        'calendar-o': 'far fa-calendar',
        'calendar-plus-o': 'far fa-calendar-plus',
        'calendar-times-o': 'far fa-calendar-times',
        'calendar': 'fas fa-calendar-alt',
        'caret-square-o-down': 'far fa-caret-square-down',
        'caret-square-o-left': 'far fa-caret-square-left',
        'caret-square-o-right': 'far fa-caret-square-right',
        'caret-square-o-up': 'far fa-caret-square-up',
        'cc': 'far fa-closed-captioning',
        'chain-broken': 'fas fa-unlink',
        'chain': 'fas fa-link',
        'check-circle-o': 'far fa-check-circle',
        'check-square-o': 'far fa-check-square',
        'circle-o-notch': 'fas fa-circle-notch',
        'circle-o': 'far fa-circle',
        'circle-thin': 'far fa-circle',
        'clock-o': 'far fa-clock',
        'close': 'fas fa-times',
        'cloud-download': 'fas fa-cloud-download-alt',
        'cloud-upload': 'fas fa-cloud-upload-alt',
        'cny': 'fas fa-yen-sign',
        'code-fork': 'fas fa-code-branch',
        'comment-o': 'far fa-comment',
        'commenting-o': 'far fa-comment-alt',
        'commenting': 'fas fa-comment-alt',
        'comments-o': 'far fa-comments',
        'credit-card-alt': 'fas fa-credit-card',
        'cutlery': 'fas fa-utensils',
        'dashboard': 'fas fa-tachometer-alt',
        'deafness': 'fas fa-deaf',
        'dedent': 'fas fa-outdent',
        'diamond': 'far fa-gem',
        'dollar': 'fas fa-dollar-sign',
        'dot-circle-o': 'far fa-dot-circle',
        'drivers-license-o': 'far fa-id-card',
        'drivers-license': 'fas fa-id-card',
        'eercast': 'fab fa-sellcast',
        'envelope-alt': 'far fa-envelope',
        'envelope-o': 'far fa-envelope',
        'envelope-open-o': 'far fa-envelope-open',
        'eur': 'fas fa-euro-sign',
        'euro': 'fas fa-euro-sign',
        'exchange': 'fas fa-exchange-alt',
        'external-link-square': 'fas fa-external-link-square-alt',
        'external-link': 'fas fa-external-link-alt',
        'eyedropper': 'fas fa-eye-dropper',
        'fa': 'fab fa-font-awesome',
        'facebook-f': 'fab fa-facebook-f',
        'facebook-official': 'fab fa-facebook',
        'facebook': 'fab fa-facebook-f',
        'feed': 'fas fa-rss',
        'file-archive-o': 'far fa-file-archive',
        'file-audio-o': 'far fa-file-audio',
        'file-code-o': 'far fa-file-code',
        'file-excel-o': 'far fa-file-excel',
        'file-image-o': 'far fa-file-image',
        'file-movie-o': 'far fa-file-video',
        'file-o': 'far fa-file',
        'file-pdf-o': 'far fa-file-pdf',
        'file-photo-o': 'far fa-file-image',
        'file-picture-o': 'far fa-file-image',
        'file-powerpoint-o': 'far fa-file-powerpoint',
        'file-sound-o': 'far fa-file-audio',
        'file-text-o': 'far fa-file-alt',
        'file-text': 'fas fa-file-alt',
        'file-video-o': 'far fa-file-video',
        'file-word-o': 'far fa-file-word',
        'file-zip-o': 'far fa-file-archive',
        'files-o': 'far fa-copy',
        'flag-alt': 'far fa-flag',
        'flag-o': 'far fa-flag',
        'flash': 'fas fa-bolt',
        'floppy-o': 'far fa-save',
        'folder-o': 'far fa-folder',
        'folder-open-alt': 'far fa-folder-open',
        'folder-open-o': 'far fa-folder-open',
        'frown-o': 'far fa-frown',
        'futbol-o': 'far fa-futbol',
        'gbp': 'fas fa-pound-sign',
        'ge': 'fab fa-empire',
        'gear': 'fas fa-cog',
        'gears': 'fas fa-cogs',
        'gittip': 'fab fa-gratipay',
        'glass': 'fas fa-glass-martini',
        'google-plus-circle': 'fab fa-google-plus',
        'google-plus-official': 'fab fa-google-plus',
        'google-plus': 'fab fa-google-plus-g',
        'group': 'fas fa-users',
        'hand-grab-o': 'far fa-hand-rock',
        'hand-lizard-o': 'far fa-hand-lizard',
        'hand-o-down': 'far fa-hand-point-down',
        'hand-o-left': 'far fa-hand-point-left',
        'hand-o-right': 'far fa-hand-point-right',
        'hand-o-up': 'far fa-hand-point-up',
        'hand-paper-o': 'far fa-hand-paper',
        'hand-peace-o': 'far fa-hand-peace',
        'hand-pointer-o': 'far fa-hand-pointer',
        'hand-rock-o': 'far fa-hand-rock',
        'hand-scissors-o': 'far fa-hand-scissors',
        'hand-spock-o': 'far fa-hand-spock',
        'hand-stop-o': 'far fa-hand-paper',
        'handshake-o': 'far fa-handshake',
        'hard-of-hearing': 'fas fa-deaf',
        'hdd-o': 'far fa-hdd',
        'header': 'fas fa-heading',
        'heart-o': 'far fa-heart',
        'hospital-o': 'far fa-hospital',
        'hotel': 'fas fa-bed',
        'hourglass-1': 'fas fa-hourglass-start',
        'hourglass-2': 'fas fa-hourglass-half',
        'hourglass-3': 'fas fa-hourglass-end',
        'hourglass-o': 'far fa-hourglass',
        'id-card-o': 'far fa-id-card',
        'ils': 'fas fa-shekel-sign',
        'image': 'far fa-image',
        'inr': 'fas fa-rupee-sign',
        'institution': 'fas fa-university',
        'intersex': 'fas fa-transgender',
        'jpy': 'fas fa-yen-sign',
        'keyboard-o': 'far fa-keyboard',
        'krw': 'fas fa-won-sign',
        'legal': 'fas fa-gavel',
        'lemon-o': 'far fa-lemon',
        'level-down': 'fas fa-level-down-alt',
        'level-up': 'fas fa-level-up-alt',
        'life-bouy': 'far fa-life-ring',
        'life-buoy': 'far fa-life-ring',
        'life-saver': 'far fa-life-ring',
        'lightbulb-o': 'far fa-lightbulb',
        'line-chart': 'fas fa-chart-line',
        'linkedin-square': 'fab fa-linkedin',
        'linkedin': 'fab fa-linkedin-in',
        'long-arrow-down': 'fas fa-long-arrow-alt-down',
        'long-arrow-left': 'fas fa-long-arrow-alt-left',
        'long-arrow-right': 'fas fa-long-arrow-alt-right',
        'long-arrow-up': 'fas fa-long-arrow-alt-up',
        'mail-forward': 'fas fa-share',
        'mail-reply-all': 'fas fa-reply-all',
        'mail-reply': 'fas fa-reply',
        'map-marker': 'fas fa-map-marker-alt',
        'map-o': 'far fa-map',
        'meanpath': 'fab fa-font-awesome',
        'meh-o': 'far fa-meh',
        'minus-square-o': 'far fa-minus-square',
        'mobile-phone': 'fas fa-mobile-alt',
        'mobile': 'fas fa-mobile-alt',
        'money': 'far fa-money-bill-alt',
        'moon-o': 'far fa-moon',
        'mortar-board': 'fas fa-graduation-cap',
        'navicon': 'fas fa-bars',
        'newspaper-o': 'far fa-newspaper',
        'paper-plane-o': 'far fa-paper-plane',
        'paste': 'far fa-clipboard',
        'pause-circle-o': 'far fa-pause-circle',
        'pencil-square-o': 'far fa-edit',
        'pencil-square': 'fas fa-pen-square',
        'pencil': 'fas fa-pencil-alt',
        'photo': 'far fa-image',
        'picture-o': 'far fa-image',
        'pie-chart': 'fas fa-chart-pie',
        'play-circle-o': 'far fa-play-circle',
        'plus-square-o': 'far fa-plus-square',
        'question-circle-o': 'far fa-question-circle',
        'ra': 'fab fa-rebel',
        'refresh': 'fas fa-sync',
        'remove': 'fas fa-times',
        'reorder': 'fas fa-bars',
        'repeat': 'fas fa-redo',
        'resistance': 'fab fa-rebel',
        'rmb': 'fas fa-yen-sign',
        'rotate-left': 'fas fa-undo',
        'rotate-right': 'fas fa-redo',
        'rouble': 'fas fa-ruble-sign',
        'rub': 'fas fa-ruble-sign',
        'ruble': 'fas fa-ruble-sign',
        'rupee': 'fas fa-rupee-sign',
        's15': 'fas fa-bath',
        'scissors': 'fas fa-cut',
        'send-o': 'far fa-paper-plane',
        'send': 'fas fa-paper-plane',
        'share-square-o': 'far fa-share-square',
        'shekel': 'fas fa-shekel-sign',
        'sheqel': 'fas fa-shekel-sign',
        'shield': 'fas fa-shield-alt',
        'sign-in': 'fas fa-sign-in-alt',
        'sign-out': 'fas fa-sign-out-alt',
        'signing': 'fas fa-sign-language',
        'sliders': 'fas fa-sliders-h',
        'smile-o': 'far fa-smile',
        'snowflake-o': 'far fa-snowflake',
        'soccer-ball-o': 'far fa-futbol',
        'sort-alpha-asc': 'fas fa-sort-alpha-down',
        'sort-alpha-desc': 'fas fa-sort-alpha-up',
        'sort-amount-asc': 'fas fa-sort-amount-down',
        'sort-amount-desc': 'fas fa-sort-amount-up',
        'sort-asc': 'fas fa-sort-up',
        'sort-desc': 'fas fa-sort-down',
        'sort-numeric-asc': 'fas fa-sort-numeric-down',
        'sort-numeric-desc': 'fas fa-sort-numeric-up',
        'spoon': 'fas fa-utensil-spoon',
        'square-o': 'far fa-square',
        'star-half-empty': 'far fa-star-half',
        'star-half-full': 'far fa-star-half',
        'star-half-o': 'far fa-star-half',
        'star-o': 'far fa-star',
        'sticky-note-o': 'far fa-sticky-note',
        'stop-circle-o': 'far fa-stop-circle',
        'sun-o': 'far fa-sun',
        'support': 'far fa-life-ring',
        'tablet': 'fas fa-tablet-alt',
        'tachometer': 'fas fa-tachometer-alt',
        'television': 'fas fa-tv',
        'thermometer-0': 'fas fa-thermometer-empty',
        'thermometer-1': 'fas fa-thermometer-quarter',
        'thermometer-2': 'fas fa-thermometer-half',
        'thermometer-3': 'fas fa-thermometer-three-quarters',
        'thermometer-4': 'fas fa-thermometer-full',
        'thermometer': 'fas fa-thermometer-full',
        'thumb-tack': 'fas fa-thumbtack',
        'thumbs-o-down': 'far fa-thumbs-down',
        'thumbs-o-up': 'far fa-thumbs-up',
        'ticket': 'fas fa-ticket-alt',
        'times-circle-o': 'far fa-times-circle',
        'times-rectangle-o': 'far fa-window-close',
        'times-rectangle': 'fas fa-window-close',
        'toggle-down': 'far fa-caret-square-down',
        'toggle-left': 'far fa-caret-square-left',
        'toggle-right': 'far fa-caret-square-right',
        'toggle-up': 'far fa-caret-square-up',
        'trash-o': 'far fa-trash-alt',
        'trash': 'fas fa-trash-alt',
        'try': 'fas fa-lira-sign',
        'turkish-lira': 'fas fa-lira-sign',
        'unsorted': 'fas fa-sort',
        'upload-alt': 'fas fa-upload',
        'usd': 'fas fa-dollar-sign',
        'user-circle-o': 'far fa-user-circle',
        'user-o': 'far fa-user',
        'vcard-o': 'far fa-address-card',
        'vcard': 'fas fa-address-card',
        'video-camera': 'fas fa-video',
        'vimeo': 'fab fa-vimeo-v',
        'volume-control-phone': 'fas fa-phone-volume',
        'warning': 'fas fa-exclamation-triangle',
        'wechat': 'fab fa-weixin',
        'wheelchair-alt': 'fab fa-accessible-icon',
        'window-close-o': 'far fa-window-close',
        'won': 'fas fa-won-sign',
        'y-combinator-square': 'fab fa-hacker-news',
        'yc-square': 'fab fa-hacker-news',
        'yc': 'fab fa-y-combinator',
        'yen': 'fas fa-yen-sign',
        'youtube-play': 'fab fa-youtube',
        'youtube-square': 'fab fa-youtube',
        'picture': 'far fa-image',
        'copy': 'far fa-copy'
    };

    // all Icons from:
    // https://github.com/FortAwesome/Font-Awesome/blob/master/svg-with-js/js/fa-brands.js#L118
    const brands = [
        '500px',
        'accessible-icon',
        'accusoft',
        'adn',
        'adversal',
        'affiliatetheme',
        'algolia',
        'amazon',
        'amazon-pay',
        'amilia',
        'android',
        'angellist',
        'angrycreative',
        'angular',
        'app-store',
        'app-store-ios',
        'apper',
        'apple',
        'apple-pay',
        'asymmetrik',
        'audible',
        'autoprefixer',
        'avianex',
        'aviato',
        'aws',
        'bandcamp',
        'behance',
        'behance-square',
        'bimobject',
        'bitbucket',
        'bitcoin',
        'bity',
        'black-tie',
        'blackberry',
        'blogger',
        'blogger-b',
        'bluetooth',
        'bluetooth-b',
        'btc',
        'buromobelexperte',
        'buysellads',
        'cc-amazon-pay',
        'cc-amex',
        'cc-apple-pay',
        'cc-diners-club',
        'cc-discover',
        'cc-jcb',
        'cc-mastercard',
        'cc-paypal',
        'cc-stripe',
        'cc-visa',
        'centercode',
        'chrome',
        'cloudscale',
        'cloudsmith',
        'cloudversify',
        'codepen',
        'codiepie',
        'connectdevelop',
        'contao',
        'cpanel',
        'creative-commons',
        'creative-commons-by',
        'creative-commons-nc',
        'creative-commons-nc-eu',
        'creative-commons-nc-jp',
        'creative-commons-nd',
        'creative-commons-pd',
        'creative-commons-pd-alt',
        'creative-commons-remix',
        'creative-commons-sa',
        'creative-commons-sampling',
        'creative-commons-sampling-plus',
        'creative-commons-share',
        'css3',
        'css3-alt',
        'cuttlefish',
        'd-and-d',
        'dashcube',
        'delicious',
        'deploydog',
        'deskpro',
        'deviantart',
        'digg',
        'digital-ocean',
        'discord',
        'discourse',
        'dochub',
        'docker',
        'draft2digital',
        'dribbble',
        'dribbble-square',
        'dropbox',
        'drupal',
        'dyalog',
        'earlybirds',
        'ebay',
        'edge',
        'elementor',
        'ello',
        'ember',
        'empire',
        'envira',
        'erlang',
        'ethereum',
        'etsy',
        'expeditedssl',
        'facebook',
        'facebook-f',
        'facebook-messenger',
        'facebook-square',
        'firefox',
        'first-order',
        'first-order-alt',
        'firstdraft',
        'flickr',
        'flipboard',
        'fly',
        'font-awesome',
        'font-awesome-alt',
        'font-awesome-flag',
        'font-awesome-logo-full',
        'fonticons',
        'fonticons-fi',
        'fort-awesome',
        'fort-awesome-alt',
        'forumbee',
        'foursquare',
        'free-code-camp',
        'freebsd',
        'fulcrum',
        'galactic-republic',
        'galactic-senate',
        'get-pocket',
        'gg',
        'gg-circle',
        'git',
        'git-square',
        'github',
        'github-alt',
        'github-square',
        'gitkraken',
        'gitlab',
        'gitter',
        'glide',
        'glide-g',
        'gofore',
        'goodreads',
        'goodreads-g',
        'google',
        'google-drive',
        'google-play',
        'google-plus',
        'google-plus-g',
        'google-plus-square',
        'google-wallet',
        'gratipay',
        'grav',
        'gripfire',
        'grunt',
        'gulp',
        'hacker-news',
        'hacker-news-square',
        'hackerrank',
        'hips',
        'hire-a-helper',
        'hooli',
        'hornbill',
        'hotjar',
        'houzz',
        'html5',
        'hubspot',
        'imdb',
        'instagram',
        'internet-explorer',
        'ioxhost',
        'itunes',
        'itunes-note',
        'java',
        'jedi-order',
        'jenkins',
        'joget',
        'joomla',
        'js',
        'js-square',
        'jsfiddle',
        'kaggle',
        'keybase',
        'keycdn',
        'kickstarter',
        'kickstarter-k',
        'korvue',
        'laravel',
        'lastfm',
        'lastfm-square',
        'leanpub',
        'less',
        'line',
        'linkedin',
        'linkedin-in',
        'linode',
        'linux',
        'lyft',
        'magento',
        'mailchimp',
        'mandalorian',
        'markdown',
        'mastodon',
        'maxcdn',
        'medapps',
        'medium',
        'medium-m',
        'medrt',
        'meetup',
        'megaport',
        'microsoft',
        'mix',
        'mixcloud',
        'mizuni',
        'modx',
        'monero',
        'napster',
        'neos',
        'nimblr',
        'nintendo-switch',
        'node',
        'node-js',
        'npm',
        'ns8',
        'nutritionix',
        'odnoklassniki',
        'odnoklassniki-square',
        'old-republic',
        'opencart',
        'openid',
        'opera',
        'optin-monster',
        'osi',
        'page4',
        'pagelines',
        'palfed',
        'patreon',
        'paypal',
        'periscope',
        'phabricator',
        'phoenix-framework',
        'phoenix-squadron',
        'php',
        'pied-piper',
        'pied-piper-alt',
        'pied-piper-hat',
        'pied-piper-pp',
        'pinterest',
        'pinterest-p',
        'pinterest-square',
        'playstation',
        'product-hunt',
        'pushed',
        'python',
        'qq',
        'quinscape',
        'quora',
        'r-project',
        'ravelry',
        'react',
        'readme',
        'rebel',
        'red-river',
        'reddit',
        'reddit-alien',
        'reddit-square',
        'rendact',
        'renren',
        'replyd',
        'researchgate',
        'resolving',
        'rev',
        'rocketchat',
        'rockrms',
        'safari',
        'sass',
        'schlix',
        'scribd',
        'searchengin',
        'sellcast',
        'sellsy',
        'servicestack',
        'shirtsinbulk',
        'shopware',
        'simplybuilt',
        'sistrix',
        'sith',
        'skyatlas',
        'skype',
        'slack',
        'slack-hash',
        'slideshare',
        'snapchat',
        'snapchat-ghost',
        'snapchat-square',
        'soundcloud',
        'speakap',
        'spotify',
        'squarespace',
        'stack-exchange',
        'stack-overflow',
        'staylinked',
        'steam',
        'steam-square',
        'steam-symbol',
        'sticker-mule',
        'strava',
        'stripe',
        'stripe-s',
        'studiovinari',
        'stumbleupon',
        'stumbleupon-circle',
        'superpowers',
        'supple',
        'teamspeak',
        'telegram',
        'telegram-plane',
        'tencent-weibo',
        'themeco',
        'themeisle',
        'trade-federation',
        'trello',
        'tripadvisor',
        'tumblr',
        'tumblr-square',
        'twitch',
        'twitter',
        'twitter-square',
        'typo3',
        'uber',
        'uikit',
        'uniregistry',
        'untappd',
        'usb',
        'ussunnah',
        'vaadin',
        'viacoin',
        'viadeo',
        'viadeo-square',
        'viber',
        'vimeo',
        'vimeo-square',
        'vimeo-v',
        'vine',
        'vk',
        'vnv',
        'vuejs',
        'weebly',
        'weibo',
        'weixin',
        'whatsapp',
        'whatsapp-square',
        'whmcs',
        'wikipedia-w',
        'windows',
        'wix',
        'wolf-pack-battalion',
        'wordpress',
        'wordpress-simple',
        'wpbeginner',
        'wpexplorer',
        'wpforms',
        'xbox',
        'xing',
        'xing-square',
        'y-combinator',
        'yahoo',
        'yandex',
        'yandex-international',
        'yelp',
        'yoast',
        'youtube',
        'youtube-square',
        'zhihu'
    ];

    /**
     *  Neos <= 3.3 prefixed icons with this, we need to strip those
     *  otherwise the mapping would'nt work for brand icons
     */
    if (icon.startsWith('fas fa-')) {
        icon = icon.substr(7).split(' ')[0];
    }

    if (icon.startsWith('icon-')) {
        icon = icon.substr(5).split(' ')[0];
    }

    icon = icon.trim();

    if (map[icon]) {
        return map[icon];
    }

    if (brands.includes(icon)) {
        return 'fab fa-' + icon;
    }

    if (!icon.includes(' ')) {
        return 'fas fa-' + icon;
    }

    return icon;
};

export default mapper;
