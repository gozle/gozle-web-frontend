import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { pathToRegexp } from 'path-to-regexp';
import React from 'react';

type P = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps | 'children'
> &
  LinkProps & {
    children: React.ReactNode | ((isActive: boolean) => React.ReactNode);
    exact?: boolean;
    pattern?: string;
  };

export const NavLink = ({
  as,
  children,
  exact,
  href,
  pattern,
  ...props
}: P) => {
  const { asPath } = useRouter();

  const path = pattern || as || href;

  const isActive = pathToRegexp(
    typeof path === 'string' ? path.split('?')[0] : path.pathname!,
    [],
    {
      sensitive: true,
      end: !!exact,
    },
  ).test(asPath);

  // const child: ReactNode = React.Children.only<ReactElement>(children);
  // const className = (
  //   (child.props.className || '') +
  //   ' ' +
  //   (isActive ? activeClassName : '')
  // ).trim();

  return (
    <Link href={href} as={as} {...props}>
      {typeof children === 'function' ? children(isActive) : children}
    </Link>
  );
};
