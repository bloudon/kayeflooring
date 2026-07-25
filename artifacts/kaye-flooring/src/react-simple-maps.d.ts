declare module "react-simple-maps" {
  import type { ReactNode, CSSProperties, MouseEvent } from "react";

  interface ProjectionConfig {
    scale?: number;
    center?: [number, number];
    rotate?: [number, number, number];
  }

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: ProjectionConfig;
    viewBox?: string;
    style?: CSSProperties;
    className?: string;
    children?: ReactNode;
  }

  interface GeographyStyle {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    outline?: string;
    cursor?: string;
    transition?: string;
  }

  interface GeographyProps {
    geography: GeoFeature;
    style?: { default?: GeographyStyle; hover?: GeographyStyle; pressed?: GeographyStyle };
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    className?: string;
    onMouseEnter?: (e: MouseEvent) => void;
    onMouseLeave?: (e: MouseEvent) => void;
    onMouseMove?: (e: MouseEvent) => void;
    onClick?: (e: MouseEvent) => void;
    key?: string;
  }

  interface GeoFeature {
    rsmKey: string;
    id: string | number;
    properties: Record<string, unknown>;
    geometry: unknown;
  }

  interface GeographiesRenderProps {
    geographies: GeoFeature[];
  }

  interface GeographiesProps {
    geography: string | object;
    children: (props: GeographiesRenderProps) => ReactNode;
  }

  export function ComposableMap(props: ComposableMapProps): JSX.Element;
  export function Geographies(props: GeographiesProps): JSX.Element;
  export function Geography(props: GeographyProps): JSX.Element;
  export function ZoomableGroup(props: { center?: [number, number]; zoom?: number; children?: ReactNode }): JSX.Element;
  export function Annotation(props: { subject: [number, number]; dx?: number; dy?: number; children?: ReactNode }): JSX.Element;
  export function Marker(props: { coordinates: [number, number]; children?: ReactNode }): JSX.Element;
}
