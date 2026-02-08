import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { Colors } from "@/theme/Colors";

interface IconProps {
  size?: number;
  color?: string;
  style?: any;
}

export const BrandLogo: React.FC<IconProps> = ({ size = 32, style }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <Defs>
      <LinearGradient id="grad" x1="0" y1="0" x2="32" y2="32">
        <Stop offset="0" stopColor={Colors.primary} />
        <Stop offset="1" stopColor={Colors.primaryDark} />
      </LinearGradient>
    </Defs>
    <Circle cx="16" cy="16" r="16" fill="url(#grad)" />
    <Path
      d="M10 16L14 20L22 12"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const FireIcon: React.FC<IconProps> = ({
  size = 24,
  color = Colors.accent,
  style,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      fill={color}
      fillOpacity="0.1"
    />
    <Path
      d="M13.5 3.5C13.5 3.5 10.5 6.5 10.5 9.5C10.5 11.5 12 12 12 14.5C12 16.5 10.5 18 8.5 18C11 19.5 14.5 18.5 15.5 15.5C16.5 12.5 13.5 10.5 15.5 8C16.2 7.125 15.8 4.75 13.5 3.5Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const TrophyIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#F59E0B",
  style,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M8 21H16M12 17V21M17 17H7V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V17ZM17 17H19C20.1046 17 21 16.1046 21 15V10C21 8.89543 20.1046 8 19 8H17M7 17H5C3.89543 17 3 16.1046 3 15V10C3 8.89543 3.89543 8 5 8H7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ChartIcon: React.FC<IconProps> = ({
  size = 24,
  color = Colors.primary,
  style,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M18 20V10M12 20V4M6 20V14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CalendarEmptyIcon: React.FC<IconProps> = ({
  size = 64,
  color = Colors.textTertiary,
  style,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 2V6M8 2V6M3 10H21"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
