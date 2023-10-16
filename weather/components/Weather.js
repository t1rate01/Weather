import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';

const api = {
    url: process.env.EXPO_PUBLIC_API_URL,
    key: process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_ICONS_URL,
}

export default function Weather(props) {
    const [temperature, setTemperature] = useState(0);
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        const url = api.url + 'lat=' + props.latitude + '&lon=' + props.longitude + '&units=metric&appid=' + api.key;

        fetch(url)
            .then(res => res.json())
            .then((json) => {
                console.log(json);
                setTemperature(json.main.temp);
                setDescription(json.weather[0].description);
                setIcon(api.icons + json.weather[0].icon + '@2x.png');
            })
            .catch(error => {
                setDescription('Error retrieving weather.');
                console.log(error);
            })
    }, []);

    return (
        <View>
            <Text style={styles.temperature}>{temperature.toFixed(1)}</Text>
            {icon &&
             <Image source={{uri: icon}} style={{width: 100, height: 100}} />
            }
            <Text style={styles.description}>{description}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    temperature: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 20,
        marginBottom: 20,
    },
});

