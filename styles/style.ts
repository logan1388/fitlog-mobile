// Copyright FitBook

import AsyncStorage from '@react-native-community/async-storage';
import Themes from './themes';
import { Colors } from './colors';

export enum ThemeName {
  LIGHT = 'light',
  DARK = 'dark',
}

export default class StyleManager {
  private static readonly CURRENT_THEME_KEY: string = 'fitbook.CURRENT_THEME';
  private CURRENT_THEME: ThemeName = ThemeName.LIGHT;

  public async setCurrentTheme(value: ThemeName) {
    this.CURRENT_THEME = value;
    await AsyncStorage.setItem(StyleManager.CURRENT_THEME_KEY, value);
  }

  public getCurrentTheme() {
    return this.CURRENT_THEME;
  }

  public async computeCurrentTheme() {
    const localStorageTheme = await AsyncStorage.getItem(StyleManager.CURRENT_THEME_KEY);

    switch (localStorageTheme) {
      case ThemeName.LIGHT:
        this.CURRENT_THEME = ThemeName.LIGHT;
        break;
      case ThemeName.DARK:
        this.CURRENT_THEME = ThemeName.DARK;
        break;
      default:
        this.CURRENT_THEME = ThemeName.LIGHT;
    }
  }

  public themed(key: string): Colors | undefined {
    return Themes[this.CURRENT_THEME].get(key);
  }
}

export const Style = new StyleManager();
