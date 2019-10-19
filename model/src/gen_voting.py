import sys 
sys.path.append('..')
import numpy as np
import config
import os
import shutil
from tqdm import tqdm
import pickle
from multiprocessing import Pool 

num_label = config.CONFIG["Simulation"]["N_l"]
num_people = config.CONFIG["Simulation"]["N_p"]
voted_location = config.CONFIG["Simulation"]["N_vl"]
guassian_ratio = config.CONFIG["Simulation"]["R_g"]
sigma = config.CONFIG["Simulation"]["sd"]


def Vote_Generator():

    print("Generating voting data...")

    with open(config.gold_filename, "rb") as f:
        gold_labels = np.genfromtxt(f, delimiter=',')

    if os.path.isdir(config.vote_dir_name):
        shutil.rmtree(config.vote_dir_name)
    os.mkdir(config.vote_dir_name)

    ids = np.array([i for i in range(num_people)])
    is_guassians = np.random.binomial(1, guassian_ratio, size=num_people)
    stds = np.random.uniform(0, sigma, size=num_people)
    statistics = np.stack((ids, is_guassians, stds)).transpose()
    
    with Pool(config.CONFIG["Thread_Num"]) as p:
      tmp = list(tqdm(p.imap(__gen_personal_voting__, [(row, gold_labels) for row in statistics]), total=num_people))
    # for i in tqdm(range(num_people)):
        # row = statistics[i]
        # __gen_personal_voting__((row, gold_labels) )

    with open(config.vote_dir_name + "/statistics.csv", "wb") as f:
        np.savetxt(f, statistics, delimiter=',', fmt='%s')

def __gen_personal_voting__(rg_tuple):

    (row, gold_labels) = rg_tuple
    (person, is_guassian, std) = (int(row[0]), int(row[1]), row[2])
    num_location, num_hour = gold_labels.shape
    num_vote = voted_location * num_hour
    result = []


    choosed_number = np.sort(np.random.choice(num_location*num_hour, size=num_vote, replace=False))

    for number in choosed_number:
        (location, time) = divmod(number, num_hour)

        if is_guassian:

            mean = gold_labels[location][time]
            sample = np.round(np.random.normal(mean, std))
            while(sample < 0 or sample >= num_label):
                sample = np.round(np.random.normal(mean, std))

        else:
            sample = np.random.randint(num_label)

        result.append((location, time, sample))

    with open(config.vote_dir_name + "/{}.pkl".format(person), "wb") as f:
        pickle.dump(result, f)