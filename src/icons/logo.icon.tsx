import React from 'react';

interface P {
  fill?: string;
  height: number;
}

export const LogoIcon = ({ fill, height }: P) => (
  <svg
    viewBox="0 0 98 34"
    height={height}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16.2036 26.8075C10.3714 26.8075 5.64369 22.0798 5.64369 16.2476C5.64369 10.4155 10.3714 5.68773 16.2036 5.68773C20.8098 5.68773 24.7237 8.6364 26.1681 12.7494L32.3473 14.7909C31.6322 6.50329 24.6779 0 16.2036 0C7.25366 0 0 7.25542 0 16.2036C0 25.1535 7.25542 32.4089 16.2036 32.4089C23.5911 32.4089 29.8249 27.4646 31.7748 20.7041L26.4183 18.9338C25.2293 23.4643 21.1075 26.8075 16.2036 26.8075Z" />
    <path d="M40.6849 21.5152L22.5583 15.5265L20.7404 21.029L38.8669 27.0177L40.6849 21.5152Z" />
    <path d="M50.2841 27.2876C48.7947 27.2876 47.5067 26.9712 46.4201 26.3384C45.3398 25.6992 44.5057 24.8107 43.9176 23.6729C43.3295 22.5288 43.0355 21.2024 43.0355 19.6939C43.0355 18.1726 43.3295 16.843 43.9176 15.7053C44.5057 14.5611 45.3398 13.6726 46.4201 13.0398C47.5067 12.4006 48.7947 12.081 50.2841 12.081C51.7734 12.081 53.0582 12.4006 54.1385 13.0398C55.2251 13.6726 56.0625 14.5611 56.6506 15.7053C57.2386 16.843 57.5327 18.1726 57.5327 19.6939C57.5327 21.2024 57.2386 22.5288 56.6506 23.6729C56.0625 24.8107 55.2251 25.6992 54.1385 26.3384C53.0582 26.9712 51.7734 27.2876 50.2841 27.2876ZM50.3033 24.1236C50.9808 24.1236 51.5465 23.9318 52.0004 23.5483C52.4542 23.1584 52.7962 22.6278 53.0263 21.9567C53.2628 21.2855 53.381 20.5217 53.381 19.6651C53.381 18.8086 53.2628 18.0447 53.0263 17.3736C52.7962 16.7024 52.4542 16.1719 52.0004 15.782C51.5465 15.392 50.9808 15.1971 50.3033 15.1971C49.6193 15.1971 49.044 15.392 48.5774 15.782C48.1172 16.1719 47.7688 16.7024 47.5323 17.3736C47.3022 18.0447 47.1871 18.8086 47.1871 19.6651C47.1871 20.5217 47.3022 21.2855 47.5323 21.9567C47.7688 22.6278 48.1172 23.1584 48.5774 23.5483C49.044 23.9318 49.6193 24.1236 50.3033 24.1236ZM47.3597 10.2592C46.81 10.2592 46.337 10.0675 45.9407 9.68395C45.5444 9.29403 45.3462 8.83381 45.3462 8.30327C45.3462 7.75994 45.5444 7.29972 45.9407 6.92258C46.337 6.54545 46.81 6.35689 47.3597 6.35689C47.9158 6.35689 48.3857 6.54545 48.7692 6.92258C49.1591 7.29972 49.354 7.75994 49.354 8.30327C49.354 8.83381 49.1591 9.29403 48.7692 9.68395C48.3857 10.0675 47.9158 10.2592 47.3597 10.2592ZM53.2276 10.2592C52.6779 10.2592 52.2049 10.0675 51.8086 9.68395C51.4123 9.29403 51.2141 8.83381 51.2141 8.30327C51.2141 7.75994 51.4123 7.29972 51.8086 6.92258C52.2049 6.54545 52.6779 6.35689 53.2276 6.35689C53.7837 6.35689 54.2536 6.54545 54.6371 6.92258C55.027 7.29972 55.2219 7.75994 55.2219 8.30327C55.2219 8.83381 55.027 9.29403 54.6371 9.68395C54.2536 10.0675 53.7837 10.2592 53.2276 10.2592ZM60.1119 27V24.5646L67.3221 15.6381V15.5327H60.3612V12.2727H72.2408V14.9286L65.4716 23.6346V23.7401H72.4901V27H60.1119ZM79.6979 7.36364V27H75.6134V7.36364H79.6979ZM89.6815 27.2876C88.1665 27.2876 86.8626 26.9808 85.7695 26.3672C84.6829 25.7472 83.8455 24.8714 83.2575 23.7401C82.6694 22.6023 82.3754 21.2567 82.3754 19.7035C82.3754 18.1886 82.6694 16.859 83.2575 15.7148C83.8455 14.5707 84.6733 13.679 85.7408 13.0398C86.8146 12.4006 88.0739 12.081 89.5185 12.081C90.4901 12.081 91.3945 12.2376 92.2319 12.5508C93.0756 12.8576 93.8107 13.321 94.4371 13.9411C95.07 14.5611 95.5621 15.3409 95.9137 16.2805C96.2653 17.2138 96.4411 18.3068 96.4411 19.5597V20.6815H84.0053V18.1502H92.5962C92.5962 17.5621 92.4684 17.0412 92.2127 16.5874C91.957 16.1335 91.6023 15.7788 91.1484 15.5231C90.701 15.261 90.18 15.13 89.5856 15.13C88.9656 15.13 88.4158 15.2738 87.9364 15.5614C87.4634 15.8427 87.0927 16.223 86.8242 16.7024C86.5558 17.1754 86.4183 17.7028 86.4119 18.2844V20.6911C86.4119 21.4197 86.5462 22.0494 86.8146 22.5799C87.0895 23.1104 87.4762 23.5195 87.9748 23.8072C88.4734 24.0948 89.0646 24.2386 89.7486 24.2386C90.2024 24.2386 90.6179 24.1747 90.995 24.0469C91.3722 23.919 91.695 23.7273 91.9634 23.4716C92.2319 23.2159 92.4364 22.9027 92.5771 22.532L96.3548 22.7812C96.163 23.6889 95.7699 24.4815 95.1754 25.1591C94.5874 25.8303 93.8267 26.3544 92.8935 26.7315C91.9666 27.1023 90.896 27.2876 89.6815 27.2876Z" />
  </svg>
);
