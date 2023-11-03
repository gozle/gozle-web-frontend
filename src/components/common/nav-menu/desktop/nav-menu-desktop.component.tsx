import React, {
  type MouseEvent,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import { TextPopUp } from '@/components/base';
import type { NavMenuItem } from 'lib/types';
import { AppThemeContext } from 'pages/_app';

import { NavExtraItems } from './extra-items';
import { NavMenuDesktopItem } from './item';
import { NavItemsListPopUp } from './items-list-pop-up';
import styles from './nav-menu-desktop.module.scss';

interface P {
  active?: NavMenuItem | null;
  className?: string;
  data: NavMenuItem[];
  getLink: (slug: string) => string;
}

export const NavMenuDesktop = ({
  active,
  className = '',
  data,
  getLink,
}: P) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [popup, setPopup] = useState<JSX.Element | null>(null);
  const theme = useContext(AppThemeContext);

  const activeIndex = useMemo(
    () => (active ? data.findIndex((el) => el.slug === active.slug) : -1),
    [data, active],
  );

  const handleShowMoreItemsMouseOut = (event: MouseEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget;
    if (relatedTarget && popupRef.current)
      if (!(relatedTarget as Element).closest('#' + popupRef.current.id))
        setPopup(null);
  };

  const handleTextPopUpClose = () => setPopup(null);

  const handleShowMoreItemsMouseEnter = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const index = event.currentTarget.getAttribute('data-index');
    if (index) {
      const content = (
        <NavItemsListPopUp
          data={data.slice(+index + 1).filter((el) => el.slug !== active?.slug)}
          getLink={getLink}
        />
      );
      setPopup(
        <TextPopUp
          ref={popupRef}
          targetRect={event.currentTarget.getBoundingClientRect()}
          position="bottom"
          visible={true}
          onMouseOut={handleShowMoreItemsMouseOut}
          handleClose={handleTextPopUpClose}
        >
          {content}
        </TextPopUp>,
      );
    }
  };

  return (
    <nav
      className={styles.nav + ' ' + className}
      style={{ backgroundColor: theme?.palette.background.pageBlock }}
    >
      <div className={styles.central_block}>
        <div className={styles.list}>
          {data.map((el, i) => {
            const extraItems =
              i < data.length - 1 ? (
                <NavExtraItems
                  active={
                    active && i < activeIndex
                      ? { ...active, href: getLink(active.slug) }
                      : undefined
                  }
                  className={styles.extra_items}
                  itemClassName={styles.item}
                  activeClassName={styles.active}
                  index={i}
                  onShowMoreItemsMouseEnter={handleShowMoreItemsMouseEnter}
                  onShowMoreItemsMouseOut={handleShowMoreItemsMouseOut}
                />
              ) : (
                <></>
              );
            return (
              <NavMenuDesktopItem
                key={el.slug}
                itemClassName={styles.item}
                activeClassName={styles.active}
                data={el}
                href={getLink(el.slug)}
                style={{ zIndex: i + 1 }}
                isActive={el.slug === active?.slug}
                extraItems={extraItems}
              />
            );
          })}
        </div>
        <NavExtraItems
          active={
            active ? { ...active, href: getLink(active.slug) } : undefined
          }
          itemClassName={styles.item}
          activeClassName={styles.active}
          index={-1}
          onShowMoreItemsMouseEnter={handleShowMoreItemsMouseEnter}
          onShowMoreItemsMouseOut={handleShowMoreItemsMouseOut}
        />
      </div>
      {popup}
    </nav>
  );
};

export default NavMenuDesktop;
