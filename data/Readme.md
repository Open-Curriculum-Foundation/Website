# Open-Curriculum

## How to contribute?

- Fork this repository, clone it on your local machine and create a new branch
- Switch to the new branch
- Make any changes in the curriculum as you see fit
- Follow the guidelines given below to edit the JSON files
- Commit your changes and create a pull request
- Your changes will be reviewed and if valid, they will be merged
- Alternatively you can fill this google form: https://forms.gle/Bp1W7kR3Hh3R8kLr6

## Guidelines for JSON file

- To learn about JSON syntax: https://www.w3schools.com/js/js_json_syntax.asp

### paths.json

---

- If you are adding a new "Educational Domain" to the collection, you need to edit the paths.json file on the top level
- Add your domain name: followed by an array of sub domains
- Example:

```
{
	"Engineering": ["ComputerScience", "InformationScience"]
}
```

### subdomain.json

---

- Subdomains are "branches" in an educational field, such as "Computer Science" in Engineering
- subdomain.json files are always stored in a domain folder
- The file structure should be /Domain/Subdomain.json
- Follow the syntax given below to add/edit a subdomain.json file:

```json
{
	"subjects": [
		{
			"name": "SubjectName",
			"links": ["an array of links (strings) to resources for the subject"],
			"chapters": [
				{
					"name": "Name of Chapter 1",
					"links": ["array of links (strings) to resources for the chapter"],
					"description": "A string describing the chapter"
				}
			]
		}
	]
}
```

- The chapters array can contain n number of chapter objects.

### Thankyou for your contributions!
