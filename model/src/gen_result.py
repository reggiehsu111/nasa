import config
import pickle
import os
from tqdm import tqdm
import numpy as np
from weight import get_weight

class Evaluater:
    def __init__(self):
        print("Evaluating ...")

        self.num_label = config.CONFIG["Simulation"]["N_l"]
        self.num_hour = config.CONFIG["Simulation"]["N_H"]
        self.num_people = config.CONFIG["Simulation"]["N_p"]
        self.num_location = config.CONFIG["Simulation"]["N_L"]
        self.observed_ratio = config.CONFIG["Simulation"]["R_ob"]
        self.smart_ratio = config.CONFIG["Simulation"]["R_g"]
        with open(config.gold_filename, "rb") as f:
            self.gold_labels = np.genfromtxt(f, delimiter=',')
        self.voting_filenames = sorted(os.listdir(config.vote_dir_name))[:-1]

        with open(config.model_filename, "rb") as f:
            self.model = pickle.load(f)

        self.result = np.zeros((self.num_location, self.num_hour))
        self.__gen_prediction_file__()
        self.__check_prediction_file__()

    def __gen_prediction_file__(self):
       
        print("Generate Prediction File ...")
        # prediction_matrix = [ [ [0 for k in range(self.num_label)] for j in range(self.num_hour) ] for i in range(self.num_location) ]
        prediction_matrix = np.zeros((self.num_location, self.num_hour, self.num_label))

        for filename in tqdm(self.voting_filenames):
            
            file_num = int(filename[:-4])
            with open(config.vote_dir_name + "/" + filename, "rb") as f:
                voting_data = pickle.load(f)

            for location, time, vote in voting_data:
                if location / self.num_location <= self.observed_ratio:
                    continue
                
                prediction_matrix[location][time] += get_weight(self.model, file_num, int(vote))

        self.result = np.argmax(prediction_matrix, axis=2)
        # with open("tmp.csv", "wb") as f:
            # np.savetxt(f, self.result, delimiter=',', fmt='%s')

    def __check_prediction_file__(self):

        lower_bound = int(np.floor(self.num_location*self.observed_ratio) + 1)
        correct = wrong = 0
        for location in range(lower_bound, self.num_location):
            for time in range(self.num_hour):
                predict = int(self.result[location][time])
                label = int(self.gold_labels[location][time])
                if predict == label:
                    correct += 1
                else:
                    wrong += 1
        accuracy = correct / (correct + wrong)
        print("R_ob: ", self.observed_ratio)
        print("N_p: ", self.num_people)
        print("R_g: ", self.smart_ratio)
        print("accuracy: ", accuracy)