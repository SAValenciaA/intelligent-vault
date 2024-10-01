import os
import sys
import Model
import torch
import Template
import Normalize
from torch import nn
from difflib import SequenceMatcher

# Make code device agnostic
device = "cuda" if torch.cuda.is_available() else "cpu"

# Mode that recognizes password
def train_model(password: str, secret: str, lr: float, max_epochs: int, 
             model: nn.Module):

    optimizer = torch.optim.Adam(params=model.parameters(), lr=lr)

    loss_fn = nn.MSELoss()

    torch.nn.MSELoss

    # normalize inputs and expected outputs for stability
    password_normalized = Normalize.normalize(password)
    secret_normalized = Normalize.normalize(secret)

    acc_record = 0

    best_model = model.state_dict()

    for epoch in range(max_epochs):

        # Enter train mode
        model.train()

        # test the model with the given password
        secret_pred = model(password_normalized)
        
        # calculate the loss
        loss = loss_fn(secret_pred, secret_normalized)

        # get zero grad
        optimizer.zero_grad()

        # back propagation
        loss.backward()

        # optimizer step
        optimizer.step()

        # enter evaluation mode
        model.eval()

        # check accuaracy of the model not as the tensor that outputs
        # but the string that you get from given tensor
        test_acc = lambda string, comparation: SequenceMatcher(None,string,comparation).ratio()
        test_pred = model(password_normalized)
        acc_ratio = test_acc(
                Normalize.denormalize(test_pred),
                secret)

        # if the accuaracy beat a record, it is then saved as a checkpoint
        if acc_ratio > acc_record:
            acc_record = acc_ratio
            best_model = model.state_dict()
            print("acc: ", acc_ratio)
            # if the model is good enough, just return it
            if acc_ratio >= 0.98:
                print(Normalize.denormalize(test_pred))
                return best_model

    return best_model

if __name__ == "__main__":

    passwordModel = Model.passwordModel

    # Variables got as arguments
    password = sys.argv[1]
    secret = sys.argv[2]
    lr = float(sys.argv[3])
    max_epochs = int(sys.argv[4])
    hidden_layers = int(sys.argv[5])
    extra_neurons = int(sys.argv[6])
    model_name = sys.argv[7]

    # Define neuronal network shsape
    #  input layer
    input_size = len(password)
    #  output layer
    output_size = len(secret)
    #  hidden layers recieve both, out of the past layer
    # and the original input of the input layer so the
    # final output is more chaotic
    hidden_layer_neurons = output_size + input_size + extra_neurons

    # For reproducibility
    torch.manual_seed(42)

    # init model
    model = passwordModel(input_size, hidden_layer_neurons, hidden_layers, 
                          output_size).to(device)

    # get best model from training
    best_model_dict = train_model(password, secret, lr, max_epochs, model)

    # docs recomendation, idk y
    model.eval()

    # path to the script's dir
    script_path = os.path.dirname(__file__)

    print(script_path)

    # create folder in which save mode
    os.makedirs(f"{script_path}/models/{model_name}")
    # save model
    torch.save(best_model_dict, f"{script_path}/models/{model_name}/model.pt")
    # save model shape for future use
    Template.createNewMetadataFile(input_size, hidden_layer_neurons,
                                   hidden_layers, output_size,
                                   model_name)
