define({ "api": [
  {
    "type": "get",
    "url": "/avg-amount-spent-per-city",
    "title": "Average amount spent per city per order source",
    "name": "AverageAmountSpent",
    "group": "Analytics",
    "description": "<p>Get data on average amount spent per city per order source. Data has been structured specifically for d3 graphs</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>If the calculations were successful or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>An object containing all the required data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"status\": true,\n\t\"message\": {\n\t\t'orderSource' : {\n\t\t\t'city' : '...',\n\t\t\t'average': '...'\n\t\t} \n\t}\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/api.js",
    "groupTitle": "Analytics"
  },
  {
    "type": "get",
    "url": "/customer-engagement-pattern",
    "title": "Customer engagement pattern",
    "name": "CustomerEngagementPattern",
    "group": "Analytics",
    "description": "<p>Endpoint generates a dataset that checks customer engagement patterns by calculating standard deviations between purchases. Data is specifically formatted for HighCharts' 3D graph.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>If the calculations were successful or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>An object containing all the required data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"status\": true,\n\t\"message\": {\n      \t\"name\": day of the week,\n      \t\"values\": [\n        {\n          \"x\": time interval,\n          \"timeSlot\": 0,\n          \"y\": number of purchases\n        },\n\t}\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/api.js",
    "groupTitle": "Analytics"
  },
  {
    "type": "get",
    "url": "/purchases-by-days",
    "title": "Get data for total purchase amount for every day of the week",
    "name": "PurchasesByDay",
    "group": "Analytics",
    "description": "<p>Get data on average amount spent per city per order source. Data has been structured specifically for d3 graphs</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>If the calculations were successful or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>An object containing all the required data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"status\": true,\n\t\"message\": {\n\t\t\"sunday\": 1456,\n\t\t\"monday\": 4321,\n\t\t... \n\t}\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/api.js",
    "groupTitle": "Analytics"
  },
  {
    "type": "get",
    "url": "/purchases-by-time",
    "title": "Purchases by time",
    "name": "PurchasesByTime",
    "group": "Analytics",
    "description": "<p>Calculates the amount of purchases made on each day of the week during given time intervals. The data has been specifically formatted for d3 graphs.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>If the calculations were successful or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>An object containing all the required data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"status\": true,\n\t\"message\": {\n      \t\"name\": day of the week,\n      \t\"values\": [\n        {\n          \"x\": time interval,\n          \"timeSlot\": 0,\n          \"y\": number of purchases\n        },\n\t}\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/api.js",
    "groupTitle": "Analytics"
  },
  {
    "type": "get",
    "url": "/total-customers-per-city",
    "title": "Total customers in each city",
    "name": "TotalCustomersPerCity",
    "group": "Analytics",
    "description": "<p>Calculates and returns the total number of customers per city</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>If the calculations were successful or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>An object containing all the required data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"status\": true,\n\t\"message\": {\n      \t\t\"city\": \"...\",\n      \t\t\"amount\": ...\n\t\t}\n\t}\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/api.js",
    "groupTitle": "Analytics"
  },
  {
    "type": "get",
    "url": "/total-revenue-per-city",
    "title": "Total revenue per city",
    "name": "TotalRevenuePerCity",
    "group": "Analytics",
    "description": "<p>Calculates and returns the total revenue per city</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>If the calculations were successful or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>An object containing all the required data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"status\": true,\n\t\"message\": {\n      \t\t\"city\": \"...\",\n      \t\t\"revenue\": ...\n\t\t}\n\t}\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/api.js",
    "groupTitle": "Analytics"
  },
  {
    "type": "get",
    "url": "/rev-perCity-by-orderSource",
    "title": "Get data for total revenue per city by order source",
    "name": "revenuePerCityByOrderSource",
    "group": "Analytics",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>If the calculations were successful or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>An object containing all the required data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n\t\"status\": true,\n\t\"message\": {\n\t\t...\n\t}\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/api.js",
    "groupTitle": "Analytics"
  },
  {
    "type": "get",
    "url": "/all-cities",
    "title": "Gets all cities",
    "name": "GetAllCities",
    "group": "Data",
    "description": "<p>The endpoint will return all the unique cities found in the dataset</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>If the calculations were successful or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>An object containing all the required data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"status\": true,\n\t\"message\": [\n\t\tcities..\n\t]\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/api.js",
    "groupTitle": "Data"
  },
  {
    "type": "get",
    "url": "/all-order-sources",
    "title": "Gets all order sources",
    "name": "GetAllOrderSources",
    "group": "Data",
    "description": "<p>The endpoint will return all the unique order sources for the dataset</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>If the calculations were successful or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>An object containing all the required data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"status\": true,\n\t\"message\": [\n\t\torder sources..\n\t]\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/api.js",
    "groupTitle": "Data"
  }
] });
