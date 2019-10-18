CONFIG = {
    "Seed": 66,
    "Simulation": {
        "N_l": 6,
        "N_L": 1000,
        "N_H": 48,
        "R_ob": 0.1,
        "N_p": 100000,
        "N_vl": 10,
        "R_g": 0.1,
        "sd": 1.5
    },
    "Prediction" : {
        "T_a": 1
    }
}

gold_filename = "../data/golden/{}_{}_{}.csv".format(CONFIG["Simulation"]["N_l"], CONFIG["Simulation"]["N_L"], CONFIG["Simulation"]["N_H"])
vote_dir_name = "../data/voting/{}_{}_{}_{}_{}".format(CONFIG["Simulation"]["N_l"], CONFIG["Simulation"]["N_p"],CONFIG["Simulation"]["N_vl"],  CONFIG["Simulation"]["R_g"], CONFIG["Simulation"]["sd"])
model_filename = "../data/model/{}_{}_{}_{}_{}.pkl".format(CONFIG["Simulation"]["N_l"], CONFIG["Simulation"]["N_p"],CONFIG["Simulation"]["N_vl"],  CONFIG["Simulation"]["R_g"], CONFIG["Simulation"]["sd"])