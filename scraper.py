import urllib
from urllib import urlopen
import threading
import csv
import time

url = 'http://www.simplyrollthedice.com/data'
interval = 60.0 #number of seconds


#returns an array of the lines
def scrape_and_get_text():
	threading.Timer(interval, scrape_and_get_text).start()
	return urlopen(url).read().splitlines()

#returns true if the data already exists in the CSV file, false if it does not
def check_data_exists(filename, new_row):
	with open(filename,'rb') as f:
		reader = csv.reader(f,delimiter=',')
		for row in reader:
			if row==new_row:
				return True
	return False

def writeToFile(snitch_info, filename):
	with open(filename,'ab') as f:
		writer = csv.writer(f)
		for line in snitch_info:
			new_array=line.split(",")
			print check_data_exists(filename, new_array)
			if not (check_data_exists(filename, new_array)):
				print "write new row"
				writer.writerow(new_array) 

while True:
	print "loop"
	snitch_info = scrape_and_get_text()
	writeToFile(snitch_info,'snitch.csv')
	time.sleep(60)


