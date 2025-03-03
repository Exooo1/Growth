export interface ISettings {
    widthScreen: number
    heightScreen: number
    statusBarHeight: number
    setWHScreen: (width: number, height: number, statusBarHeight: number) => void
}
