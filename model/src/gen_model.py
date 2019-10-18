import numpy as np
import config
import os
import pickle
import shutil
from tqdm import tqdm
from Model import Model
from scipy import stats

class Model_Generator:
    def __init__(self):
        print("Generating Model...")

        self.num_label = config.CONFIG["Simulation"]["N_l"]
        self.num_people = config.CONFIG["Simulation"]["N_p"]
        self.num_location = config.CONFIG["Simulation"]["N_L"]
        self.observed_ratio = config.CONFIG["Simulation"]["R_ob"]
        with open(config.gold_filename, "rb") as f:
            self.gold_labels = np.genfromtxt(f, delimiter=',')
        with open(config.vote_dir_name + "/statistics.csv", "rb") as f:
            self.statistics = np.genfromtxt(f, delimiter=',', dtype=str)
        self.voting_filenames = sorted(os.listdir(config.vote_dir_name))[:-1]

        self.model = Model(self.num_people)

        for filename in tqdm(self.voting_filenames):
            with open(config.vote_dir_name + "/" + filename, "rb") as f:
                voting_data = pickle.load(f)

            given_golden_distribution = [[0 for j in range(self.num_label)] for i in range(self.num_label)]
            given_voting_distribution = [[0 for j in range(self.num_label)] for i in range(self.num_label)]
            for location, time, vote in voting_data:
                if location / self.num_location > self.observed_ratio:
                    break
                given_golden_distribution[int(self.gold_labels[location][time])][int(vote)] += 1
                given_voting_distribution[int(vote)][int(self.gold_labels[location][time])] += 1

            # self.__given_golden_statistics__(filename, given_golden_distribution)

            given_golden_distribution = np.array(given_golden_distribution)
            given_voting_distribution = np.array(given_voting_distribution)

            given_golden_distribution = given_golden_distribution / np.clip(np.sum(given_golden_distribution, axis=1), a_min=1, a_max=None) # prevent divided by zero
            given_voting_distribution = given_voting_distribution / np.clip(np.sum(given_voting_distribution, axis=1), a_min=1, a_max=None) # prevent divided by zero     

            file_num = int(filename[:-4])
            self.model.set_given_golden(file_num, given_golden_distribution)      
            self.model.set_given_voting(file_num, given_voting_distribution)  
        with open(config.model_filename, "wb") as f:
            pickle.dump(self.model, f)


    def __given_golden_statistics__(filename, given_golden_distribution):
        file_num = int(filename[:-4])
        print(filename, self.statistics[file_num+1])
        given_golden_distribution = np.array(given_golden_distribution)
        for label, row in enumerate(given_golden_distribution):
            vote_mode = stats.mode(row)[0][0]
            vote_std = np.std(row)
            print(label, vote_mode, vote_std)
        input()

