import React, {useState, useEffect} from "react"
import {
    ActivityIndicator,
    Keyboard,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Picker,
    ImageBackground
} from "react-native"
import {LinearGradient} from 'expo-linear-gradient'
import {API_URL, windowHeight, windowWidth} from "../../../shared/Const"
import {PrimaryBtn} from "../../../components/UI/PrimaryBtn"
import {ExternalLogin} from "../../../components/ExternalLogin"
import {style} from './style'
import axios from "axios";
const mounths = [
    { 'value': "01", 'text': "January" },
    { 'value': "02", 'text': "February" },
    { 'value': "03", 'text': "March" },
    { 'value': "04", 'text': "April" },
    { 'value': "05", 'text': "May" },
    { 'value': "06", 'text': "June" },
    { 'value': "07", 'text': "July" },
    { 'value': "08", 'text': "August" },
    { 'value': "09", 'text': "September" },
    { 'value': "10", 'text': "October" },
    { 'value': "11", 'text': "November" },
    { 'value': "12", 'text': "December" },
];

var array = [];
for (var i = 1; i <= 31; i++) {
  if (i < 10) {
    array.push({ value: "" + "0" + i + "", text: "" + "0" + i + "" });
  } else {
    array.push({ value: "" + i + "", text: "" + i + "" });
  }
}

var array2 = [];
for (var i = 1900; i <= new Date().getFullYear(); i++) {
  array2.push({ value: "" + i + "", text: "" + i + "" });
}


