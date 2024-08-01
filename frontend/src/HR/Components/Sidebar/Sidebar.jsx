// Sidebar.js
import React, { useState } from 'react'
import styles from './Sidebar.module.css'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SendIcon from '@mui/icons-material/Send'
import { Dashboard, EmojiPeople } from '@mui/icons-material'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import ChecklistIcon from '@mui/icons-material/Checklist'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import AddIcon from '@mui/icons-material/Add'
import ListIcon from '@mui/icons-material/List'
import { Link } from 'react-router-dom'
const Sidebar = ({ toggleBtnClick }) => {
	const [open, setOpen] = useState(false)
	const [eopen, seteOpen] = useState(false)
	const [lopen, setlOpen] = useState(false)

	const handleClick = () => {
		setOpen(!open)
	}
	const employeesHandleClick = () => {
		seteOpen(!eopen)
	}
	const leaveHandleClick = () => {
		setlOpen(!lopen)
	}
	return (
		<div className={styles.sidebar}>
			<List className={styles.sidebarMenu}>
				<ListItemButton component={Link} to="/hr/dashboard">
					<ListItemIcon>
						<Dashboard />
					</ListItemIcon>
					<ListItemText primary="Dashboard" />
				</ListItemButton>

				<ListItemButton component={Link} to="/hr/employee">
					<ListItemIcon>
						<Diversity3Icon />
					</ListItemIcon>
					<ListItemText primary="Employees" />
				</ListItemButton>

				<ListItemButton>
					<ListItemIcon>
						<MonetizationOnOutlinedIcon />
					</ListItemIcon>
					<ListItemText primary="Salary" />
				</ListItemButton>
				<ListItemButton component={Link} to="/hr/attendance">
					<ListItemIcon>
						<ChecklistIcon />
					</ListItemIcon>
					<ListItemText primary="Attendance" />
				</ListItemButton>
				<ListItemButton onClick={leaveHandleClick}>
					<ListItemIcon>
						<ChecklistIcon />
					</ListItemIcon>
					<ListItemText primary="Leave" />
				</ListItemButton>
				<Collapse in={lopen} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton sx={{ pl: 4 }} component={Link} to="/hr/create">
							<ListItemIcon>
								<AddIcon />
							</ListItemIcon>
							<ListItemText primary="Create" />
						</ListItemButton>
						<ListItemButton sx={{ pl: 4 }} component={Link} to="/hr/list">
							<ListItemIcon>
								<ListIcon />
							</ListItemIcon>
							<ListItemText primary="list" />
						</ListItemButton>
					</List>
				</Collapse>
			</List>

			{/* Add more menu items as needed */}
		</div>
	)
}

export default Sidebar
