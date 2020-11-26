import { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { alphavantage } from '../../axiosInstance';

interface AppbarProps {
  darkTheme: boolean;
  setDarkTheme: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appbar: {
      background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
        marginRight: theme.spacing(2),
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '14em',
      },
    },
    darkModeSwitch: {
      marginLeft: 'auto',
    },
  })
);

const THROTTLE_TIME: number = 400;

const Appbar: React.FC<AppbarProps> = ({ darkTheme, setDarkTheme }) => {
  const classes = useStyles();
  const router = useRouter();

  const [results, setResults] = useState([]);

  const searchStock = useCallback(
    debounce(
      (query: string) =>
        query !== '' &&
        alphavantage
          .get(`/query?function=SYMBOL_SEARCH&keywords=${query}`)
          .then(({ data }) => setResults(data.bestMatches)),
      THROTTLE_TIME
    ),
    []
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Stocks
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Autocomplete
              options={results}
              getOptionSelected={(option, value) =>
                option['2. name'] === value['2. name']
              }
              getOptionLabel={(option) => option['2. name'] || ''}
              autoHighlight
              onInputChange={(_, value) => searchStock(value)}
              fullWidth
              clearOnBlur
              noOptionsText={
                <Typography variant="subtitle1" color="textSecondary">
                  Start typing..
                </Typography>
              }
              onChange={(event, value, reason) => {
                if (reason === 'select-option' && value) {
                  // @ts-expect-error
                  router.push('/[company]', `/${value['1. symbol']}`);
                }
              }}
              filterOptions={(options) => options}
              renderOption={(option) => (
                <Box>
                  <Typography variant="h6">{option['1. symbol']}</Typography>
                  <Typography variant="overline">
                    {option['2. name']}
                  </Typography>
                </Box>
              )}
              renderInput={(params) => (
                <div ref={params.InputProps.ref} style={{ width: '100%' }}>
                  <InputBase
                    {...params.inputProps}
                    placeholder="Search for stocks.."
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  />
                </div>
              )}
            />
          </div>
          <FormControlLabel
            className={classes.darkModeSwitch}
            control={
              <Switch
                checked={darkTheme}
                onChange={setDarkTheme}
                color="default"
              />
            }
            label="Dark Mode"
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};

export default Appbar;
