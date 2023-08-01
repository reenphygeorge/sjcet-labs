## API Docs

### /generalData

##### Payload: N/A

##### Response:
    {
		"success": true,
		"data": {
			"departments": [
				{
					"id": "82d85ad6-6db5-4693-9373-f02abe9e864a",
					"name": "CSE"
				},
				{
					"id": "1972c47e-879c-40b0-8865-cbc9867377ce",
					"name": "ECE"
				},
				{
					"id": "a102acb9-c24b-4cfa-85ea-f54725d7cfd9",
					"name": "ME"
				},
				{
					"id": "1ce1e8e3-3cad-40a7-86b3-6af8ecb069c5",
					"name": "EEE"
				}
			],
			"courses": [
				{
					"courseCode": "CST301",
					"courseName": "Computer Networks",
					"isPractical": false
				},
				{
					"courseCode": "CSL300",
					"courseName": "DBMS Lab",
					"isPractical": true
				},
				{
					"courseCode": "CSL302",
					"courseName": "Computer Networks Lab",
					"isPractical": true
				},
				{
					"courseCode": "CST201",
					"courseName": "Logic System Design",
					"isPractical": false
				}
			],
			"labs": [
				{
					"id": "ca7d5cb0-540d-4dfb-b6e4-42f311dd199b",
					"labName": "Software Computing Lab",
					"capacity": 65,
					"roomNumber": "283",
					"venue": "MTB"
				},
				{
					"id": "d83cd966-dfcc-4ca5-aa65-88f18ac9f681",
					"labName": "Networks Lab",
					"capacity": 32,
					"roomNumber": "72",
					"venue": "SJPB"
				},
				{
					"id": "a90e7652-90bc-4259-b73a-bbdf5f5abfdc",
					"labName": "Programming Lab",
					"capacity": 32,
					"roomNumber": "110",
					"venue": "MTB"
				},
				{
					"id": "a3f7a019-6b21-4a94-8a86-cfd2beb118b2",
					"labName": "Research Lab",
					"capacity": 32,
					"roomNumber": "110",
					"venue": "MTB"
				}
			]
		}
	}

### /user/getUser
#### Method: POST
##### Payload:
	{
		"authId": "MTV"
	}

##### Response:
	{
		"success": true,
		"data": {
			"id": "da21c3da-c87c-4ad2-9990-a48c4638d562",
			"authId": "MTV",
			"registerNumber": "CSE156",
			"name": "Mereen Thomas",
			"gender": "Female",
			"email": "mereenthomas@gmail.com",
			"phoneNumber": "9367582290",
			"department": {
				"id": "82d85ad6-6db5-4693-9373-f02abe9e864a",
				"name": "CSE"
			},
			"lab": null,
			"labAdmin": false,
			"labIncharge": true,
			"notifications": null,
			"labData": {
				"id": "a90e7652-90bc-4259-b73a-bbdf5f5abfdc",
				"labName": "Programming Lab",
				"capacity": 32,
				"report": [],
				"reservation": [],
				"timeTable": [
					{
						"day": "Wednesday",
						"periods": [
							{
								"id": "92358fe3-b106-4949-8427-ea6ec5b7bfb7",
								"department": {
									"id": "82d85ad6-6db5-4693-9373-f02abe9e864a",
									"name": "CSE"
								},
								"semester": 3,
								"batch": "B",
								"periodName": "Data Structures",
								"periodNo": 2,
								"staff": [
									{
										"staffID": "bffc1719-9e91-42fd-b513-a7a0cf31937e",
										"staffName": "Thushara S"
									},
									{
										"staffID": "42eaad05-139a-4c5a-bf34-c040d08e2205",
										"staffName": "Smitha Jacob"
									}
								]
							},
							...
						]
					}
				]
			},
			"report": [],
			"reservation": [],
			"timeTable": [
				{
					"day": "Tuesday",
					"periods": [
						{
							"id": "baa60b94-9dab-432a-84e3-1c9dd41a2e4d",
							"department": {
							"id": "82d85ad6-6db5-4693-9373-f02abe9e864a",
							"name": "CSE"
							},
							"semester": 6,
							"batch": "B",
							"periodName": "Computer Grahics",
							"periodNo": 4,
							"labName": null,
							"staff": null
						},
						...
					]
				},
				{
					"day": "Wednesday",
					"periods": [
						{
							"id": "3121ce01-9d43-43fd-816d-1dcbd1609991",
							"department": {
							"id": "82d85ad6-6db5-4693-9373-f02abe9e864a",
							"name": "CSE"
							},
							"semester": 4,
							"batch": "A",
							"periodName": "COA",
							"periodNo": 3,
							"labName": "Software Computing Lab",
							"staff": [
							{
								"staffID": "42eaad05-139a-4c5a-bf34-c040d08e2205",
								"staffName": "Smitha Jacob"
							},
							{
								"staffID": "02aee997-e7dc-45d1-b0c0-0f3c01684112",
								"staffName": "Thomas"
							}
							]
						},
						...
					]
				},
				...
			]
		}
	}

