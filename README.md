
# Medlr-Pharmacy

This is a website to digitalise the operation of pharmacy retailers, enabling them to list their pharmacies online and also list their medicine inventories. 


## Setup Locally

Clone the repository

```bash
  git clone git@github.com:RxNaruto/Medlr-Pharmacy.git
```
Open it in Code editor and Move to backend Directory
```bash
  cd/backend
```
Now in terminal write this command
```bash
  npm install
```
```bash
  npx tsc -b
```
To start it locally do
```bash
  node dist/index.js
```

## API Reference

#### User Signup

```http
  POST /api/v1/user/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Password |
| `name` | `string` | **Required**. Full name |

#### User Login

```http
  POST /api/v1/user/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Password |

All the api routes below are protected by jwt so need to send authorization token to access them.
Use authorization = {token} in header.

#### Register Pharmacy

```http
  POST /api/v1/pharmacy/addPharmacy
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Pharmacy name |
| `address` | `string` | **Required**. Pharmacy address |
| `mobile no.` | `number` | **Required**. Mobile number |
| `email` | `number` | **Required**. email |

#### Get all Registered Pharmacies

```http
  GET /api/v1/pharmacy/getallPharma
```
#### Search Registered Pharmacies by name

```http
  GET /api/v1/pharmacy/search?name={key}
```

#### Register Medicine

```http
  POST /api/v1/medicine/addMedicine
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Medicine name |
| `description` | `string` | **Required**. Medicine description |
| `price` | `number` | **Required**. price |
| `discount` | `number` | **Required**. discount |
| `quantity` | `number` | **Required**. quantity |
| `pharmacy` | `string` | **Required**. pharmacy id |

#### Update Medicine

```http
  POST /api/v1/medicine/update/:id
```
Here id is medicine id

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Medicine name |
| `description` | `string` | **Required**. Medicine description |
| `price` | `number` | **Required**. price |
| `discount` | `number` | **Required**. discount |
| `quantity` | `number` | **Required**. quantity |

#### Delete Medicine

```http
  POST /api/v1/medicine/delete/:id
```
Here id is medicine id

#### Get Medicine

```http
  POST /api/v1/medicine/get/:id
```
Here id is medicine id

#### Get all Medicine

```http
  POST /api/v1/medicine/getall/:id
```
Here id is pharmacy id





## Packages

Input Validation - Zod 

Authentication - JWT

Caching - Node Cache

mongoose - ODM

