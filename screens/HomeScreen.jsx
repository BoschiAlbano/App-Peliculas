import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    Text,
    View,
    Platform,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Bars3BottomLeftIcon,
    MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import Carrusel from '../components/carrusel';
import { styles } from '../theme';
import {
    fetchTopRatedMovies,
    fetchTrendingMovies,
    fetchUpcomingMovies,
} from '../api/moviedb';
import Lista from '../components/lista';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';

const ios = Platform.OS == 'ios';

const HomeScreen = () => {
    const [trending, setTrending] = useState([]);
    const [proximos, setProximos] = useState([]);
    const [topPelis, setTopPelis] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.results) setTrending(data.results);
        setLoading(false);
    };
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data.results) setProximos(data.results);
    };
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if (data && data.results) setTopPelis(data.results);
    };

    const navigatioon = useNavigation();

    return (
        <View className="flex-1 bg-neutral-800">
            <Text>Hola</Text>
            {/* Logo and Search */}
            <SafeAreaView className={`${ios ? '-mb-2' : 'mb-3'}`}>
                <StatusBar style="auto" />

                <View className={'flex-row justify-between items-center mx-4'}>
                    {/* Icono */}
                    <Bars3BottomLeftIcon
                        size={'30'}
                        strokeWidth={2}
                        color={'white'}
                    />
                    {/* Texto */}
                    <Text className="text-white text-3xl font-bold">
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    {/* Boton Lupa */}
                    <TouchableOpacity
                        onPress={() => navigatioon.navigate('Search')}
                    >
                        <MagnifyingGlassIcon
                            size={'30'}
                            strokeWidth={2}
                            color={'white'}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {loading ? (
                <Loading />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 10 }}
                >
                    {/* Carusel de imagenes */}
                    <Carrusel datos={trending} />

                    {/* Proximas pelis */}
                    <Lista
                        title="Lista de Peliculas"
                        data={proximos}
                        hideSeeAll={false}
                    />

                    {/* Top Lista de peliculas */}
                    <Lista
                        title="Top Mejores Peliculas"
                        data={topPelis}
                        hideSeeAll={false}
                    />
                </ScrollView>
            )}
        </View>
    );
};

export default HomeScreen;
