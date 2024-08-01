import React from 'react'
import styles from './List.module.css'

import { DataGrid } from '@mui/x-data-grid'
const List = () => {
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
		<div
			style={{
				height: 400,
				width: '100%',

				backgroundColor: 'white'
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
	)
}
export default List
