declare module "flubber" {
  export type Interpolator = (t: number) => string;
  export type Interpolators = (t: number) => string[];

  interface InterpolateOptions {
    maxSegmentLength?: number | false;
    string?: boolean;
    single?: boolean;
  }

  export function interpolate(from: string, to: string, options?: InterpolateOptions): Interpolator;
  export function separate(from: string, to: string[], options?: InterpolateOptions): any;
  export function combine(from: string[], to: string, options?: InterpolateOptions): any;
  export function interpolateAll(from: string[], to: string[], options?: InterpolateOptions): any;
  export function toPathString(ring: number[][]): string;
  export function splitPathString(path: string): string[];
}
