import React, {
  type CSSProperties,
  forwardRef,
  type MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { AppThemeContext } from 'pages/_app';

import styles from './text-pop-up.module.scss';

type Position = 'top' | 'bottom' | 'left' | 'right';

interface P {
  children: React.ReactNode;
  handleClose?: () => void;
  onMouseOut?: (event: MouseEvent<HTMLDivElement>) => void;
  padSize?: number;
  position?: Position;
  targetRect: DOMRect;
  visible?: boolean;
}

export const TextPopUp = forwardRef<HTMLDivElement, P>(
  ({ handleClose, padSize = 20, targetRect, visible, ...props }, ref) => {
    const [style, setStyle] = useState<CSSProperties>({});
    const [triangleStyle, setTriangleStyle] = useState<CSSProperties>({});
    const innerRef = useRef<HTMLDivElement | null>(null);
    const theme = useContext(AppThemeContext);

    useEffect(() => {
      const newStyle: CSSProperties = {
        transform: 'none',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'unset' : 'none',
      };

      const setTopPositionStyles = (rect: DOMRect) => {
        const newTriangleStyle: CSSProperties = { bottom: 0 };

        const top = targetRect.y - 10 - rect.height;
        if (top < padSize) return;
        else {
          newStyle.top = top;
          if (targetRect.left + rect.width + padSize < window.innerWidth) {
            newStyle.left = targetRect.left;
            newTriangleStyle.transform = 'translate(-50%, 50%) rotate(45deg)';
            newTriangleStyle.left = targetRect.width / 2;
          } else if (targetRect.right - rect.width - padSize > 0) {
            newStyle.right = window.innerWidth - targetRect.right;
            newTriangleStyle.transform = 'translate(50%, 50%) rotate(45deg)';
            newTriangleStyle.right = targetRect.width / 2;
          } else return;
          setStyle(newStyle);
          setTriangleStyle(newTriangleStyle);
        }
      };

      const setBottomPositionStyles = (rect: DOMRect) => {
        const newTriangleStyle: CSSProperties = { top: 0 };

        const bottom =
          window.innerHeight - targetRect.bottom - 10 - rect.height;
        if (bottom < padSize) return;
        else {
          newStyle.bottom = bottom;
          if (targetRect.left + rect.width + padSize < window.innerWidth) {
            newStyle.left = targetRect.left;
            newTriangleStyle.transform = 'translate(-50%, -50%) rotate(45deg)';
            newTriangleStyle.left = targetRect.width / 2;
          } else if (targetRect.right - rect.width - padSize > 0) {
            newStyle.right = window.innerWidth - targetRect.right;
            newTriangleStyle.transform = 'translate(50%, -50%) rotate(45deg)';
            newTriangleStyle.right = targetRect.width / 2;
          } else return;
          setStyle(newStyle);
          setTriangleStyle(newTriangleStyle);
        }
      };

      const current = innerRef.current;
      if (current) {
        const rect = current.getBoundingClientRect();

        switch (props.position) {
          case 'top':
            setTopPositionStyles(rect);
            break;
          case 'bottom':
            setBottomPositionStyles(rect);
            break;
        }
      }
    }, [targetRect, padSize, props.position, visible]);

    useEffect(() => {
      if (handleClose) {
        const listener = handleClose;
        window.addEventListener('wheel', listener);
        return () => {
          window.removeEventListener('wheel', listener);
        };
      }
    }, [handleClose]);

    return (
      <div
        id="text-popup"
        tabIndex={0}
        className={
          styles.container +
          ` ${props.position ? styles[`${props.position}_after`] : ''}`
        }
        ref={(instance) => {
          if (ref) {
            if (typeof ref === 'function') ref(instance);
            else ref.current = instance;
          }
          innerRef.current = instance;
        }}
        style={
          {
            ...style,
            '--background': theme?.palette.background.pageBlock,
          } as React.CSSProperties
        }
        onMouseOut={props.onMouseOut}
      >
        {props.children}
        <div className={styles.triangle} style={triangleStyle} />
      </div>
    );
  },
);

TextPopUp.displayName = 'TextPopUp';
