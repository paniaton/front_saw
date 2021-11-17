import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { useAuthService } from "app/auth/services/AuthService";

interface Props {
  toggleSidebar: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const StyledMenuItem = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
      fontWeight: "bold",
      color: theme.palette.primary.main,
      textAlign: "initial",
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export const Header = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const authService = useAuthService();
  const onOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <div
        className="flex flex-grow shadow-lg border-b-2 border-solid border-gray-100 bg-white"
        style={{ zIndex: 510 }}
      >
        <div className="flex flex-grow justify-between px-3 text-primary items-center h-16">
          <button
            className="lg:hidden mr-4"
            onClick={(e) => props.toggleSidebar(e)}
          >
            <MenuIcon />
          </button>

          <div className="flex gap-3 items-center ml-auto">
            <div
              className="text-primary-500 cursor-pointer"
              onClick={onOpenProfileMenu}
            >
              <AccountCircleIcon style={{ fontSize: 40 }} />
            </div>
          </div>
        </div>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          getContentAnchorEl={null}
        >
          <StyledMenuItem onClick={authService.logout}>
            <ListItemText primary="Logout" />
          </StyledMenuItem>
          <Link to="/auth/login">
            <StyledMenuItem onClick={authService.logout}>
              <ListItemText primary="Login" />
            </StyledMenuItem>
          </Link>
        </Menu>
      </div>
    </>
  );
};
