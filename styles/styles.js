import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#e4edf9',
    display: 'flex',
    justifyContent: 'center',
    height: '75px',
    '& a': {
      color: '#000000',
      marginLeft: 10,
    },
  },
  main: {
    minHeight: '80vh',
  },
  center: {
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
  },
});

export default useStyles;
