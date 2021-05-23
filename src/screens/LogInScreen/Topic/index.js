import React, {useState} from "react"
import {
    ActivityIndicator,
    Keyboard,
    Stylesheet,
    Text,
    View,
    Image,
    FlatList,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native";
import {LinearGradient} from 'expo-linear-gradient'
import {windowHeight, windowWidth} from "../../../shared/Const"
import {PrimaryBtn} from "../../../components/UI/PrimaryBtn"
import {ExternalLogin} from "../../../components/ExternalLogin"
import {style} from './style'


const DATA = [
    {
      id: "1",
      name: "Topic-1",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-1.png",
    },
    {
      id: "2",
      name: "Topic-2",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-2.png",
    },
    {
      id: "3",
      name: "Topic-3",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-3.png",
    },
    {
      id: "4",
      name: "Topic-4",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-4.png",
    },
    {
      id: "5",
      name: "Topic-5",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-5.png",
    },
    {
      id: "6",
      name: "Topic-6",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-6.png",
    },
    {
      id: "7",
      name: "Topic-7",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-7.png",
    },
    {
      id: "8",
      name: "Topic-8",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-8.png",
    },
    {
      id: "9",
      name: "Topic-9",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-9.png",
    },
    {
      id: "10",
      name: "Topic-2",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-2.png",
    },
    {
      id: "11",
      name: "Topic-3",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-3.png",
    },
    {
      id: "12",
      name: "Topic-4",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-4.png",
    },
    {
      id: "13",
      name: "Topic-5",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-5.png",
    },
    {
      id: "14",
      name: "Topic-6",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-6.png",
    },
    {
      id: "15",
      name: "Topic-7",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-7.png",
    },
    {
      id: "16",
      name: "Topic-8",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-8.png",
    },
    {
      id: "17",
      name: "Topic-9",
      image:
        "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/topic-9.png",
    },
];

export const Topic = () => {

    const [apiErrorText, setApiErrorText] = useState('')
    const [data, setData] = useState(DATA)
    const [percentw, setPercentw] = useState((windowWidth - (windowWidth * 15) / 100) / 3.2)

    const dismiseKey = () => {
        Keyboard.dismiss();
    };
    const setSelectedTopics = (prop) => {
      let topics = [...DATA];
      for (let data of topics) {
        if (data.id == prop) {
          data.selected = data.selected == null ? true : !data.selected;

          break;
        }
      }
      topics.forEach((topic) => {
        if (topic.selected != undefined) {
          if (topic.selected == true) {
            // this.btnDisabled = 0;
          } else if (topic.selected == false) {
            // this.btnDisabled = 1;
          }
        }
      });
      setData(topics)
    }
    const skip = () => {

    }
    const renderElement = (item) => {
        if(item)
          return <Image source={require('../../../assets/images/icons/check-icon.png')} />;
        return null;
    }


    return (
        <TouchableWithoutFeedback onPress={dismiseKey}>
            <View style={style.container}>
                {/* <ActivityIndicator
                style={style.loader}
                animating={load}
                textContent="Loading..."
                size="small"
                color="#ffffff"
                /> */}
                <Image
                style={style.background}
                source={require('../../../assets/images/backgrounds/forgotpass-back.png')}
                />
                <View style={style.topicContainer}>
                <Text style={style.title}>Pick interesting topic</Text>
                
                <ScrollView contentContainerStyle={style.scrollView}>
                <FlatList
                    data={DATA}
                    numColumns="3"
                    vertical="true"
                    style={{
                    marginBottom: (windowHeight * 18 ) / 100,
                    }}
                    renderItem={({ item, index }) => (
                    <TouchableOpacity
                        key={item.id}
                        data_id={item.id}
                        style={{
                        width: percentw,
                        height: percentw,
                        marginRight: 4,
                        marginLeft: 4,
                        marginBottom: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        overflow: 'hidden',
                        }}
                        onPress={() => setSelectedTopics(item.id)}>
                        <Image
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            width: 'auto',
                            height: '100%',
                        }}
                        source={{ uri: item.image }}
                        />
                        <Image
                        style={[
                            item.selected == true
                            ? {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                width: 'auto',
                                height: '100%',
                                backgroundColor: '#0B0BB2',
                                opacity: 0.7,
                                }
                            : {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                width: 'auto',
                                height: '100%',
                                backgroundColor: 'black',
                                opacity: 0.3,
                                },
                        ]}
                        />
                        { renderElement(item.selected) }
                        <Text
                        style={{
                            fontSize: 18,
                            color: 'white',
                        }}
                        >{ item.name }</Text>
                    </TouchableOpacity>
                    )}
                />
                </ScrollView>
                <View style={style.bottomFixed}>
                    <Image
                    style={style.transparentGradient}
                    source={
                        require('../../../assets/images/backgrounds/transparent-gradient.png')
                    }
                    />
                    <PrimaryBtn text="Submit"/>
                    <TouchableWithoutFeedback onPress={skip}>
                    <Text style={style.link}>Skip</Text>
                    </TouchableWithoutFeedback>
                </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
