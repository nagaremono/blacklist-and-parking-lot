# blacklist-and-parking-lot

## Parking Lot

You can either type in commands to the command line after running the script 
or input a txt file that contains commands to run.

To run interactively cd into exercise2 and:
```bash
./parking_lot.js
```

To use text file as input
```bash
./parking_lot.js file_inputs.txt
```
Note that the file needs to be in the same directory

You might need to change file permission to run this script if you're on unix:
```bash
chmod +x ./parking_lot.js
```

## Blacklist
Consist of 2 functions, initialize and checkBlacklist.
Initialize read a text file containing the blacklist and stores the string as a list of 
people's names and numbers in memory. CheckBlacklist use that array to see if a person
with a number is in the blacklist. Both functions returns a promise so either use .then
or async/await to get the results.