### /user/patchUser
#### Method: PATCH
##### Payload:
	{
		"id": "c32fe7fd-51f3-4cb1-800d-00ade9e76a26",
		"registerNumber": "iwefownf",
		"name": "Kishore Sebastian",
		"email": "kishoresebastian@gmail.com",
		"phoneNumber": "9278267212"
	}

##### Response:
	{
  		"success": true
	}

### /experiment
#### Method: POST
##### Payload:
	{
  		"courseCode": "CSL300"
	}

##### Response:
	{
		"success": true,
		"data": [
			{
				"id": "b704bd8e-0112-41b1-afc5-1f73015b6869",
				"experimentNumber": 1,
				"experimentName": "Familiarization Of Database",
				"courseCode": "CSL300"
			},
			...
		]
	}

### /attendance/create
#### Method: POST
##### Payload:
	{
		"courseCode": "CSL201",
		"experimentIds": [
			"1663187b-aeb9-4188-8a42-79ed5755c1ee",
			"ca4a2e68-195f-4934-b326-68dcadff9f0f",
			"46dea369-b600-4f8d-ae5e-52ea36957f35"
		],
		"labId": "ec75ee7c-8096-4874-8565-10b4568e6fb4",
		"periods": [1, 2, 3],
		"teachingStaff": [
			"CSE154",
			"CSE123"
		]
	}

##### Response:
	{
		"success": true,
		"data": {
			"id": "012a0609-09ef-49df-8f43-7535e4e730e1",
			"date": "2023-07-03T18:43:46.677Z",
			"labId": "ec75ee7c-8096-4874-8565-10b4568e6fb4",
			"periods": [
				1,
				2,
				3
			],
			"courseCode": "CSL201"
		}
	}

### /attendance/studentDetails
#### Method: POST
##### Payload:
	{
		"departmentId": "8d7a4429-3a29-4c87-94d3-b64c1b9072f0",
		"semester": 6,
		"batch": "B",
		"labBatch": 2
	}

##### Response:
	{
		"success": true,
		"data": [
			{
				"id": "e3bd5e13-ec82-4070-aefd-08dcc890c630",
				"registerNumber": "20CS069",
				"name": "Jithin Jerome",
				"genderName": "Male",
				"departmentsId": "8d7a4429-3a29-4c87-94d3-b64c1b9072f0",
				"semester": 6,
				"batch": "B",
				"labBatch": 2
			},
			...
		]
	}

### /attendance/studentPositions
#### Method: POST
##### Payload:
	{
		"studentPositions": [
			{
				"attendanceRecordId": "93b0ae95-4acd-4f1c-90de-b9803050b09a",
				"studentId": "20CS040",
				"systemNumber": 3 
			},
			{
				"attendanceRecordId": "93b0ae95-4acd-4f1c-90de-b9803050b09a",
				"studentId": "20CS073",
				"systemNumber": 7
			},
			...
		]
	}

##### Response:
	{
		"success": true,
		"data": {
			"count": 3
		}
	}

### /attendance/absentStudents
#### Method: POST
##### Payload:
	{
		"absentStudents": [
			{
				"attendanceRecordId": "93b0ae95-4acd-4f1c-90de-b9803050b09a",
				"studentId": "20CS104"
			},
			{
				"attendanceRecordId": "93b0ae95-4acd-4f1c-90de-b9803050b09a",
				"studentId": "20CS069"
			},
			...
		]
	}

##### Response;
	{
		"success": true,
		"data": {
			"count": 3
		}
	}

### /reservation/create
#### Method: POST
##### Payload:
	{
		"reservationInfo": {
			"professorId": "CSE102",
			"dayId": "Monday",
			"negotiable": false,
			"purpose": "I need this to teach Computer Networks",
			"semester": 6,
			"batch": "B",
			"periods": [5, 6, 7],
			"teachingDepartmentsId": "82d85ad6-6db5-4693-9373-f02abe9e864a",
			"labId": "a3f7a019-6b21-4a94-8a86-cfd2beb118b2"
		}
	}

##### Response:
	{
		"success": true,
		"data": [
			{
				"status": "SUCCESSFUL",
				"dayId": null,
				"periodNumber": null
			}
		]
	}

### /reservation/review
#### Method: PATCH
##### Payload:
	{
		"reservationId": "6f259b2e-d8ef-46b6-8406-c057fcdc1ebe",
		"status": "APPROVED"
	}

##### Response:
	{
		"success": true,
		"data": 2
	}

### /reservation/delete
#### Method: DELETE
##### Payload:
	{
		"reservationInfo": [
			"ab5fabb6-447d-4c73-91cd-f4f0c5ea6f4f",
			"c9664bbe-908d-4ea3-ab45-bc4454fc35e0"
		]
	}

##### Response:
	{
		"success": true,
		"data": {
			"count": 2
		}
	}

### /notification/view
#### Method: PATCH
##### Payload:
	{
	"notificationId": 84eaafd9-0fce-4cd4-92fb-7ebe566561b0"
	}

