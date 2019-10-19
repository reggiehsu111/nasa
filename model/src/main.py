import sys 
sys.path.append('..')
from config import CONFIG
from gen_golden import Gold_Generator
from gen_voting import Vote_Generator
from gen_model import Model_Generator
from gen_result import Evaluater
import numpy as np

if __name__ == "__main__":
    np.random.seed(CONFIG["Seed"])
    Gold_Generator()
    Vote_Generator()
    Model_Generator()
    Evaluater()