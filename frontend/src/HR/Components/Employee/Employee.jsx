import styles from './Employee.module.css'

import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Calender from '../Calender/Calender'
import { List } from '@mui/icons-material'

import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'
import SendIcon from '@mui/icons-material/Send'
import ListItemIcon from '@mui/material/ListItemIcon'
import image from './../../../Images/man.png'
// import { createUser } from '../../Actions/userAction'
const Employee = ({ header }) => {
	const [formValid, setFormValid] = useState(true)
	// const notification = useSelector(state => state.customer.notification)
	const [formSubmit, setFormSubmit] = useState(false)
	const dispatch = useDispatch()
	// Initial state for inputs
	const initialInputsState = {
		name: { value: '', isValid: true },
		expansePermission: { value: 'no', isValid: true },
		expanseEditPermission: { value: 'no', isValid: true },
		expanseDeletePermission: { value: 'no', isValid: true },
		receiptPermission: { value: 'no', isValid: true },
		receiptEditPermission: { value: 'no', isValid: true },
		receiptDeletePermission: { value: 'no', isValid: true },
		advancePermission: { value: 'no', isValid: true },
		advanceEditPermission: { value: 'no', isValid: true },
		advanceDeletePermission: { value: 'no', isValid: true },
		loanPermission: { value: 'no', isValid: true },
		loanEditPermission: { value: 'no', isValid: true },
		loanDeletePermission: { value: 'no', isValid: true },
		pp: { value: 'no', isValid: true },
		epp: { value: 'no', isValid: true },
		cp: { value: 'no', isValid: true }
	}

	// State for inputs
	const [inputs, setInputs] = useState(initialInputsState)

	useEffect(() => {
		setFormValid(
			inputs.receiptPermission.isValid &&
				inputs.receiptEditPermission.isValid &&
				inputs.receiptDeletePermission.isValid &&
				inputs.expanseDeletePermission.isValid &&
				inputs.expanseEditPermission.isValid &&
				inputs.expansePermission.isValid &&
				inputs.advanceDeletePermission.isValid &&
				inputs.advanceEditPermission.isValid &&
				inputs.advancePermission.isValid &&
				inputs.loanDeletePermission.isValid &&
				inputs.loanEditPermission.isValid &&
				inputs.loanPermission.isValid &&
				inputs.cp.isValid &&
				inputs.pp.isValid &&
				inputs.epp.isValid &&
				inputs.name.isValid
		)

		return () => {}
	}, [inputs])

	const inputTextChangeHandler = (inputType, enteredValue) => {
		setInputs(currentInputValue => {
			return {
				...currentInputValue,
				[inputType]: { value: enteredValue, isValid: true }
			}
		})
	}
	// if (notification) {
	// 	setTimeout(function () {
	// 		window.location.reload()
	// 	}, 1000)
	// }
	const submitHandler = () => {
		const data = {
			name: inputs.name.value,
			expansePermission: inputs.expansePermission.value,
			expanseEditPermission: inputs.expanseEditPermission.value,
			expanseDeletePermission: inputs.expanseDeletePermission.value,
			receiptPermission: inputs.receiptPermission.value,
			receiptDeletePermission: inputs.receiptDeletePermission.value,
			receiptEditPermission: inputs.receiptEditPermission.value,
			advancePermission: inputs.advancePermission.value,
			advanceDeletePermission: inputs.advanceDeletePermission.value,
			advanceEditPermission: inputs.advanceEditPermission.value,
			loanPermission: inputs.loanPermission.value,
			loanDeletePermission: inputs.loanDeletePermission.value,
			cp: inputs.cp.value,
			pp: inputs.pp.value,
			epp: inputs.epp.value,
			loanEditPermission: inputs.loanEditPermission.value
		}

		const nameValid = data.name?.trim().length > 0
		// const phoneValid =
		// 	data.phone?.trim().length > 9 && data.phone?.trim().length <= 10

		if (!nameValid) {
			setInputs(currentInputs => {
				return {
					...currentInputs,
					name: { value: currentInputs.name.value, isValid: nameValid }
				}
			})
			console.log(data)
			return
		}

		// dispatch(createUser(data))
		setFormSubmit(true)
		setInputs(initialInputsState)
	}

	// data table
	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'firstName', headerName: 'First name', width: 130 },
		{ field: 'lastName', headerName: 'Last name', width: 130 },
		{
			field: 'age',
			headerName: 'Age',
			type: 'number',
			width: 90
		},
		{
			field: 'fullName',
			headerName: 'Full name',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
			valueGetter: (value, row) =>
				`${row.firstName || ''} ${row.lastName || ''}`
		}
	]

	const rows = [
		{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
		{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
		{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
		{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
		{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
		{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
		{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
		{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
		{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
	]

	const [checked, setChecked] = React.useState([1])

	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value)
		const newChecked = [...checked]

		if (currentIndex === -1) {
			newChecked.push(value)
		} else {
			newChecked.splice(currentIndex, 1)
		}

		setChecked(newChecked)
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-6">
					<Calender />
				</div>
				<div className="col-12 col-md-6">
					<div className={`container ${styles.container} `}>
						<h2 className={styles.header}>Create an Employee</h2>
						{!formValid && (
							<div className="row ">
								<p
									className="text-warning text-capitalize  "
									style={{ fontSize: '2vh' }}>
									Invalid Data Please check!
								</p>
							</div>
						)}

						<form class="form">
							{/* forms row start */}
							<div class="form-row row">
								<div class="form-group col-12 col-md-6 mb-2">
									<input
										type="text"
										class="form-control"
										placeholder="Name"
										id="name"
										value={inputs.name.value}
										onChange={e =>
											inputTextChangeHandler('name', e.target.value)
										}
									/>
								</div>
							</div>
							<div class="form-row row">
								<div class="form-group col-12 col-md-6 mb-2">
									<select
										class="form-control"
										value={inputs.expansePermission.value}
										onChange={e =>
											inputTextChangeHandler(
												'expansePermission',
												e.target.value
											)
										}
										id="inputGroupSelect01">
										<option selected value="no">
											Gender
										</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
									</select>
								</div>
								<div class="form-group col-12 col-md-6 mb-2">
									<input
										type="number"
										class="form-control"
										placeholder="Contact No"
										id="name"
										value={inputs.name.value}
										onChange={e =>
											inputTextChangeHandler('name', e.target.value)
										}
									/>
								</div>
							</div>
							<div class="form-row row">
								<div class="form-group col-12 col-md-6 mb-2">
									<input
										type="text"
										class="form-control"
										placeholder="Address"
										id="name"
										value={inputs.name.value}
										onChange={e =>
											inputTextChangeHandler('name', e.target.value)
										}
									/>
								</div>
								<div class="form-group col-12 col-md-6 mb-2">
									<input
										type="number"
										class="form-control"
										placeholder="Salary"
										id="name"
										value={inputs.name.value}
										onChange={e =>
											inputTextChangeHandler('name', e.target.value)
										}
									/>
								</div>
							</div>
							<div class="form-row row">
								<div class="col-md-2 col-sm-6 my-1">
									<div class="form-group">
										<button
											type="button"
											className="btn btn-primary d-block"
											onClick={submitHandler}>
											Submit
										</button>
									</div>
								</div>
							</div>
							)
						</form>
					</div>
				</div>
			</div>

			<div className="row my-4">
				<div className="col-12">
					<div
						style={{
							height: 400,
							width: '100%',
							backgroundColor: 'white',
							margin: 'auto'
						}}>
						<DataGrid
							rows={rows}
							columns={columns}
							initialState={{
								pagination: {
									paginationModel: { page: 0, pageSize: 5 }
								}
							}}
							pageSizeOptions={[5, 10]}
							checkboxSelection
							sx={{
								'& .MuiDataGrid-root': {
									color: 'white', // Change font color of the grid content
									border: '2px solid black' // Change border style of the grid
								},
								'& .MuiDataGrid-columnsContainer': {
									backgroundColor: 'black',

									borderBottom: '20px solid black', // Change border style of the column headers
									color: 'white' // Change font color of the column headers
								},
								'& .MuiDataGrid-row': {
									borderBottom: '1px solid #ccc' // Change border style of the rows
								},
								'& .MuiDataGrid-cell': {
									color: 'black' // Change font color of the cells
								}
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Employee
