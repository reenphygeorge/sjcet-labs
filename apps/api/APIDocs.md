## API Docs

### /generalData

##### Payload: N/A

##### Response:
    {
        "success": true,
        "data": {
            "departments": [
                {
                    "id": "8d7a4429-3a29-4c87-94d3-b64c1b9072f0",
                    "name": "CSE",
                    "numberOfBatches": 3
                },
    			...
            ],
    		"courses": [
      			{
        			"courseCode": "CST301",
        			"courseName": "Computer Networks",
        			"isPractical": false
      			},
    			...
    		],
    		"labs": [
    			{
    				"id": "ca7d5cb0-540d-4dfb-b6e4-42f311dd199b",
    				"labName": "Software Computing Lab",
    				"capacity": 65,
    				"roomNumber": "283",
    				"venue": "MTB"
    			},
      			...
    		]
        }
    }

### /user
#### Method: GET
##### Payload:
	{
  		"authId": "smithajacob"
	}

##### Response:
	{
  		"success": true,
  		"data": {
			"id": "ac8d5c69-4921-4266-bd80-2fbb720086ce",
			"authId": "smithajacob",
			"registerNumber": "CSE088",
			"name": "Smitha Jacob",
			"genderName": "Female",
			"email": "smitha@gmail.com",
			"phoneNumber": "8261285628",
			"departmentId": "8d7a4429-3a29-4c87-94d3-b64c1b9072f0",
			"labAdmin": false,
			"labIncharge": true,
			"labId": "ca7d5cb0-540d-4dfb-b6e4-42f311dd199b",
			"timeTable": [
				...
			],
			"reservation": [
				...
			],
			"notifications": [
				{
					"id": "b375429b-5691-482f-a1df-28c29d418b56",
					"professorsProfessorId": "CSE088",
					"heading": "Software Computing Lab Reservation Request",
					"message": "Need to teach Data Structures",
					"type": "RESERVATION_REQUEST",
					"seen": false,
					"timeStamp": "2023-06-22T13:21:24.039Z"
				},
				...
			],
			"report": [
				...
			],
			"labTimeTable": [
				...
			],
			"labData": {
				"id": "ca7d5cb0-540d-4dfb-b6e4-42f311dd199b",
				"labName": "Software Computing Lab",
				"capacity": 65,
				"roomNumber": "283",
				"venue": "MTB",
				"report": [
					...
				],
				"reservation": [
					{
						"id": "19675bc7-387a-4cd5-8d4c-b0b294d92097",
						"professorId": "CSE211",
						"date": "2023-06-22T00:00:00.000Z",
						"dayId": "Tuesday",
						"negotiable": false,
						"purpose": "Need to teach Data Structures",
						"coursesId": "CSL202",
						"semester": 6,
						"period": 6,
						"teachingDepartmentsId": "CSE",
						"labId": "Software Computing Lab",
						"batch": "B",
						"status": "REQUESTED"
					},
					...
				]
			}
		}
	}

### /user
#### Method: PATCH
##### Payload:
	{
		"authId": "kishoreseb",
		"registerNumber": "iwefownf",
		"name": "Kishore Sebastian",
		"departmentId": "acee775d-50d6-457b-a9c3-181fd67d5dba",
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
		"periods": [1, 2, 3]
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
			"teachingDepartmentsId": "CSE",
			"labId": "Networks Lab"
		}
	}

##### Response:
	{
		"success": true,
		"data": {
			"count": 3
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
		"labName": "Software Computing Lab",
		"periods": [1, 2, 3]
	}

##### Response:
	{
		"success": true,
		"data": {
			"id": "93b0ae95-4acd-4f1c-90de-b9803050b09a",
			"date": "2023-06-03T00:00:00.000Z",
			"labName": "Software Computing Lab",
			"periods": [
				1,
				2,
				3
			],
			"courseCode": "CSL300",
			"studentPositions": [
				{
					"studentId": "20CS040",
					"systemNumber": 3,
					"student": {
					"name": "Ashik David Roy"
					}
				},
				{
					"studentId": "20CS073",
					"systemNumber": 7,
					"student": {
					"name": "Nithin V James"
					}
				},
				...
			],
			"absentStudents": [
				{
					"studentId": "20CS104",
					"student": {
					"name": "Reenphy George"
					}
				},
				{
					"studentId": "20CS069",
					"student": {
					"name": "Jithin Jerome"
					}
				},
				...
			]
		}
	}

### /report/create
#### Method: POST
##### Payload:
	{
		"labId": "Software Computing Lab",
		"professorId": "CSE103",
		"systems": [13, 21, 25],
		"issueDescription": "Unable to power on"
	}

##### Response:
	{
		"success": true,
		"data": {
			"id": "bc8bee45-160b-47d2-8df2-03274143c91d",
			"labId": "Software Computing Lab",
			"professorId": "CSE103",
			"systems": [
				13,
				21,
				25
			],
			"date": "2023-06-23T16:06:49.959Z",
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
		"day": "Wednesday",
		"periods": [2, 3, 5, 6, 7]
	}

##### Response:
	{
		"success": true,
		"data": [
			{
				"labName": "Software Computing Lab",
				"reservation": {
					"id": "5ce3bbdb-a3e4-4fdf-bc64-81a89c3e3fe0",
					"professorId": "CSE102",
					"date": "2023-06-24T00:00:00.000Z",
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
					"teachingDepartmentsId": "CSE",
					"labId": "Software Computing Lab",
					"batch": "B",
					"status": "APPROVED",
					"professor": {
						"registerNumber": "CSE102",
						"name": "Kishore Sebastian"
					}
				},
				"freeOfTimeTable": true
			},
			{
				"labName": "Networks Lab",
				"reservation": {
					"id": "f9da0a17-1b70-4cf1-a32d-a4cea14923f5",
					"professorId": "CSE102",
					"date": "2023-06-24T00:00:00.000Z",
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
					"teachingDepartmentsId": "CSE",
					"labId": "Networks Lab",
					"batch": "B",
					"status": "APPROVED",
					"professor": {
						"registerNumber": "CSE102",
						"name": "Kishore Sebastian"
					}
				},
				"freeOfTimeTable": false
			},
			{
				"labName": "Programming Lab",
				"freeOfTimeTable": true
			}
		]
	}