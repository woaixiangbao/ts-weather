import commander from 'commander';
import colors from 'colors';

const command = commander
    .version("0.1.0")
    .option("-c, --city [name]", "add city name")
    .parse(process.argv);
   
    if (process.argv.slice(2).length === 0){
      command.outputHelp(colors.red);
      process.exit();
    }
    console.log(command.city);
