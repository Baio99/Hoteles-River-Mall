package main

import (
	"database/sql"
	"fmt"
	"log"
	//"github.com/godror/godror"
)

func main() {
	// Set up connection string
	connectionString := "academico/academico@//Adrian-PC:1521/XE"

	// Open a connection to the Oracle database
	db, err := sql.Open("godror", connectionString)
	if err != nil {
		log.Fatal("Error connecting to the database:", err)
	}
	defer db.Close()

	// Ping the database to check if the connection is successful
	err = db.Ping()
	if err != nil {
		log.Fatal("Error pinging database:", err)
	}

	fmt.Println("Connected to the Oracle database!")

	// Now you can perform database operations using db
	// For example, you can execute queries like this:
	rows, err := db.Query("SELECT * FROM YOUR_TABLE")
	if err != nil {
		log.Fatal("Error querying database:", err)
	}
	defer rows.Close()

	// Iterate over the rows
	for rows.Next() {
		var column1 string
		var column2 int
		// Scan the values from the row into variables
		err := rows.Scan(&column1, &column2)
		if err != nil {
			log.Fatal("Error scanning row:", err)
		}
		// Do something with the values
		fmt.Println(column1, column2)
	}
	// Check for errors from iterating over rows
	err = rows.Err()
	if err != nil {
		log.Fatal("Error iterating over rows:", err)
	}
}
