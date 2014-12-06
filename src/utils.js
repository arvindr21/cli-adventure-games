var inquirer = require("inquirer");
var fs = require('fs');
var chalk = require('chalk');

module.exports = {
  parser: function(gsPath) {
    return JSON.parse(fs.readFileSync(gsPath, 'utf-8'));
  },
  colors: {
    red: chalk.red,
    boldred: chalk.bold.red,
    green: chalk.green,
    bgWhite: chalk.black.bgWhite,
    blue: chalk.blue,
    magenta: chalk.magenta,
    cyan: chalk.cyan
  },
  tableChars: {
    'top': '═',
    'top-mid': '╤',
    'top-left': '╔',
    'top-right': '╗',
    'bottom': '═',
    'bottom-mid': '╧',
    'bottom-left': '╚',
    'bottom-right': '╝',
    'left': '║',
    'left-mid': '╟',
    'mid': '─',
    'mid-mid': '┼',
    'right': '║',
    'right-mid': '╢',
    'middle': '│'
  }
};
