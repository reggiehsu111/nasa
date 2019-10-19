import numpy as np

def get_weight(model, file_num, vote):
    return model.get_given_voting_row(file_num, vote)