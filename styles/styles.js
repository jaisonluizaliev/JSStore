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
    maxWidth: '80%',
    margin: '0 auto',
    minHeight: '80vh',
  },
  center: {
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: 1,
  },
});

export default useStyles;
