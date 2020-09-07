// Copyright FitBook

import { Colors } from './colors';

const Themes = {
  light: new Map<string, Colors>([
    ['labelText', Colors.GRAY],
    ['formValue', Colors.BLACK],
    ['activeLink', Colors.BLUE],
    ['textInputBorder', Colors.GRAY],
  ]),
  dark: new Map<string, Colors>([
    ['labelText', Colors.GRAY],
    ['formValue', Colors.WHITE],
    ['activeLink', Colors.BLUE],
    ['textInputBorder', Colors.GRAY],
  ]),
};

export default Themes;
