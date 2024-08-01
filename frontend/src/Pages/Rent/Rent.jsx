import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Rent.module.css'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import { useDispatch, useSelector } from 'react-redux'
import CreateUser from '../../Components/CreateUser/CreateUser'
import image from './../../Images/man.png'
import UsersTable from '../../Components/UsersTable/UsersTable'
import Model from '../../Components/Model/Model'
import { getUserActivities, getUsers } from '../../Actions/userAction'
import ResetPasswordModel from '../../Components/ResetPasswordModel/ResetPasswordModel'
import DataActivityTable from '../../Components/DataActivityTable/DataActivityTable'
import UserActivityTable from '../../Components/UserActivityTable/UserActivityTable'
import swal from 'sweetalert'
import { logoutUserAccount } from '../../Actions/AuthAction'
import { getRequests, resetData } from '../../Actions/RequestActions'
import DeleteDataTable from '../../Components/DeleteDataTable/DeleteDataTable'
import { getAccountRequests } from '../../Actions/AccountRequestActions'
import MyCalender from '../../Components/Calender/Calender'
const Rent = () => {
	const users = useSelector(state => state.user.users)
	const requests = useSelector(state => state.request.requests)
	const deleteRequests = useSelector(
		state => state.accountRequest.accountRequests
	).filter(data => +data.status === 0)

	const userActivities = useSelector(state => state.user.userActivities)

	const currentUser = useSelector(state => state.auth.user)

	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)
	const [showPasswordModel, setPasswordModel] = useState(false)
	const [selectedUser, setSelectedUser] = useState()

	const handlePasswordModel = () => {
		setPasswordModel(current => !current)
	}
	const handleModel = () => {
		setShowModal(current => !current)
	}

	const getIdHandler = id => {
		setSelectedUser({ ...users.find(data => data.id === id) })
	}

	useEffect(() => {
		dispatch(getAccountRequests())
		dispatch(getRequests())
		dispatch(getUserActivities())
	}, [dispatch])

	const handleConfirmation = id => {
		swal({
			title: 'Are you sure?',
			text: 'Are You Want to Logout This Account',
			icon: 'warning',
			buttons: ['No', 'Yes'],
			dangerMode: true
		}).then(confirm => {
			dispatch(logoutUserAccount(id))

			if (confirm) {
				swal('Success!', 'Account is Logout!', 'success')
			}
		})
	}

	const resetHandleConfirmation = item => {
		swal({
			title: 'Are you sure?',
			text: 'Are You Want to Reset This Data',
			icon: 'warning',
			buttons: ['No', 'Yes'],
			dangerMode: true
		}).then(confirm => {
			const data = {
				arid: item.arid,
				rid: item.rid
			}

			if (confirm) {
				dispatch(resetData(data))

				swal('Completed Your Request!', 'Successfully Reset!', 'success')
			}
		})
	}

	return (
		<div className={`container-fluid ${styles.home}`}>
			<div className="row m-auto">
				<h1 style={{ textAlign: 'left' }} className="text-light">
					Client Rent A Car Reg Details
				</h1>
				<div className="col-10 col-md-3  mx-auto">
					<div className="row mb-2">
						<label
							className="text-light text-left"
							style={{ textAlign: 'left' }}>
							Proof No :{' '}
						</label>
						<select>
							<option>1</option>
							<option>2</option>
							<option>3</option>
						</select>
					</div>

					<div className="row mb-2">
						<label
							className="text-light text-left"
							style={{ textAlign: 'left' }}>
							Gender :{' '}
						</label>
						<select>
							<option>Male</option>
							<option>Female</option>
						</select>
					</div>

					<div className="row mb-2">
						<label
							className="text-light text-left"
							style={{ textAlign: 'left' }}>
							DOB :{' '}
						</label>
						<input type="date" />
					</div>

					<div className="row mb-2">
						<label
							className="text-light text-left"
							style={{ textAlign: 'left' }}>
							Marital Status :{' '}
						</label>
						<select>
							<option>Male</option>
							<option>Female</option>
						</select>
					</div>

					<div className="row mb-2">
						<label
							className="text-light text-left"
							style={{ textAlign: 'left' }}>
							Email :
						</label>
						<input type="email" />
					</div>
				</div>

				<div className="col-10 col-md-3  mx-auto">
					<div className="row mb-2">
						<label
							className="text-light text-left"
							style={{ textAlign: 'left' }}>
							Client Name :
						</label>
						<input />
					</div>

					<div className="row mb-2">
						<label
							className="text-light text-left"
							style={{ textAlign: 'left' }}>
							Joined On
						</label>
						<input type="date" />
					</div>

					<div className="row mb-2">
						<label
							className="text-light text-left"
							style={{ textAlign: 'left' }}>
							Contact 1 :{' '}
						</label>
						<input type="date" />
					</div>

					<div className="row mb-2">
						<label
							className="text-light text-left"
							style={{ textAlign: 'left' }}>
							Contact 2 :{' '}
						</label>
						<input type="date" />
					</div>

					<div className="row mb-2">
						<label
							className="text-light text-left"
							style={{ textAlign: 'left' }}>
							Address :
						</label>
						<input type="text" />
					</div>
				</div>

				<div className="col-10 col-md-3  mx-auto">
					<div className="row mb-2">
						<label
							className="text-light text-left"
							style={{ textAlign: 'left' }}>
							Type of Proof :{' '}
						</label>
						<select>
							<option>1</option>
							<option>2</option>
							<option>3</option>
						</select>
					</div>

					<div className="row mb-2">
						<label
							className="text-light text-left"
							style={{ textAlign: 'left' }}>
							Proof No Expire :
						</label>
						<input type="date" />
					</div>

					<div className="row mb-2">
						<label
							className="text-light text-left"
							style={{ textAlign: 'left' }}>
							Company Name /No
						</label>
						<input type="date" />
					</div>

					<div className="row mb-2">
						<label
							className="text-light text-left"
							style={{ textAlign: 'left' }}>
							Nationality
						</label>
						<select>
							<option>Male</option>
							<option>Female</option>
						</select>
					</div>
				</div>
			</div>

			<div className="row" style={{ marginTop: '3vh', color: 'white' }}>
				<h2>Users</h2>
				<UsersTable
					initialData={users}
					handleModel={handleModel}
					getIdHandler={getIdHandler}
				/>
			</div>
			<div className="row" style={{ marginTop: '3vh', color: 'white' }}>
				<h2>Data Activities</h2>
				<DataActivityTable initialData={requests} />
			</div>

			<div className="row" style={{ marginTop: '3vh', color: 'white' }}>
				<h2>Deleted Datas</h2>
				<DeleteDataTable
					initialData={deleteRequests}
					resetHandleConfirmation={resetHandleConfirmation}
				/>
			</div>

			<div className="row" style={{ marginTop: '3vh', color: 'white' }}>
				<h2>User Activities</h2>
				<UserActivityTable
					initialData={userActivities}
					handleModel={handleModel}
					getIdHandler={getIdHandler}
					handleConfirmation={handleConfirmation}
				/>
			</div>
			{showModal && (
				<Model
					showModal={showModal}
					closeHandler={handleModel}
					selectedUser={selectedUser}
				/>
			)}

			{showPasswordModel && (
				<ResetPasswordModel
					selectedUser={selectedUser}
					showModal={showPasswordModel}
					closeHandler={handlePasswordModel}
				/>
			)}
		</div>
	)
}

export default Rent
