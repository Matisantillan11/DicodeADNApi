# DNA Api

In this project, you will be able to detect if a person has genetic differences based on their DNA sequence.
To achieve this, each nitrogenous base provided in the DNA is analyzed in order to detect if there is more than one sequence of 4 identical letters (which can only be A, C, G, T).
Each nitrogenous base of DNA represents each row of a table of (NxN), so the DNA must be analyzed horizontally, vertically and obliquely.

### _Installation & Usage_

To clon and use this project you fist of all, need to install git in your PC, open your terminal and in the path where you going to store the project, run

`git clone https://github.com/Matisantillan11/DicodeADNApi.git`

Once you clone the project, you need to run
`cd dicodeSolution`

Once you're in, you need to run
`npm install` to install all dependencies of the project.

It's important to comment that you need to create a .env file to set all enviroments variables needed.
You need to create a Database in [MongoDB Atlas](http://https://www.mongodb.com/cloud/atlas/lp/try2?utm_content=controlaterms&utm_source=google&utm_campaign=gs_americas_argentina_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624305&gclid=Cj0KCQjwqKuKBhCxARIsACf4XuEPm6ru_BPRTIDo_DZoB4lONIsWV1I21gcch6IR0TzFAx9ZiTdj2xQaAlOmEALw_wcB 'MongoDB Atlas') and set the connection string in .env file using the name _MONGO_CNN_ for production database and _MONGO_CNN_TEST_ for test database.

Also if you don't need to provide a _PORT_ in .env file this set automatically in the port 8080

### _Commands_

<div style="margin-bottom: 50px" >
<table>
<tr><th>Command  </th>  <th> Description</th></tr>
<tr><td><b>npm run dev</b></td><td> Use this command to have auto-reload of the project using nodemon when you're working on it </td></tr>

<tr><td><b>npm run start</b></td><td> Use this command to start the project once. If project fail, you need to reload manually to re-start the project.
Usually is used for production </td></tr>

<tr><td><b>npm run test</b></td><td> Use this command to run all tests once. It run and specify results of all test, including errors.</td></tr>

<tr><td><b>npm run test:watch</b></td><td> Use this command to have auto-reload of the project when you're working on your tests and you don't want to reload manually</td></tr>

</table>
</div>

### _Dependencies_

- express
- express-validator
- mongoose
- cors
- cross-env
- dotenv
- nodemon
- jest
- supertest
- MongoDB

### _Methods & Endpoints_

#### POST DNA

To introduce a DNA and have it analyzed, the `POST` method must be used in the `api/mutation/` endpoint, which will be take care of analyzing the sample and registering its anomalies.

##### Responses

1.  If DNA provided is correct, you must to receive **status code 200** and this information

```json
{
	"status-code": 200,
	"message": "El ADN analizado contiene mutaciones",
	"mutation": {
		"dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
		"has_mutation": true,
		"analized_at": "2021-09-22T21:30:51.304Z"
	}
}
```

2.  If DNA provided is not correct, you must to receive **status code 400** and this information

```json
{
	"status-code": 403,
	"message": "El ADN analizado no contiene mutaciones"
}
```

<div style="margin-bottom: 50px" >
<table>
<tr><th>Request Body</th> <th>   Type</th> <th> Description</th><th>   Example </th></tr>
<tr><td>DNA </td><td> Array of strings </td> <td>Each String in the array represents a nitrogenous base of DNA. Each base can only contain the letters A, C, G, T </td><td>  ["ATGCGA","CAGTGC","TTATGT"] </td></tr>
</table>
</div>

#### GET STATS

Using the `GET` method in the `api/stats` endpoint you will be able to see the statistics of all the analyzed DNAs that contain mutations.

##### Responses

1.  If database contain analized DNA's, you must to receive **status code 200** and the according information

```json
{
	"status-code": 403
}
```

2.  If database not contain analized DNA's, you must to receive **status code 404** and the according information

```json
{
	"status-code": 403,
	"message": "El ADN analizado no contiene mutaciones"
}
```

<div style="margin-bottom: 50px" >
<table>
<tr><th>Response Body</th> <th>   Type</th> <th> Description</th><th>   Example </th></tr>
<tr><td>DNA </td><td> Array of strings </td> <td>Each String in the array represents a nitrogenous base of DNA. Each base can only contain the letters A, C, G, T </td><td>  [
                "ATGCGA",
                "CAGTGC",
                "TTATGT",
                "AGAAGG",
                "CCCCTA",
                "TCACTG"
            ], </td></tr>

<tr><td>has_mutation </td><td> Boolean </td> <td>it represent status of the DNA, If has mutation is "true" else is "false"</td><td> true </td></tr>

<tr><td>count_mutation </td><td> Integer </td> <td>It represents quantity of bases with mutation finded</td><td>  3 </td></tr>

<tr><td>count_no_mutation </td><td> Integer </td> <td>It represents quantity of bases with no mutation finded</td><td>  14 </td></tr>

<tr><td> ratio </td><td> Integer </td> <td>It's the diference between countMutation and countNoMutation </td><td>   0.21428571428571427 </td></tr>
</table>
</div>
