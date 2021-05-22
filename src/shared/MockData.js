import {Asset} from "expo-asset"
import {windowHeight} from "./Const"

export default class Icon {
    constructor(module, width, height) {
        this.module = module;
        this.width = width;
        this.height = height;
        Asset.fromModule(this.module).downloadAsync()
    }
}

class PlaylistItem {
    constructor(name, uri, isVideo) {
        this.name = name;
        this.uri = uri;
        this.isVideo = isVideo;
    }
}

export const PLAYLIST = [
    new PlaylistItem(
        "Big Buck Bunny",
        "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        true
    ),
    new PlaylistItem(
        "Popeye - I don't scare",
        "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",
        true
    )
]

export const ICON_PLAY_BUTTON = new Icon(
    require("../assets/icon/icon-player-play.png"),
    48,
    48
);

export const ICON_PAUSE_BUTTON = new Icon(
    require("../assets/icon/icon-player-pause.png"),
    48,
    48
);

export const ICON_FORWARD_BUTTON = new Icon(
    require("../assets/icon/icon-player-nextRight.png"),
    18,
    22
);

export const ICON_BACK_BUTTON = new Icon(
    require("../assets/icon/icon-plyaer-nextLeft.png"),
    18,
    22
);

export const ICON_MUTED_BUTTON = new Icon(
    require("../assets/test/muted_button.png"),
    67,
    58
);

export const ICON_ARROW_DOWN = new Icon(
    require("../assets/icon/icon-player-arrow-dropdown.png"),
    16,
    16
)

export const ICON_MENU_HORIZONTAL = new Icon(
    require("../assets/icon/icon-player-menu-horizontal.png"),
    20,
    4
)

export const ICON_THUMB = new Icon(
    require("../assets/icon/icon-player-thumb.png"),
    13,
    13
)

export const ICON_FULLSCREEN = new Icon(
    require("../assets/icon/icon-player-fullScreen.png"),
    100,
    40
)

export const ICON_CHANGE_SECOND_LEFT = new Icon(
    require("../assets/icon/icon-player-chnage-second-left.png"),
    24,
    28
);

export const ICON_CHANGE_SECOND_RIGHT = new Icon(
    require("../assets/icon/icon-player-chnage-second-right.png"),
    24,
    28
);

export const ICON_CHECK = new Icon(
    require("../assets/icon/icon-check.png"),
    17,
    13
);

export const ICON_LIKE = new Icon(
    require("../assets/icon/icon-like.png"),
    14,
    13
);

export const ICON_SHARE = new Icon(
    require("../assets/icon/icon-share.png"),
    16,
    13
);

export const ICON_WATCH = new Icon(
    require("../assets/icon/icon-watch.png"),
    17,
    14
);

export const ICON_INFO = new Icon(
    require("../assets/icon/icon-info.png"),
    14,
    14
);

export const ICON_USER = new Icon(
    require("../assets/icon/icon-user.png"),
    38,
    38
);

export const ICON_PLUS = new Icon(
    require("../assets/icon/icon-plus.png"),
    8,
    8
);

export const ICON_ARROW_DOWN_FOLLOW = new Icon(
    require("../assets/icon/icon-arrow-down.png"),
    8,
    6
);


export const LOOPING_TYPE_ALL = 0;
export const LOOPING_TYPE_ONE = 1;
export const DISABLED_OPACITY = 0.5;
export const FONT_SIZE = 14;
export const LOADING_STRING = "... loading ...";
export const VIDEO_CONTAINER_HEIGHT = windowHeight / 4.2;

export const videoSubModalObject = [
    {
        id: 1,
        title: 'Quality',
        items: [
            {
                id: 1,
                item: 'Auto(720p)',
                bool: true
            },
            {
                id: 2,
                item: '1080p',
                bool: false
            },
            {
                id: 3,
                item: '720p',
                bool: false
            },
            {
                id: 4,
                item: '480p',
                bool: false
            },
            {
                id: 5,
                item: '360p',
                bool: false
            },
            {
                id: 6,
                item: '240p',
                bool: false
            },
            {
                id: 7,
                item: '144p',
                bool: false
            },
        ],
        bool: false,
        icon: new Icon(
            require("../assets/icon/icon-quality.png"),
            16,
            15
        )
    },
    {
        id: 2,
        title: 'Captions',
        items: [
            {
                id: 1,
                item: 'Off',
                bool: true
            },
            {
                id: 2,
                item: 'English',
                bool: false
            },
            {
                id: 3,
                item: 'French',
                bool: false
            },
            {
                id: 4,
                item: 'Arabic',
                bool: false
            }
        ],
        bool: false,
        icon: new Icon(
            require("../assets/icon/icon-captions.png"),
            16,
            14
        )
    },
    {
        id: 3,
        title: 'Sound Channel',
        items: [
            {
                id: 1,
                item: 'Main (Arabic)',
                bool: true
            },
            {
                id: 2,
                item: 'English',
                bool: false
            },
        ],
        bool: false,
        icon: new Icon(
            require("../assets/icon/icon-sound.png"),
            18,
            15
        )
    },
    {
        id: 4,
        title: 'Report',
        items: [
            {
                id: 1,
                item: 'Sexual content',
                bool: true
            },
            {
                id: 2,
                item: 'Child abuse',
                bool: false
            },
            {
                id: 3,
                item: 'Sexual content',
                bool: false
            },
            {
                id: 4,
                item: 'Child abuse',
                bool: false
            },
            {
                id: 5,
                item: 'Sexual content',
                bool: false
            },
            {
                id: 6,
                item: 'Child abuse',
                bool: false
            },
            {
                id: 7,
                item: 'Other',
                bool: false
            },
        ],
        bool: false,
        icon: new Icon(
            require("../assets/icon/icon-report.png"),
            13,
            15
        )
    }
]
