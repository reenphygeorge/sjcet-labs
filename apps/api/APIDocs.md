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

### /user
#### Method: GET
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
			"departmentId": "82d85ad6-6db5-4693-9373-f02abe9e864a",
			"labAdmin": false,
			"labIncharge": true,
			"labId": "a90e7652-90bc-4259-b73a-bbdf5f5abfdc",
			"timeTable": [
				{
					"id": "baa60b94-9dab-432a-84e3-1c9dd41a2e4d",
					"userId": "CSE156",
					"coursesId": "CST303",
					"semester": 6,
					"batch": "B",
					"periodNumber": 4,
					"dayId": "Tuesday",
					"teachingDepartmentId": "82d85ad6-6db5-4693-9373-f02abe9e864a",
					"labId": null,
					"course": {
						"courseName": "Computer Grahics"
					},
					"lab": null,
					"teachingDepartment": {
						"name": "CSE"
					}
				},
				{
					"id": "3121ce01-9d43-43fd-816d-1dcbd1609991",
					"userId": "CSE156",
					"coursesId": "CST309",
					"semester": 4,
					"batch": "A",
					"periodNumber": 3,
					"dayId": "Wednesday",
					"teachingDepartmentId": "82d85ad6-6db5-4693-9373-f02abe9e864a",
					"labId": "ca7d5cb0-540d-4dfb-b6e4-42f311dd199b",
					"course": {
						"courseName": "COA"
					},
					"lab": {
						"labAdmins": [
							{
								"name": "Smitha Jacob"
							},
							{
								"name": "Thomas"
							}
						],
						"labName": "Software Computing Lab",
						"venue": "MTB",
						"roomNumber": "283"
					},
					"teachingDepartment": {
						"name": "CSE"
					}
				}
			],
			"reservation": [
				...
			],
			"notifications": [
				...
			],
			"report": [
				...
			],
			"labData": {
				"id": "a90e7652-90bc-4259-b73a-bbdf5f5abfdc",
				"labName": "Programming Lab",
				"capacity": 32,
				"roomNumber": "110",
				"venue": "MTB",
				"report": [
					...
				],
				"reservation": [
					...
				],
				"timeTable": [
					{
						"id": "92358fe3-b106-4949-8427-ea6ec5b7bfb7",
						"labId": "a90e7652-90bc-4259-b73a-bbdf5f5abfdc",
						"courseCode": "CSL202",
						"departmentId": "82d85ad6-6db5-4693-9373-f02abe9e864a",
						"semester": 3,
						"batch": "B",
						"periodNumber": 2,
						"dayId": "Wednesday",
						"course": {
							"courseName": "Data Structures"
						},
						"teachingStaff": [
							{
								"name": "Thushara S"
							},
							{
								"name": "Smitha Jacob"
							}
						]
					},
					{
						"id": "535d6cb7-21be-44d2-b5c9-d4c65465af1a",
						"labId": "a90e7652-90bc-4259-b73a-bbdf5f5abfdc",
						"courseCode": "CSL202",
						"departmentId": "82d85ad6-6db5-4693-9373-f02abe9e864a",
						"semester": 3,
						"batch": "B",
						"periodNumber": 3,
						"dayId": "Wednesday",
						"course": {
							"courseName": "Data Structures"
						},
						"teachingStaff": [
							{
								"name": "Thushara S"
							},
							{
								"name": "Smitha Jacob"
							}
						]
					},
					{
						"id": "4a4e92ab-c2ac-4246-98bb-e454c49f6449",
						"labId": "a90e7652-90bc-4259-b73a-bbdf5f5abfdc",
						"courseCode": "CSL202",
						"departmentId": "82d85ad6-6db5-4693-9373-f02abe9e864a",
						"semester": 3,
						"batch": "B",
						"periodNumber": 4,
						"dayId": "Wednesday",
						"course": {
							"courseName": "Data Structures"
						},
						"teachingStaff": [
							{
								"name": "Thushara S"
							},
							{
								"name": "Smitha Jacob"
							}
						]
					}
				]
			}
		}
	}

### /user
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
#### Method: GET
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
		"date": "2023-06-03",
		"courseCode": "CSL300",
		"experimentIds": [
			"b704bd8e-0112-41b1-afc5-1f73015b6869",
			"f5a7d0fb-d77b-47b4-a5ec-28bdc0c2c853",
			"945de729-f39f-4004-95cb-c90ae046682e"
		],
		"labName": "Software Computing Lab",
		"periods": [1, 2, 3],
		"teachingStaff": [
			"CSE209",
			"CSE223"
		]
	}

##### Response:
	{
		"success": true,
		"data": {
			"id": "e73e3370-5e32-4456-9dbb-511e680b3739",
			"date": "2023-06-15T00:00:00.000Z",
			"labName": "Software Computing Lab",
			"periods": [
				1,
				2,
				3
			],
			"courseCode": "CSL300"
		}
	}

### /attendance/studentDetails
#### Method: GET
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
			"coursesId": "CSL302",
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
		"data": {
			"id": "c8e6ed2e-4a4c-4583-b384-92008b0aa59a",
			"professorId": "CSE102",
			"date": "2023-06-30T00:00:00.000Z",
			"dayId": "Monday",
			"negotiable": false,
			"purpose": "I need this to teach Computer Networks",
			"coursesId": "CSL302",
			"semester": 6,
			"periods": [
				5,
				6,
				7
			],
			"teachingDepartmentsId": "82d85ad6-6db5-4693-9373-f02abe9e864a",
			"labId": "a3f7a019-6b21-4a94-8a86-cfd2beb118b2",
			"batch": "B",
			"status": "REQUESTED"
		}
	}

### /reservation/review
#### Method: PATCH
##### Payload:
	{
		"reviewInfo": [
			{
				"reservationId": "6f259b2e-d8ef-46b6-8406-c057fcdc1ebe",
				"status": "APPROVED"
			},
			{
				"reservationId": "8f6a32cb-464b-4521-8ba4-d8d5ba6a1d52",
				"status": "REJECTED"
			},
			...
		]
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
		"notificationIds": [
			"84eaafd9-0fce-4cd4-92fb-7ebe566561b0",
			"4d0f0405-aed4-464e-b855-7ae0d2827b3f"
		]
	}

##### Response:
	{
		"success": true,
		"data": {
			"count": 2
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
#### Method: GET
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
		"reviewIds": [
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
#### Method: GET
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
				"roomNo": "MTB 283",
				"status": "AVAILABLE"
			},
			{
				"id": "d83cd966-dfcc-4ca5-aa65-88f18ac9f681",
				"labName": "Networks Lab",
				"roomNo": "SJPB 72",
				"status": "AVAILABLE"
			},
			{
				"id": "a90e7652-90bc-4259-b73a-bbdf5f5abfdc",
				"labName": "Programming Lab",
				"roomNo": "MTB 110",
				"status": "AVAILABLE"
			},
			{
				"id": "a3f7a019-6b21-4a94-8a86-cfd2beb118b2",
				"labName": "Research Lab",
				"roomNo": "MTB 110",
				"status": "AVAILABLE"
			}
		]
	}