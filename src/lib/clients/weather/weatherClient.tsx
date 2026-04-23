type WeatherResponse = {
    location: {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        tz_id: string;
        localtime_epoch: number;
        localtime: string;
    },
    current: {
        last_updated_epoch: number;
        last_updated: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: {
            text: string;
            icon: string;
            code: number;
        }
    }
}

interface WeatherClientInterface {
    getWeather: (latitude: number, longitude: number) => Promise<WeatherResponse>;
}

export class WeatherClient implements WeatherClientInterface {
    private static readonly API_URL: string = "https://api.weatherapi.com/v1";
    private static readonly API_KEY: string = "9973075e92d54ce3a48131104251806";

    public readonly getWeather = async (latitude: number, longitude: number): Promise<WeatherResponse> => {
        const response = await fetch(`${WeatherClient.API_URL}/current.json?key=${WeatherClient.API_KEY}&q=${latitude},${longitude}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    };
};

interface WeatherApiHandlerInterface {
    getTemperatureC: () => number;
    getWeatherIcon: () => string;
};

export class WeatherApiHandler implements WeatherApiHandlerInterface {
    private readonly weatherResponse: WeatherResponse;

    constructor(private readonly _weatherResponse: WeatherResponse) {
        this.weatherResponse = _weatherResponse;
    }
    getTemperatureC = (): number => {
        return this.weatherResponse.current.temp_c;
    }

    getWeatherIcon = (): string => {
        return `https:${this.weatherResponse.current.condition.icon}`;
    };
};