##### Response:
	{
		"success": true,
		"data": {
			"id": "f7e35552-ee40-45c3-b297-adab25a4df6c",
			"professorId": "CSE102",
			"heading": "Reservation APPROVED",
			"message": "I need this to teach Computer Networks",
			"type": "RESERVATION_APPROVED",
			"seen": true,
			"timeStamp": "2023-07-03T18:20:11.605Z"
		}
	}

### /notification/delete
#### Method: DELETE
##### Payload:
	{
		"notificationIds": [
			"a1349f98-02f6-4296-b41c-3760fce6efc9",
			"a6fb8f59-227e-4823-ad04-7368317cee0b"
		]
	}

##### Response:
	{
		"success": true,
		"data": {
			"count": 2
		}
	}

### /logs
#### Method: POST
##### Payload:
	{
		"date": "2023-06-03T00:00:00.000Z",
		"labId": "ca7d5cb0-540d-4dfb-b6e4-42f311dd199b",
		"periods": [1, 2, 3]
	}

##### Response:
	{
		"success": true,
		"data": {
			"id": "6c6ed5f8-27e1-4ba9-8d54-199f7f5423e1",
			"date": "2023-06-15T00:00:00.000Z",
			"labId": "ca7d5cb0-540d-4dfb-b6e4-42f311dd199b",
			"periods": [
				1,
				2,
				3
			],
			"courseCode": "CSL300",
			"teachingStaff": [
				{
					"registerNumber": "CSE209",
					"name": "Thushara S"
				},
				{
					"registerNumber": "CSE223",
					"name": "Maria Yesudas"
				}
			],
			"studentPositions": [
			{
				"studentId": "20CS103",
				"systemNumber": 3,
				"student": {
					"name": "Reenphy George"
				}
			},
			{
				"studentId": "20CS040",
				"systemNumber": 7,
				"student": {
					"name": "Ashik David Roy"
				}
			},
			{
				"studentId": "20CS114",
				"systemNumber": 5,
				"student": {
					"name": "Sonu T Shaji"
				}
			}
			],
			"absentStudents": [
				{
					"studentId": "20CS113",
					"student": {
						"name": "Sona Joseph"
					}
				},
				{
					"studentId": "20CS060",
					"student": {
						"name": "George John"
					}
				},
				{
					"studentId": "20CS102",
					"student": {
						"name": "Raina Raj"
					}
				}
			]
		}
	}

### /report/create
#### Method: POST
##### Payload:
	{
		"labId": "ca7d5cb0-540d-4dfb-b6e4-42f311dd199b",
		"professorId": "CSE200",
		"systems": [13, 21, 25],
		"issueDescription": "Unable to power on"
	}

##### Response:
	{
		"success": true,
		"data": {
			"id": "50994902-515b-4b1b-8e93-304c233750da",
			"labId": "ca7d5cb0-540d-4dfb-b6e4-42f311dd199b",
			"professorId": "CSE200",
			"systems": [
				13,
				21,
				25
			],
			"date": "2023-06-30T05:52:41.042Z",
			"issueDescription": "Unable to power on",
			"status": "PENDING"
		}
	}

### /report/review
#### Method: PATCH
##### Payload:
	{
		"reviewId": "bc8bee45-160b-47d2-8df2-03274143c91d",
	}

##### Response:
	{
		"success": true,
		"data": {
			"id": "56f205fe-82e6-4430-9bef-1b408193eb12",
			"labId": "7d5a3880-2c53-46e3-a12a-bef3f9860915",
			"professorId": "CSE102",
			"systems": [
				13,
				21,
				25
			],
			"date": "2023-07-03T19:10:30.079Z",
			"issueDescription": "Unable to power on",
			"status": "SOLVED"
		}
	}

### /report/delete
#### Method: DELETE
##### Payload:
	{
		"reportIds": [
			"bc8bee45-160b-47d2-8df2-03274143c91d",
			...
		]
	}

##### Response:
	{
		"success": true,
		"data": {
			"count": 1
		}
	}

### /freeLabs
#### Method: POST
##### Payload:
	{
		"day": "Monday",
		"periodNumbers": [
			5,
			6,
			7
		]
	}

##### Response:
	{
		"success": true,
		"data": [
			{
				"id": "ca7d5cb0-540d-4dfb-b6e4-42f311dd199b",
				"labName": "Software Computing Lab",
				"status": "AVAILABLE"
			},
			{
				"id": "d83cd966-dfcc-4ca5-aa65-88f18ac9f681",
				"labName": "Networks Lab",
				"status": "AVAILABLE"
			},
			{
				"id": "a90e7652-90bc-4259-b73a-bbdf5f5abfdc",
				"labName": "Programming Lab",
				"status": "AVAILABLE"
			},
			{
				"id": "a3f7a019-6b21-4a94-8a86-cfd2beb118b2",
				"labName": "Research Lab",
				"status": "AVAILABLE"
			}
		]
	}