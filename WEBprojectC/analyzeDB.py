from db_connector import mydatabase  # Connecting to the database


def analyze_database():
    collections = mydatabase.list_collection_names()  # Retrieving a list of all collections in the database

    for collection_name in collections:
        print(f"\n📂 Collection: {collection_name}")
        collection = mydatabase[collection_name]  # Accessing the collection
        documents = collection.find({})  # Fetching all documents from the collection

        # Ensure there are documents in the collection before accessing fields


        keys = documents[0].keys()  # Extracting field names from the first document

        # Printing the field names in a tabular format
        print("=" * 50)
        print(" | ".join(keys))  # Displaying field names as table headers
        for doc in documents:
            print(doc)  # Printing each document's data
        print("=" * 50)


if __name__ == "__main__":
    analyze_database()  # Execute the function if the script is run directly
