import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { withStyles } from '@material-ui/core/styles';;


const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,

  },
  appbar: {
    color: "dimgrey",
    "background-color": "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.05),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  buttonSignup: {
    margin: '0px',
  },
  buttonLogin: {
    marginLeft: '10px',
  },
  line:{
    marginTop: '10px',
  },
  buttonContainer: {
    margin: '10px',
    marginBottom: '20px',
  },
  heading: {
    margin: '10px',
    paddingLeft: '0px',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [simpleMenuanchorEl, setsimpleMenuAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isSimpleMenuOpen = Boolean(simpleMenuanchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSimpleMenuClose = () => {
    setsimpleMenuAnchorEl(null);
  };

  const handleSimpleMenuOpen = event => {
    setsimpleMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const simpleMenuId = 'primary-search-account-menu';
  const renderSimpleMenu = (
    <Menu
      anchorEl={simpleMenuanchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id={simpleMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isSimpleMenuOpen}
      onClose={handleSimpleMenuClose}
    >
      <div className={classes.buttonContainer}>
      <MenuItem onClick={handleSimpleMenuClose}component={Link} to="/details">Details</MenuItem>
      <MenuItem onClick={handleSimpleMenuClose} component={Link} to="/navbar">My Account</MenuItem>
      <MenuItem onClick={handleSimpleMenuClose}component={Link} to="/navbar">Logout</MenuItem>
      </div>
      <div className={classes.line}>
      <hr />
      </div>
      <MenuItem onClick={handleSimpleMenuClose}>Orders</MenuItem>
      <MenuItem onClick={handleSimpleMenuClose}>Contact Us</MenuItem>
       
       
    </Menu>
  );

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Typography variant="subtitle1" className={classes.heading}> Welcome</Typography>
      <Typography variant="subtitle1" className={classes.heading}> To access account and manage orders</Typography>
      <div className={classes.buttonContainer}>
      <Button variant="outlined" color="primary" className={classes.buttonSignup} href="/signup"> Sign up  </Button>
      <Button variant="outlined" color="secondary" className={classes.buttonLogin} href="/login"> Login</Button>      
      </div>
      <div className={classes.line}>
      <hr />
      </div>
      <MenuItem onClick={handleMenuClose}>Orders</MenuItem>
      <Button href="/Contactus">Contact Us</Button>
    </Menu>
  );

  

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
        <IconButton
              edge="start"
              aria-label="open drawer"
              aria-controls={simpleMenuId}
              
              className={classes.menuButton}
              onClick={handleSimpleMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            
          <Typography className={classes.title} variant="h6" noWrap>
          <Link to='/' className="nav-link">
            Home
            </Link>
            </Typography>
            
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            
          </div>
            <div>
              
            </div>
          
          <div className={classes.grow} />
          <IconButton aria-label="cart">
              <Badge badgeContent={4} color="secondary">
              <Link to="/cart" >
               <ShoppingCartIcon />
           </Link>
              </Badge>
            </IconButton>
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
                      
            

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderSimpleMenu}
  
    </div>
  );
}

