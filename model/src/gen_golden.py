import sys 
sys.path.append('..')
import numpy as np
import config

class Gold_Generator:
    def __init__(self):

        print("Generating golden data...")

        self.num_label = config.CONFIG["Simulation"]["N_l"]
        self.num_location = config.CONFIG["Simulation"]["N_L"]
        self.num_hour = config.CONFIG["Simulation"]["N_H"]

        labels = np.random.randint(self.num_label, size=(self.num_location, self.num_hour))
        
        # fill_len = len(str(self.num_location-1)) 
        # index_label = ["location"+str(i).zfill(fill_len) for i in range(self.num_location)]
        # index_label = np.array(index_label).reshape(-1,1)
        # print(labels.shape, index_label.shape)
        # labels = np.hstack((index_label, labels))
        # print(labels)

        
        with open(config.gold_filename, "wb") as f:
            np.savetxt(f, labels, delimiter=',', fmt='%s')