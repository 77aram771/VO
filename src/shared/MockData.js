import {Asset} from "expo-asset";
import {windowHeight} from "./Const";
class Icon {
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
        "Comfort Fit - “Sorry”",
        "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
        false
    ),
    new PlaylistItem(
        "Mildred Bailey – “All Of Me”",
        "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
        false
    ),
    new PlaylistItem(
        "Popeye - I don't scare",
        "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",
        true
    ),
    new PlaylistItem(
        "Podington Bear - “Rubber Robot”",
        "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
        false
    )
]


export const ICON_THROUGH_EARPIECE = "speaker-phone"
export const ICON_THROUGH_SPEAKER = "speaker"

export const ICON_PLAY_BUTTON = new Icon(
    require("../assets/icon/icon-player-play.png"),
    34,
    51
);

export const ICON_PAUSE_BUTTON = new Icon(
    require("../assets/test/pause_button.png"),
    34,
    51
);

export const ICON_STOP_BUTTON = new Icon(
    require("../assets/test/stop_button.png"),
    22,
    22
);

export const ICON_FORWARD_BUTTON = new Icon(
    require("../assets/test/forward_button.png"),
    33,
    25
);

export const ICON_BACK_BUTTON = new Icon(
    require("../assets/test/back_button.png"),
    33,
    25
);

export const ICON_LOOP_ALL_BUTTON = new Icon(
    require("../assets/test/loop_all_button.png"),
    77,
    35
);

export const ICON_LOOP_ONE_BUTTON = new Icon(
    require("../assets/test/loop_one_button.png"),
    77,
    35
);

export const ICON_MUTED_BUTTON = new Icon(
    require("../assets/test/muted_button.png"),
    67,
    58
);

export const ICON_UNMUTED_BUTTON = new Icon(
    require("../assets/test/unmuted_button.png"),
    67,
    58
);

export const LOOPING_TYPE_ALL = 0;
export const LOOPING_TYPE_ONE = 1;
export const LOOPING_TYPE_ICONS = {0: ICON_LOOP_ALL_BUTTON, 1: ICON_LOOP_ONE_BUTTON};

export const BACKGROUND_COLOR = "#FFF8ED";
export const DISABLED_OPACITY = 0.5;
export const FONT_SIZE = 14;
export const LOADING_STRING = "... loading ...";
export const BUFFERING_STRING = "...buffering...";
export const RATE_SCALE = 3.0;
export const VIDEO_CONTAINER_HEIGHT = (windowHeight * 2.0) / 5.0 - FONT_SIZE * 2;
