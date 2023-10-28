import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_excel('../input/delivery-truck-trips-data/Delivery truck trip data.xlsx')  
for column in df.columns:
    # Find duplicated values in the current column
    duplicated_counts = df[column].value_counts()
    duplicated_counts = duplicated_counts[duplicated_counts > 1]  # Filter values duplicated more than once
    if not duplicated_counts.empty:
        print(f"Column '{column}' has the following duplicate values:")
        for value, count in duplicated_counts.items():
            print(f"'{value}': {count} times")



# List all column names
column_names = df.columns.tolist()

# Print the column names
print("Column names:")
for column_name in column_names:
    print(column_name)