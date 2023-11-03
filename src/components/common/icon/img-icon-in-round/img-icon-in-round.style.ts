import variables from './img-icon-in-round.module.scss';

export const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '2em',
  height: '2em',
  minWidth: '2em',
  width: '2em',
  borderRadius: '50%',
  boxShadow: variables.boxShadow,
  backgroundColor: 'white',
  overflow: 'hidden',
};

export const innerContainerStyle: React.CSSProperties = {
  position: 'relative',
  height: '100%',
  width: '100%',
  overflow: 'hidden',
};
