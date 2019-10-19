import numpy as np

class Model:
    def __init__(self, size):
        self.matrix_list = []


        '''
        matrix =      label1 label2 label3 label4
                vote1
                vote2
                vote3
                vote4
        '''

    def get_given_golden(self, id, condition, outcome):
        given_golden_distribution = self.matrix_list[id][:, condition]
        given_golden_distribution = given_golden_distribution / np.clip(np.sum(given_golden_distribution, axis=1), a_min=1, a_max=None)
        return given_golden_distribution[outcome]

    def get_given_voting_row(self, id, condition):
        given_voting_distribution = self.matrix_list[id][condition, :]
        given_voting_distribution = given_voting_distribution / np.clip(np.sum(given_voting_distribution, axis=0), a_min=1, a_max=None)
        return given_voting_distribution

    def get_given_voting(self, id, condition, outcome):
        given_voting_distribution = self.matrix_list[id][condition, :]
        given_voting_distribution = given_voting_distribution / np.clip(np.sum(given_voting_distribution, axis=0), a_min=1, a_max=None)
        return given_voting_distribution[outcome]

    def print_obj(self, id):
        print(self.matrix_list[id])

    
'''
class model_obj:
    def __init__(self):
        # np.array( np.array() )
        self.given_golden_probability = list( list() )
        self.given_voting_probability = list( list() )

    def set_given_golden(self, prob_list):
        self.given_golden_probability = prob_list

    def set_given_voting(self, prob_list):
        self.given_voting_probability = prob_list

    def get_given_golden(self, condition, outcome):
        return self.given_golden_probability[condition][outcome]

    def get_given_voting(self, condition, outcome):
        return self.given_voting_probability[condition][outcome]
'''