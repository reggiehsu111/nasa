import sys 
sys.path.append('..')
import numpy as np
import config
import os
import pickle
import shutil
from tqdm import tqdm
from Model import Model
from scipy import stats
from multiprocessing import Pool

num_label = config.CONFIG["Simulation"]["N_l"]
num_people = config.CONFIG["Simulation"]["N_p"]
num_location = config.CONFIG["Simulation"]["N_L"]
observed_ratio = config.CONFIG["Simulation"]["R_ob"]
model = Model(num_people)

def Model_Generator():
    print("Generating Model...")

    with open(config.gold_filename, "rb") as f:
        gold_labels = np.genfromtxt(f, delimiter=',')
    with open(config.vote_dir_name + "/statistics.csv", "rb") as f:
        statistics = np.genfromtxt(f, delimiter=',', dtype=str)
    voting_filenums = [i for i in range(num_people)]

    with Pool(config.CONFIG["Thread_Num"]) as p:
        matrix_list = list(tqdm(p.imap(__count_distribution__, [(file_num, gold_labels) for file_num in voting_filenums]), total=len(voting_filenums)))
    # matrix_list = [ [] for i in range(len(voting_filenums))]
    # for i in tqdm(range(len(voting_filenums))):
        # file_num = voting_filenums[i]
        # matrix_list[i] = __count_distribution__(file_num, gold_labels)

    model.matrix_list = np.array(matrix_list)
    with open(config.model_filename, "wb") as f:
        pickle.dump(model, f)

def __count_distribution__(input_tuple):

    (file_num, gold_labels) = input_tuple

    with open(config.vote_dir_name + "/" + str(file_num) + ".pkl", "rb") as f:
        voting_data = pickle.load(f)

    matrix = np.zeros((num_label, num_label))

    for location, time, vote in voting_data:
        if location / num_location > observed_ratio:
            break
        matrix[int(vote)][int(gold_labels[location][time])] += 1

    return matrix

'''def __given_golden_statistics__(filename, given_golden_distribution):
    file_num = int(filename[:-4])
    print(filename, self.statistics[file_num+1])
    given_golden_distribution = np.array(given_golden_distribution)
    for label, row in enumerate(given_golden_distribution):
        vote_mode = stats.mode(row)[0][0]
        vote_std = np.std(row)
        print(label, vote_mode, vote_std)
    input()'''

