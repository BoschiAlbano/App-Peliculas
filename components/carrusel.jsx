import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    View,
    Text,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');

const Carrusel = ({ datos = [] }) => {
    const navigation = useNavigation();

    const handleClick = (item) => {
        navigation.navigate('Movie', item);
    };

    return (
        <View>
            <Text className="text-white text-lg"> Populares </Text>
            <Carousel
                data={datos}
                renderItem={({ item }) => (
                    <Tarjeta item={item} handleClick={handleClick} />
                )}
                firstItem={1}
                inactiveSlideOpacity={0.6}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    );
};

export default Carrusel;

const Tarjeta = ({ item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                source={{ uri: image500(item.poster_path) }}
                style={{ width: width * 0.6, height: height * 0.4 }}
                className={'rounded-3xl'}
            />
        </TouchableWithoutFeedback>
    );
};
