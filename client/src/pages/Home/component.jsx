import { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Button, Checkbox } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';

import TopSection from "./components/TopSection";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function HomePage() {
  const [tabValue, setTabValue] = useState(0);
  const [rowsCount, setRowsCount] = useState(10);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleRowsCountChange = (event) => {
	setRowsCount(event.target.value);
  };

  return (
    <div className="pb-home-page full-width">
      <TopSection fullName="John Smith" />
      <div className="pb-home-content-wrapper">
        <div className="pb-home-tabs-header">
          <div className="left-section">
            <Checkbox />
            <Button>
              <DeleteOutlinedIcon />
            </Button>
          </div>
          <div className="right-section">
            <Select
              labelId="rows-count"
              id="rows-count-select"
              value={rowsCount}
              label="Rows"
              onChange={handleRowsCountChange}
			  className="pb-home-rows-count"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </div>
        </div>
        <div className="pb-home-tabs-wrapper">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="basic tabs example"
			  className="pb-home-tab"
            >
              <Tab label="Active Shopping Lists" {...a11yProps(0)} />
              <Tab label="Previous Shopping Lists" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={tabValue} index={0}>
            Active Shopping Lists
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            Previous Shopping Lists
          </CustomTabPanel>
        </div>
      </div>
    </div>
  );
}
