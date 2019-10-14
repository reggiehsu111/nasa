import requests
from bs4 import BeautifulSoup
import pickle
from tqdm import tqdm


def parse_city_data(city_name):
	res = requests.get('https://api.waqi.info/feed/'+city_name+'/?token=eb2e856bc6f3c8818cebd1db71f1394fed614641')
	json_res = res.json()['data']
	return(json_res)

def scrape_city_data():
	res = requests.get('http://aqicn.org/city/all/')

	soup = BeautifulSoup(res.text, 'html.parser')
	cities = soup.find('div', attrs={'class': 'main-cities'})
	all_cities = []
	for link in cities.select("a"):
		all_cities.append(link.text.split('(')[0])
	print(all_cities)
	print("length of city_data:", len(all_cities))

	city_data = []

	for city in tqdm(all_cities):
		temp_data = parse_city_data(city)
		city_data.append((city, temp_data))

	print(city_data)

	with open('city_data.pkl', 'wb') as file:
		pickle.dump(city_data, file)

def make_dict():
	with open('city_data.pkl', 'rb') as file:
		city_data = pickle.load(file)
	data_dict = {}
	for elem in city_data:
		data_dict[elem[0]] = elem[1]
	return data_dict


if __name__ == '__main__':
	city_data_dict = make_dict()
	keys_to_delete = []
	print("length of city_data_dict:", len(city_data_dict))
	for key in city_data_dict:
		if city_data_dict[key] == 'can not connect':
			keys_to_delete.append(key)
			continue
		# print(key)
	for key in keys_to_delete:
		del city_data_dict[key]
	print("length of city_data_dict:", len(city_data_dict))
	with open('city_data_dict.pkl', 'wb') as file:
		pickle.dump(city_data_dict, file)
