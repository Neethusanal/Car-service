import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export const Adminsidebar = () => {
  return (
    <Card className="p-4 shadow-xl bg-black h-screen">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="white">
         Admin Panel
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5 text-white" />
          </ListItemPrefix>
          <Link to="/admin/dashboard" className="text-white"> Dashboard</Link>
        </ListItem>
         <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5  text-white" />
          </ListItemPrefix>
         <Link to="/admin/banner" className="text-white">  Banner</Link> 
        </ListItem> 
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5  text-white" />
          </ListItemPrefix>
         <Link to="/admin/brands" className="text-white"> Brand </Link>
          <ListItemSuffix>
            <Chip
              value=""
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5  text-white" />
          </ListItemPrefix>
         <Link to="/admin/customers" className="text-white"> Customers </Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5  text-white" />
          </ListItemPrefix>
         <Link to="/admin/mechanic" className="text-white"> Mechanic</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5  text-white" />
          </ListItemPrefix>
          <Link to="/admin/models" className="text-white"> Models</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5  text-white" />
          </ListItemPrefix>
          <Link to="/admin/services" className="text-white"> Services</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5  text-white" />
          </ListItemPrefix>
          <Link to="/admin/Servicelist" className="text-white"> Servicelist</Link>
        </ListItem>
      </List>
    </Card>
  );
};
