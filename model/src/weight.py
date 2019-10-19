import numpy as np

def get_weight(model, file_num, vote):
    i = np.array([1,2,3,4,5,6])
    row = model.get_given_voting_row(file_num, vote)
    std = np.sqrt(np.sum(row*i*i) - np.sum(row*i)**2)
    w = 1.8 - std
    return w * model.get_given_voting_row(file_num, vote)