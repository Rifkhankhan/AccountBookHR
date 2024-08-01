import React, { useEffect, useState } from 'react'
import styles from './HRPage.module.css'
import Sidebar from './../../../HR/Components/Sidebar/Sidebar'
import ListItemIcon from '@mui/material/ListItemIcon'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Outlet } from 'react-router-dom'
const HRPage = () => {
	const [collapsed, setCollapsed] = useState(false)

	// useEffect(() => {
	// 	const handleResize = () => {
	// 		if (window.innerWidth <= 900) {
	// 			setCollapsed(true)
	// 		} else {
	// 			setCollapsed(false)
	// 		}
	// 	}

	// 	handleResize() // Check initial width
	// 	window.addEventListener('resize', handleResize)
	// 	return () => {
	// 		window.removeEventListener('resize', handleResize)
	// 	}
	// }, [])

	const toggleBtnClick = () => {
		setCollapsed(current => !current)
	}

	return (
		<div className={`${styles.container} ${collapsed ? styles.collapsed : ''}`}>
			<div className={styles.sidebar}>
				<Sidebar />
			</div>
			<div
				className={`${styles.toggleBtn} ${
					!collapsed ? styles.toggleCollapsed : ''
				}`}
				onClick={toggleBtnClick}>
				<ListItemIcon sx={{ margin: 'auto', width: '30px' }}>
					{collapsed ? (
						<FormatAlignRightIcon
							sx={{
								color: 'white',

								fontSize: '30px',
								'&:hover': { cursor: 'pointer' }
							}}
						/>
					) : (
						<ChevronLeftIcon
							sx={{
								color: 'black',

								fontSize: '30px',
								'&:hover': { cursor: 'pointer' }
							}}
						/>
					)}
				</ListItemIcon>
			</div>

			<div className={styles.content}>
				<Outlet /> {/* Render child routes here */}
			</div>
		</div>
	)
}

export default HRPage
