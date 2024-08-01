import React, { useEffect, useLayoutEffect, useState } from 'react'
import PieChart from '../../../Components/PieChart/PieChart'
import LineChart from '../../../Components/LineChart/LineChart'
import { useDispatch, useSelector } from 'react-redux'
import MyCalendar from '../Calender/Calender'
import { DataGrid } from '@mui/x-data-grid'

const Attendance = () => {
	const requestList = useSelector(
		state => state.accountRequest.accountRequests
	).filter(request => request.status === 1)

	const expanses = requestList
		?.filter(request => request.requestType === 'expense')
		.filter(request => request.status === 1)

	const receipts = requestList
		?.filter(request => request.requestType === 'receipt')
		.filter(request => request.status === 1)

	const currentUser = useSelector(state => state.auth.user)
	const isLoading = useSelector(state => state.accountRequest.isLoading)

	const [totalExpanses, setTotalExpanses] = useState(0)
	const [totalIncomes, setTotalIncomes] = useState(0)
	const [captitalAmount, setCapitalAmount] = useState(0)
	const [openingBalance, setOpeningBalance] = useState(0)
	const [balance, setBalance] = useState(0)
	const [gotLoan, setGotLoan] = useState(0)
	const [paidLoan, setPaidLoan] = useState(0)
	const [gotAdvance, setGotAdvance] = useState(0)
	const [paidAdvance, setPaidAdvance] = useState(0)
	const today = new Date()
	const formattedDate = today.toLocaleDateString('en-GB') // Format: dd/mm/yyyy
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

	const [chartHeight, setChartHeight] = useState(300) // Initial height, adjust as needed
	// Function to set the height of the charts
	const setChartHeights = () => {
		const windowHeight = window.innerHeight
		const newHeight = windowHeight * 0.4 // Adjust the multiplier as needed
		setChartHeight(newHeight)
	}

	// Update chart heights when component mounts or window resizes
	useEffect(() => {
		setChartHeights()
		window.addEventListener('resize', setChartHeights)
		return () => {
			window.removeEventListener('resize', setChartHeights)
		}
	}, [])

	useLayoutEffect(() => {
		getOpeningBalance(requestList)
		getTotalExpenseAmount(requestList)
		getTotalIncomeAmount(requestList)
		getTotalAdvanceAmount(requestList)
		getTotalLoanAmount(requestList)
		getBalance(requestList)
	}, [requestList])

	const getOpeningBalance = list => {
		const today = new Date()
		const yesterday = new Date(today)
		yesterday.setDate(today.getDate() - 1)
		const formattedYesterday = yesterday.toISOString().split('T')[0]

		// Filter list to get entries before yesterday
		const beforeYesterdayList = list.filter(li => {
			const currentDate = new Date(li.date).toISOString().split('T')[0]
			return currentDate <= formattedYesterday
		})

		const totalAmountBeforeYesterday = beforeYesterdayList.reduce(
			(total, current) => {
				if (
					current.requestForm === 'got' ||
					current.requestType === 'receipt'
				) {
					return total + parseFloat(current.amount)
				} else {
					return total - parseFloat(current.amount)
				}
			},
			0
		)

		setOpeningBalance(totalAmountBeforeYesterday)
	}

	const getBalance = list => {
		const today = new Date()
		const yesterday = new Date(today)
		yesterday.setDate(today.getDate() - 1)

		const totalAmountBeforeYesterday = list.reduce((total, current) => {
			if (current.requestForm === 'got' || current.requestType === 'receipt') {
				return total + parseFloat(current.amount)
			} else {
				return total - parseFloat(current.amount)
			}
		}, 0)

		setBalance(totalAmountBeforeYesterday)
	}
	const getTotalExpenseAmount = expanses => {
		// calculate total expenses

		const totalExpanses = expanses.reduce((total, current) => {
			if (current.requestForm === 'expense') {
				return total + +current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)
		setTotalExpanses(totalExpanses)
	}

	const getTotalIncomeAmount = incomes => {
		// calculate total expenses

		const totalIncomes = incomes.reduce((total, current) => {
			if (current.requestForm === 'cash') {
				return total + +current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		const totalCapital = incomes.reduce((total, current) => {
			if (current.requestForm === 'capital') {
				return total + +current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		setTotalIncomes(totalIncomes)
		setCapitalAmount(totalCapital)
	}

	const getTotalAdvanceAmount = advances => {
		// calculate total expenses

		const totalPaidAdvance = advances.reduce((total, current) => {
			if (current.requestForm === 'paid' && current.requestType === 'advance') {
				return total + +current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		const totalGotAdvance = advances.reduce((total, current) => {
			if (current.requestForm === 'got' && current.requestType === 'advance') {
				return total + +current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		setPaidAdvance(totalPaidAdvance)
		setGotAdvance(totalGotAdvance)
	}

	const getTotalLoanAmount = advances => {
		// calculate total expenses

		const totalPaidLoan = advances.reduce((total, current) => {
			if (current.requestForm === 'paid' && current.requestType === 'loan') {
				return total + +current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		const totalGotLoan = advances.reduce((total, current) => {
			if (current.requestForm === 'got' && current.requestType === 'loan') {
				return total + +current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		setPaidLoan(totalPaidLoan)
		setGotLoan(totalGotLoan)
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

	return (
		<>
			<div className="container-fluid my-3">
				<div className="row" style={{ margin: 'auto' }}>
					<div className="col-md-6 col-12 my-2" style={{ margin: 'auto' }}>
						<h2 style={{ textAlign: 'left', color: 'white' }}>Pie Chart</h2>
						<div
							className={`col-12`}
							style={{
								minHeight: '50vh',
								height: chartHeight,
								backdropFilter: 'blur(16px) saturate(180%)',
								WebkitBackdropFilter: 'blur(16px) saturate(180%)',
								backgroundColor: ' rgba(86, 54, 186, 0.15)',
								borderRadius: '12px',
								border: '1px solid rgba(209, 213, 219, 0.3)'
							}}>
							<PieChart
								headDatas={[
									totalExpanses,
									totalIncomes,
									gotAdvance,
									paidAdvance,
									gotLoan,
									paidLoan
								]}
							/>
						</div>
					</div>

					<div className="col-md-6 col-12 my-2" style={{ margin: 'auto' }}>
						<h2 style={{ textAlign: 'left', color: 'white' }}>Line Chart</h2>
						<div
							className={`col-12`}
							style={{
								minHeight: '50vh',
								height: chartHeight,
								backdropFilter: 'blur(16px) saturate(180%)',
								WebkitBackdropFilter: 'blur(16px) saturate(180%)',
								backgroundColor: ' rgba(86, 54, 186, 0.15)',
								borderRadius: '12px',
								border: '1px solid rgba(209, 213, 219, 0.3)'
							}}>
							<LineChart
								expenses={expanses}
								receipts={receipts}
								requestList={requestList}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid my-3">
				<div className="row" style={{ margin: 'auto' }}>
					<div className="col-12 my-2" style={{ margin: 'auto' }}>
						<h2 style={{ textAlign: 'left', color: 'white' }}>
							Present Employees
						</h2>
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

				<div className="row" style={{ margin: 'auto' }}>
					<div className=" col-12 my-2" style={{ margin: 'auto' }}>
						<h2 style={{ textAlign: 'left', color: 'white' }}>
							{' '}
							Absent Employees
						</h2>
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
		</>
	)
}

export default Attendance
