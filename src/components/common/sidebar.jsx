import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import logo from '../../assets/images/logo.webp';
import "../../assets/styles/styles.scss";
import { 
  MdOutlineArticle, 
  MdOutlineContactSupport, 
  MdHome, 
  MdViewCarousel,
  MdVideocam, // Banner Video
  MdViewStream, // Scrolling Highlights
  MdInfoOutline, // About
  MdWorkOutline, // What We Do
  MdSchema, // How We Work
  MdInsights, // The Impact / Impact
  MdCollections, // Highlights Slider
  MdLibraryBooks, // Our Library
  MdImage, // Banner (About Us)
  MdLinearScale, // Steps
  MdBarChart, // Stats
  MdHandshake, // Implemented By
  MdPaid, // Funded By
  MdFactCheck, // Facts and Figures
  MdQuestionAnswer, // Why AYA Matters
  MdQuickreply, // Our Answer
  MdHealthAndSafety, // Key Health Priorities
  MdRoute, // Our Approach
  MdTrackChanges, // Aims to Achieve
  MdViewModule, // Modular Approach
  MdPictureAsPdf, // Brochure
  MdManageSearch,
  MdWebAsset // Footer
} from "react-icons/md";
import { RiContactsBook3Line } from "react-icons/ri";
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check if path is active (strict match for child items)
  const isActive = (item) => {
    if (location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)) {
        return true;
    }
    if (item.relatedPaths && item.relatedPaths.some(path => location.pathname === path || location.pathname.startsWith(path))) {
        return true;
    }
    return false;
  };

  // Helper to check if parent menu should be open (looser match for group)
  const isGroupActive = (item) => {
      if (!item.children || item.children.length === 0) return false;
      
      // Check if any child is active using the new isActive logic
      return item.children.some(child => isActive(child));
  };

  // Define menuItems before state to use in lazy initialization
  const menuItems = [
      {
          text: 'Home',
          icon: <MdHome size={24} />,
          children: [
              {
                  text: 'Banner',
                  path: '/home/banner',
                  icon: <MdViewCarousel size={20} />,
                  relatedPaths: ['/home/create-banner']
              },
              {
                  text: 'Banner Video',
                  path: '/home/banner-video',
                  icon: <MdVideocam size={20} />,
                  relatedPaths: ['/home/create-banner-video']
              },
              {
                  text: 'Scrolling Highlights',
                  path: '/home/scrolling-highlights',
                  icon: <MdViewStream size={20} />,
                  relatedPaths: ['/home/create-scrolling-highlights']
              },
              {
                  text: 'About',
                  path: '/home/about',
                  icon: <MdInfoOutline size={20} />,
                  relatedPaths: ['/home/create-about']
              },
              {
                  text: 'What We Do',
                  path: '/home/what-we-do',
                  icon: <MdWorkOutline size={20} />,
                  relatedPaths: ['/home/create-what-we-do']
              },
              {
                  text: 'How We Work',
                  path: '/home/how-we-work',
                  icon: <MdSchema size={20} />,
                  relatedPaths: ['/home/create-how-we-work']
              },
              {
                  text: 'Levels',
                  path: '/home/levels',
                  icon: <MdOutlineArticle size={20} />,
                  relatedPaths: ['/home/create-levels']
              },
              {
                  text: 'The Impact',
                  path: '/home/the-impact',
                  icon: <MdInsights size={20} />,
                  relatedPaths: ['/home/create-the-impact']
              },
              {
                  text: 'Highlights Slider',
                  path: '/home/highlights-slider',
                  icon: <MdCollections size={20} />,
                  relatedPaths: ['/home/create-highlights-slider']
              },
              {
                  text: 'Our Library',
                  path: '/home/our-library',
                  icon: <MdLibraryBooks size={20} />,
                  relatedPaths: ['/home/create-our-library']
              },
              {
                  text: 'Modular Approach',
                  path: '/home/modular-approach',
                  icon: <MdViewModule size={20} />,
                  relatedPaths: ['/home/create-modular-approach']
              },
          ]
      },
      {
        text: 'About Us',
        icon: <MdInfoOutline size={24} />,
        children: [
            {
                text: 'Banner',
                path: '/about-us/banner',
                icon: <MdImage size={20} />,
                relatedPaths: ['/about-us/create-banner']
            },
            {
                text: 'Facts and Figures',
                path: '/about-us/facts-and-figures',
                icon: <MdFactCheck size={20} />,
                relatedPaths: ['/about-us/create-facts-and-figures']
            },
            {
                text: 'Why AYA Matters',
                path: '/about-us/why-aya-matters',
                icon: <MdQuestionAnswer size={20} />,
                relatedPaths: ['/about-us/create-why-aya-matters']
            },
            {
                text: 'Our Answer',
                path: '/about-us/our-answer',
                icon: <MdQuickreply size={20} />,
                relatedPaths: ['/about-us/create-our-answer']
            },
            {
                text: 'Key Health Priorities',
                path: '/about-us/key-health-priorities',
                icon: <MdHealthAndSafety size={20} />,
                relatedPaths: ['/about-us/create-key-health-priorities']
            },
            {
                text: 'Our Approach',
                path: '/about-us/our-approach',
                icon: <MdRoute size={20} />,
                relatedPaths: ['/about-us/create-our-approach']
            },
            {
                text: 'Aims to Achieve',
                path: '/about-us/aims-to-achieve',
                icon: <MdTrackChanges size={20} />,
                relatedPaths: ['/about-us/create-aims-to-achieve']
            },

        ]
      },
      {
          text: 'Our Impact',
          icon: <MdInsights size={24} />,
          children: [
              {
                  text: 'Impact',
                  path: '/our-impact/impact',
                  icon: <MdInsights size={20} />,
                  relatedPaths: ['/our-impact/create-impact']
              },
              {
                  text: 'Steps',
                  path: '/our-impact/steps',
                  icon: <MdLinearScale size={20} />,
                  relatedPaths: ['/our-impact/create-steps']
              },
              {
                  text: 'Stats',
                  path: '/our-impact/stats',
                  icon: <MdBarChart size={20} />,
                  relatedPaths: ['/our-impact/create-stats']
              },
              {
                  text: 'Implemented By',
                  path: '/our-impact/implemented-by',
                  icon: <MdHandshake size={20} />,
                  relatedPaths: ['/our-impact/create-implemented-by']
              },
              {
                  text: 'Funded By',
                  path: '/our-impact/funded-by',
                  icon: <MdPaid size={20} />,
                  relatedPaths: ['/our-impact/create-funded-by']
              },
              {
                  text: 'Supporting Partners',
                  path: '/our-impact/supporting-partners',
                  icon: <MdHandshake size={20} />,
                  relatedPaths: ['/our-impact/create-supporting-partners']
              }
          ]
      },
      {
          text: 'Brochure',
          icon: <MdPictureAsPdf size={24} />,
          path: '/brochures',
          relatedPaths: ['/create-brochure']
      },      
      {
        text: 'SEO',
        icon: <MdManageSearch size={24} />,
        path: '/seo',
        relatedPaths: ['/create-seo']
      },
      {
          text: 'Footer',
          icon: <MdWebAsset size={24} />,
          path: '/footer',
          relatedPaths: ['/create-footer']
      },
      {
          text: 'Contact',
          icon: <RiContactsBook3Line size={24} />,
          path: '/contact',
          relatedPaths: ['/create-contact']
      },
      {
          text: 'Enquiries',
          icon: <MdOutlineContactSupport size={24} />,
          path: '/enquiries'
      }
  ];

  const [open, setOpen] = React.useState(true);
  
  // Lazy initialization to set openSubmenu based on current URL immediately
  const [openSubmenu, setOpenSubmenu] = React.useState(() => {
    let initial = '';
    menuItems.forEach((item) => {
        if (item.children) {
            if (isGroupActive(item)) {
                initial = item.text;
            }
        }
    });
    return initial;
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };       
  
  const handleSubmenuClick = (text) => {
    if (!open) {
        setOpen(true);
    }
    setOpenSubmenu(openSubmenu === text ? '' : text);
  };

  // Sync state if location changes (e.g. back button)
  React.useEffect(() => {
    menuItems.forEach((item) => {
        if (item.children) {
            if (isGroupActive(item)) {
                setOpenSubmenu(item.text);
            }
        }
    });
  }, [location.pathname]);

  return (
    <Box sx={{ display: 'flex', marginRight: "15px"}}>
      <CssBaseline />      
      <Drawer 
        variant="permanent" open={open}
        PaperProps={{
            sx: {
                background: "#03683b"
            }
        }}
        className='sidebar-drawer'     
      >
        <DrawerHeader style={{minHeight: "133px", maxHeight: "133px"}}>
         {!open 
            ? 
              <IconButton
                color="#000"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[
                  {
                    marginRight: 0,
                  },
                  open && { display: 'none' },
                ]}
              >
                <MenuIcon sx={[ {color: "#fff"} ]}/>
              </IconButton> 
            : 
            <div 
              style={{width: "100%", textAlign: "center", cursor: "pointer", minHeight: "133px"}}
              onClick={() => navigate("/blogs")}
            >
                <img src={logo} alt='AYA' style={{padding: "10px"}} className='img-fluid mx-auto object-fit-contain'/>
            </div>}          
        </DrawerHeader>
        <Divider />       
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                  item.children ? {} : (isActive(item) ? { backgroundColor: 'rgba(255, 255, 255, 0.1)' } : {})
                ]}
                onClick={() =>{
                  if (item.children) {
                      handleSubmenuClick(item.text);
                  } else {
                      navigate(item.path);
                  }
                }}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                      color:"#fff"
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={[
                    open
                      ? {
                          opacity: 1,                          
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
                {item.children && open ? (openSubmenu === item.text ? <ExpandLess sx={{ color: '#fff' }} /> : <ExpandMore sx={{ color: '#fff' }} />) : null}
              </ListItemButton>
            </ListItem>
            {item.children && (
                <Collapse in={open && openSubmenu === item.text} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {item.children.map((child) => (
                            <ListItemButton
                                key={child.text}
                                sx={{ pl: 4, backgroundColor: isActive(child) ? 'rgba(255, 255, 255, 0.1)' : 'transparent' }}
                                onClick={() => navigate(child.path)}
                            >
                                <ListItemIcon sx={{ color: '#fff', minWidth: '40px' }}>
                                    {child.icon}
                                </ListItemIcon>
                                <ListItemText primary={child.text} sx={{ color: '#fff' }} />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>      
    </Box>
  );
}
