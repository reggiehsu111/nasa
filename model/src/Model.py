import numpy as np

class Model:
    def __init__(self, size):
        self.obj_list = [model_obj() for i in range(size)]
        
    def set_given_golden(self, id, prob_list):
        self.obj_list[id].set_given_golden(prob_list)

    def set_given_voting(self, id, prob_list):
        self.obj_list[id].set_given_voting(prob_list)

    def get_given_golden(self, id, condition, outcome):
        return self.obj_list[id].get_given_golden(condition, outcome)

    def get_given_voting(self, id, condition, outcome):
        return self.obj_list[id].get_given_voting(condition, outcome)

    def print_obj(self, id):
        print("given golden:")
        print(self.obj_list[id].get_given_golden)
        print("given voting:")
        print(self.obj_list[id].get_given_voting)

    

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
    