export const MissingCont = (props) => {

    const { navigation } = props;

    const [email, setEmail] = useState(props.route.params.socialEmail)
    const [fname, setFname] = useState(props.route.params.socialFirstName)
    const [lname, setLname] = useState(props.route.params.socialLastName)
    const [gender, setGender] = useState(props.route.params.socialGender)
    const [bday, setBday] = useState(props.route.params.socialBirthDate)
    const [provider, setProvider] = useState(props.route.params.provider)
    const [providerUserId, setProviderUserId] = useState(props.route.params.providerUserId)

    const [apiErrorText, setApiErrorText] = useState('')
    const [selectedMount, setSelectedMount] = useState("0" + new Date().getMonth() + "")
    const [selectedDay, setSelectedDay] = useState("0" + new Date().getDay() + "")
    const [selectedYear, setSelectedYear] = useState("" + new Date().getFullYear() + "")
    const [days, setDays] = useState(array)
    const [years, setYears] = useState(array2)
    const [errorFName, setErrorFName] = useState(false)
    const [focusFName, setFocusFName] = useState(false)
    const [errorLName, setErrorLName] = useState(false)
    const [focusLName, setFocusLName] = useState(false)
    const [errorBDay, setErrorBDay] = useState(false)
    const [errorGender, setErrorGender] = useState(false)

    useEffect(() => {
        if (!fname) {
            setErrorFName(true)
            return;
        }
        if (!lname) {
            setErrorLName(true)
            return;
        }
        if (!bday) {
            setErrorBDay(true)
            return;
        }
        if (!gender) {
            setErrorGender(true)
            return;
        }
    }, [])


    const dismiseKey = () => {
        Keyboard.dismiss();
    };
    const nameInput = (val) => {
      setFname(val);
    };
    const lnameInput = (val) => {
      setLname(val);
    };

    
    const selectMount = (itemValue) => {
      setSelectedMount(itemValue)
      let count = new Date(selectedYear, itemValue, 0).getDate();
      
      var array = [];
      for (var i = 1; i <= count; i++) {
        if (i < 10) {
          array.push({ value: "" + "0" + i + "", text: "" + "0" + i + "" });
        } else {
          array.push({ value: "" + i + "", text: "" + i + "" });
        }
      }
      console.log(selectedYear)
      setDays(array)

      if (!selectedYear) {
        return;
      }
      if (!selectedDay) {
        return;
      }
      let birthDay = selectedYear + "-" + selectedMount + "-" + selectedDay;
      setBday(birthDay)
    };

    const selectDay = (itemValue) => {
      setSelectedDay(itemValue)

      if (!selectedYear) {
        return;
      }
      if (!selectedMount) {
        return;
      }
      let birthDay = selectedYear + "-" + selectedMount + "-" + selectedDay;
      setBday(birthDay)
    };
    const selectYear = (itemValue) => {
      setSelectedYear(itemValue)
      let count = new Date(itemValue, selectedMount, 0).getDate();
      var array = [];
      for (var i = 1; i <= count; i++) {
        if (i < 10) {
          array.push({ value: "" + "0" + i + "", text: "" + "0" + i + "" });
        } else {
          array.push({ value: "" + i + "", text: "" + i + "" });
        }
      }
      setDays(array)

      if (!selectedDay) {
        return;
      }
      if (!selectedMount) {
        return;
      }
      let birthDay = selectedYear + "-" + selectedMount + "-" + selectedDay;
      setBday(birthDay)
    };
    const selectMale = () => {
      setGender('male')
    };
    const selectFemale = () => {
        setGender('female')
    };

    const register = async () => {
        if (!fname) {
            setErrorFName(true)
            return;
        }
        if (!lname) {
            setErrorLName(true)
            return;
        }
        if (!bday) {
            setErrorBDay(true)
            return;
        }
        if (!gender) {
            setErrorGender(true)
            return;
        }
        const data = {
            provider: provider,
            providerUserId: providerUserId,
            email: email,
            device: {
                deviceId: "string",
                deviceType: 1,
                model: "string",
                os: "string",
                ip: "string",
                appVersion: "string"
            },
            firstName: fname,
            lastName: lname,
            gender: gender,
            birthDate: bday
        };
        console.log(data)
        try {
            await axios
                .post(`${API_URL}/api/Account/External/SignUp`, data)
                .then((response) => {
                    console.log('res-', response)
                    if (response.data.accepted == false) {
                        setApiErrorText(response.data.errorMessages[0])
                    } else if (response.data.accepted == true) {

                        setApiErrorText('')
                    } else {
                        setApiErrorText("Something went wrong. Please try again.")
                    }
                })
                .catch((error) => {
                    console.log(error)
                    setApiErrorText("Something went wrong. Please try again.")
                })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <ImageBackground
            style={{

                flex: 1
            }}
            resizeMode={"cover"}
            imageStyle={{
                resizeMode: 'cover',
                position: 'absolute',
                bottom: '-15%',
            }}
            source={require('../../../assets/images/backgrounds/forgotpass-back.png')}
        >
        <TouchableWithoutFeedback onPress={dismiseKey}>
            <View style={style.container}>
                {/* <ActivityIndicator
                style={style.loader}
                animating={load}
                textContent="Loading..."
                size="small"
                color="#ffffff"
                /> */}
                <View style={style.form}>
                <Text style={style.title}>You must fill the missing fields</Text>
                <Text style={style.title}>{email}</Text>
                <View style={style.formGroup}>
                    {focusFName && (
                        <Image
                            style={style.focusBlured}
                            source={require('../../../assets/images/backgrounds/focus-blured.png')}
                        />
                    )}
                    {errorFName && (
                        <Image
                            style={style.errorBlured}
                            source={require('../../../assets/images/backgrounds/error-blured.png')}
                        /> 
                    )}
                    <TextInput
                        style={style.input}
                        placeholder="First Name"
                        placeholderTextColor="#A4AEB4"
                        onChangeText={nameInput}
                        value={fname}
                        onFocus={() => {setFocusFName(true);setErrorFName(false)}}
                        onBlur={() => {setFocusFName(false)}}
                    />
                    {errorFName && (
                        <Text style={style.errorText}>Full name is required field</Text>
                    )}
                </View>
                <View style={style.formGroup}>
                    {focusLName && (
                        <Image
                            style={style.focusBlured}
                            source={require('../../../assets/images/backgrounds/focus-blured.png')}
                        />
                    )}
                    {errorLName && (
                        <Image
                            style={style.errorBlured}
                            source={require('../../../assets/images/backgrounds/error-blured.png')}
                        /> 
                    )}
                    <TextInput
                        style={style.input}
                        placeholder="Last Name"
                        placeholderTextColor="#A4AEB4"
                        onChangeText={lnameInput}
                        value={lname}
                        onFocus={() => {setFocusLName(true);setErrorLName(false)}}
                        onBlur={() => {setFocusLName(false)}}
                    />
                    {errorLName && (
                        <Text style={style.errorText}>Last name is required field</Text>
                    )}
                </View>
                <View style={style.datepicker}>
                            <Text style={style.genderTitle}>Date of Birth</Text>
                    <View style={style.cols}>
                    <Image
                        style={style.focusBlured}
                        source={
                            require('../../../assets/images/backgrounds/focus-blured.png')
                        }
                    />

                    <View style={style.mounth}>
                        <Picker
                        style={{
                            position: 'absoulte',
                            width: windowWidth / 3,
                            height: 30,
                            left: 0,
                            top: 0,
                        }}
                        itemStyle={{height: 110, fontSize: 14,top: -40, color: '#A4AEB4'}}
                        selectedValue={selectedMount}
                        onValueChange={selectMount}
                        >
                        {mounths.map(function(mounth){
                                    return (
                                        <Picker.Item key={mounth.value} label={mounth.text} value={mounth.value}/>
                                    )
                        })} 
                        
                        </Picker>{}
                    </View>
                    <View style={style.mounth}>
                        <Picker
                        style={{
                            position: 'absoulte',
                            width: windowWidth / 3,
                            height: 30,
                            left: 0,
                            top: 0,
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderColor: '#A4AEB4'
                        }}
                        itemStyle={{height: 110, fontSize: 14,top: -40, color: '#A4AEB4'}}
                        selectedValue={selectedDay}
                        onValueChange={selectDay}
                        >
                        {days.map(function(day){
                                    return (
                                        <Picker.Item key={day.value} label={day.text} value={day.value}/>
                                    )
                        })} 
                        
                        </Picker>{}
                    </View>
                    <View style={style.day}>
                        <Picker
                        style={{
                            position: 'absoulte',
                            width: windowWidth / 3,
                            height: 30,
                            left: 0,
                            top: 0,
                        }}
                        itemStyle={{height: 110, fontSize: 14,top: -40, color: '#A4AEB4'}}
                        selectedValue={selectedYear}
                        onValueChange={selectYear}
                        >
                        {years.map(function(year){
                                    return (
                                        <Picker.Item key={year.value} label={year.text} value={year.value}/>
                                    )
                        })} 
                        
                        </Picker>{}
                    </View>
                    
                    </View>
                    {errorBDay && (
                        <Text style={style.errorText}>Date of Bith is required field</Text>
                    )}
                    {/* <text v-if="errorBDay" class="error-text">Date of Bith is required field</text> */}
                </View>
                <View style={style.gender}>
                    <Text style={style.genderTitle}>Gender</Text>
                    <TouchableWithoutFeedback onPress={selectMale}>
                    <View style={style.male}
                        style={{
                        width: '100%',
                        borderColor: '#a4aeb467',
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        paddingTop: windowHeight / 50,
                        paddingBottom: windowHeight / 50
                        }}
                    >
                        {gender === 'male' && (
                            <Image
                                style={style.focusBlured}
                                source={require('../../../assets/images/backgrounds/focus-blured.png')}
                            />
                        )}
                        <Text style={style.genderText}>Male</Text>
                        {gender === 'male' && (
                            <Image
                                style={style.doneBlured}
                                source={require('../../../assets/images/icons/gender-done.png')}
                            />
                        )}
                    </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={style.female} onPress={selectFemale}>
                    <View
                        style={style.female}
                        style={{
                        width: '100%',
                        borderColor: '#a4aeb467',
                        borderBottomWidth: 1,
                        paddingTop: windowHeight / 50,
                        paddingBottom: windowHeight / 50
                        }}
                    >
                        {gender === 'female' && (
                            <Image
                                style={style.focusBlured}
                                source={require('../../../assets/images/backgrounds/focus-blured.png')}
                            />
                        )}
                        <Text style={style.genderText}>Female</Text>
                        {gender === 'female' && (
                            <Image
                                style={style.doneBlured}
                                source={require('../../../assets/images/icons/gender-done.png')}
                            />
                        )}
                    </View>
                    </TouchableWithoutFeedback>
                    {errorGender && (
                        <Text style={style.errorText}>Gender is required field</Text>
                    )}
                </View>
                <Text style={style.apierrorText}>{ apiErrorText }</Text>
                
                <PrimaryBtn text="Next" handlePress={register}/>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    )
}
