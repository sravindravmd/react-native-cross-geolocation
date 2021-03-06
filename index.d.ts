declare module "react-native-cross-geolocation" {

  export type GeolocationReturnType = {
    coords: {
        latitude: number;
        longitude: number;
        altitude: number | null;
        accuracy: number;
        altitudeAccuracy: number | null;
        heading: number | null;
        speed: number | null;
    };
    timestamp: number;
  };

  export type GeolocationError = {
      code: number;
      message: string;
      PERMISSION_DENIED: number;
      POSITION_UNAVAILABLE: number;
      TIMEOUT: number;
  };

  type SuccessCb = (loc: GeolocationReturnType) => void
  type ErrorCb = (err: GeolocationError) => void

  export type LowAccuracyMode = {
    /**
     * Use this setting to request location precision to within a city block, which
     * is an accuracy of approximately 100 meters.
     * This is considered a coarse level of accuracy, and is likely to consume less power.
     * With this setting, the location services are likely to use WiFi and cell tower
     * positioning. Note, however, that the choice of location provider depends on many
     * other factors, such as which sources are available.
     */
    readonly BALANCED: number,
    /**
     * Use this setting to request city-level precision, which is an accuracy of
     * approximately 10 kilometers. This is considered a coarse level of accuracy,
     * and is likely to consume less power.
     */
    readonly LOW_POWER: number,
    /**
     * Use this setting if you need negligible impact on power consumption, but want
     * to receive location updates when available. With this setting, your app does
     * not trigger any location updates, but receives locations triggered by other apps.
     */
    readonly NO_POWER: number,
  }

  export type GeolocConfigAndroid = {
    /**
     * One of Geolocation.LowAccuracyMode
     * @default LowAccuracyMode.BALANCED
     */
    lowAccuracyMode?: number,
    /**
     * milliseconds
     * @default 10000
     */
    fastestInterval?: number,
    /**
     * milliseconds
     * @default 5000
     */
    updateInterval?: number,
  }

  export type GeolocConfigIOS = {
    skipPermissionRequests: boolean;
  }

  export type GeolocOptions = {
    /**
     * Milliseconds.
     * @default MAX_VALUE
     */
    timeout?: number,
    /**
     * Milliseconds.
     * @default INFINITY
     */
    maximumAge?: number,
    /**
     * Use this setting to request the most precise location possible.
     * With this setting, the location services are more likely to use GPS to determine
     * the location.
     *
     * On Android, if the location is cached this can return almost immediately, or it
     * will request an update which might take a while.
     *
     * @default false
     */
    enableHighAccuracy?: boolean,
  }

  export interface GeolocWatcherOptions extends GeolocOptions {
    /**
     * Meters
     * @default 100.0
     */
    distanceFilter?: number,
    /**
     *
     */
    useSignificantChanges?: boolean,
  }

  interface GeolocStatic {
    /**
     * Sets configuration options that will be used in all location requests.
     */
    setRNConfiguration(config: GeolocConfigAndroid | GeolocConfigIOS): void;
    /**
     * Request suitable Location permission based on the key configured on pList. If
     * NSLocationAlwaysUsageDescription is set, it will request Always authorization, although if
     * NSLocationWhenInUseUsageDescription is set, it will request InUse authorization.
     */
    requestAuthorization(): void;
    /**
     * Invokes the success callback once with the latest location info.
     */
    getCurrentPosition(success: SuccessCb, error?: ErrorCb, options?: GeolocOptions): void;
    /**
     * Invokes the success callback whenever the location changes. Returns a watchId (number).
     */
    watchPosition(success: SuccessCb, error?: ErrorCb, options?: GeolocWatcherOptions): number;
    /**
     * Clear a watcher.
     * @param watchID The ID received from `watchPosition`
     */
    clearWatch(watchID: number): void;
    /**
     * Stops observing for device location changes. In addition, it removes all listeners
     * previously registered.
     */
    stopObserving(): void;
  }

  const Geolocation: GeolocStatic;
  export default Geolocation;
}
