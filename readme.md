# DNA Api

In this project, you will be able to detect if a person has genetic differences based on their DNA sequence.
To achieve this, each nitrogenous base provided in the DNA is analyzed in order to detect if there is more than one sequence of 4 identical letters (which can only be A, C, G, T).
Each array of nitrogenated bases represents each row from a table of NxN, so the DNA must be analyzed horizontally, vertically and diagonally

### _Installation & Usage_

First of all, to clone and use this project, you need to install git on your PC. Then, you need to open the cmd and run the following address on the path where you are going to store the project:

`git clone https://github.com/Matisantillan11/DicodeADNApi.git`

After you cloned the project, you need to run cd dicodeSolution
`cd dicodeSolution`

Once you're in, you need to run npm install to install all dependencies of the project.
`npm install` to install all dependencies of the project.

It's important to comment that you need to create a .env file to set all the environment variables needed. You need to create a Database in [MongoDB Atlas](http://https://www.mongodb.com/cloud/atlas/lp/try2?utm_content=controlaterms&utm_source=google&utm_campaign=gs_americas_argentina_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624305&gclid=Cj0KCQjwqKuKBhCxARIsACf4XuEPm6ru_BPRTIDo_DZoB4lONIsWV1I21gcch6IR0TzFAx9ZiTdj2xQaAlOmEALw_wcB 'MongoDB Atlas') and set the connection string in .env file using the name _MONGO_CNN_ for production database and _MONGO_CNN_TEST_ for test database.

Also if you don't provide a _PORT_ variable in .env file, this set automatically in the port 8080

### _Commands_

<div style="margin-bottom: 50px" >
<table>
<tr><th>Command  </th>  <th> Description</th></tr>
<tr><td><b>npm run dev</b></td><td> Use this command to be able to automatically reload the project using nodemon when you're working on it </td></tr>

<tr><td><b>npm run start</b></td><td> Use this command to start the project once. If project fail, you need to reload manually to re-start the project.</td></tr>

<tr><td><b>npm run test</b></td><td> Use this command to run all tests once. It runs and specifies results of all tests, including errors.</td></tr>

<tr><td><b>npm run test:watch</b></td><td> Use this command to be able to automatically reload the project when you're working on your tests and you don't want to do it manually.</td></tr>

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

To introduce a DNA and have it analyzed, the `POST` method must be used in the `/api/mutation` endpoint, which will take care of analyzing the sample and registering its anomalies.

##### Responses

1. If the DNA provided is correct, you must receive the **status code 200** and this information

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

2.  If the DNA provided doesn't have mutations, you must receive the **status code 403** and this information

```json
{
	"status-code": 403,
	"message": "El ADN analizado no contiene mutaciones"
}
```

<div style="margin-bottom: 50px" >
<table>
<tr><th>Request Body</th> <th>   Type</th> <th> Description</th><th>   Example </th></tr>
<tr><td>DNA </td><td> Array of strings </td> <td>Each String of the array represents a nitrogenous base of DNA. Each base can only contain the letters A, C, G, T.</td><td>  ["ATGCGA","CAGTGC","TTATGT"] </td></tr>
</table>
</div>

#### GET STATS

Using the `GET` method in the `/api/stats` endpoint you will be able to see the statistics of all the analyzed DNAs that contain mutations.

##### Responses

1.  If the database contains analized DNAs, you must receive **status code 200** and the according information

```json
{
	"status-code": 200,
	"stats": [
		{
			"_id": "614cc2355e5980500b35b10d",
			"dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
			"has_mutation": true,
			"count_mutations": 3,
			"count_no_mutations": 20,
			"ratio": 0.15
		},
		{
			"_id": "614cc3a75e5980500b35b114",
			"dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "TCACTG"],
			"has_mutation": true,
			"count_mutations": 1,
			"count_no_mutations": 17,
			"ratio": 0.058823529411764705
		}
	]
}
```

<div style="margin-bottom: 50px" >
<table>
<tr><th>Request Body</th> <th>   Type</th> <th> Description</th><th>   Example </th></tr>
<tr><td>DNA </td><td> Array of strings </td> <td>Each String of the array represents a nitrogenous base of DNA. Each base can only contain the letters A, C, G, T.</td><td>  [
                "ATGCGA",
                "CAGTGC",
                "TTATGT",
                "AGAAGG",
                "CCCCTA",
                "TCACTG"
            ], </td></tr>

<tr><td>has_mutation </td><td> Boolean </td> <td>It represents the status of the DNA. If has mutation is "true", else is "false".</td><td> true </td></tr>

<tr><td>count_mutation </td><td> Integer </td> <td>It represents the quantity of bases with mutation found.</td><td>  3 </td></tr>

<tr><td>count_no_mutation </td><td> Integer </td> <td>It represents the quantity of bases with no mutation found.</td><td>  14 </td></tr>

<tr><td> ratio </td><td> Integer </td> <td>It's the difference between count_mutation and count_no_utation </td><td>   0.21428571428571427 </td></tr>
</table>
</div>
