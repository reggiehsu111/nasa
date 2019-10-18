import numpy as np
import config
import os
import shutil
from tqdm import tqdm
import pickle

class Vote_Generator:
    def __init__(self):

        print("Generating voting data...")

        self.num_label = config.CONFIG["Simulation"]["N_l"]
        self.num_people = config.CONFIG["Simulation"]["N_p"]
        self.voted_location = config.CONFIG["Simulation"]["N_vl"]
        self.guassian_ratio = config.CONFIG["Simulation"]["R_g"]
        self.sigma = config.CONFIG["Simulation"]["sd"]
        with open(config.gold_filename, "rb") as f:
            self.gold_labels = np.genfromtxt(f, delimiter=',')

        if os.path.isdir(config.vote_dir_name):
            shutil.rmtree(config.vote_dir_name)
        os.mkdir(config.vote_dir_name)

        statistics = []
        statistics.append(["id", "is_guassian", "std"])

        for person in tqdm(range(self.num_people)):
            is_guassian = (np.random.uniform() < self.guassian_ratio)
            std = self.__gen_personal_voting__(person, is_guassian)
            statistics.append([person, is_guassian, std])

        statistics = np.array(statistics)
        with open(config.vote_dir_name + "/statistics.csv", "wb") as f:
            np.savetxt(f, statistics, delimiter=',', fmt='%s')

    def __gen_personal_voting__(self, person, is_guassian):

        num_location, num_hour = self.gold_labels.shape
        num_vote = self.voted_location * num_hour
        result = []

        choosed_number = np.sort(np.random.choice(num_location*num_hour, size=num_vote, replace=False))
        std = np.random.uniform(0, self.sigma) * is_guassian

        for number in choosed_number:
            (location, time) = divmod(number, num_hour)

            if is_guassian:

                mean = self.gold_labels[location][time]
                sample = np.round(np.random.normal(mean, std))
                while(sample < 0 or sample >= self.num_label):
                    sample = np.round(np.random.normal(mean, std))

            else:
                sample = np.random.randint(self.num_label)

            result.append((location, time, sample))
        
        with open(config.vote_dir_name + "/{}.pkl".format(person), "wb") as f:
            pickle.dump(result, f)

        return std
