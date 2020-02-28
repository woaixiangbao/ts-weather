import commander from 'commander';
import colors from 'colors';
import axios from 'axios';

const command = commander
    .version("0.1.0")
    .option("-c, --city [name]", "add city name")
    .parse(process.argv);

    if (process.argv.slice(2).length === 0){
      command.outputHelp(colors.red);
      process.exit();
    }

interface IWeatherResponse {
  status: string;
  count: string;
  info: string;
  infocode: string;
  lives: ILive[];
}

interface ILive{
  province: string;
  city: string;
  adcode: string;
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
  reporttime: string;
}

const URL = 'http://restapi.amap.com/v3/weather/weatherInfo?key=';
const KEY = '1bb1bc76cda9d611e343175eea597662';
const url = `${URL}${KEY}&city=${encodeURI(command.city)}`
const log = console.log;

async function getWeather(city: string) {
  try {
    const response = await axios.get(url);
    const live = response.data.lives[0];
    log(colors.yellow(live.reporttime));
    log(colors.white(`${live.province} ${live.city}`));
    log(colors.green(`${live.weather} ${live.temperature} 度`))
  } catch {
    log(colors.red('天气服务出现异常'))
  }
};

getWeather(command.city);
