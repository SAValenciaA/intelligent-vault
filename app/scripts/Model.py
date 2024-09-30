import torch
from torch import nn

class passwordModel(nn.Module):
    def __init__(self, input_size: int, hidden_layer_neurons: int, 
                 hidden_layers: int,output_size:int):
        super().__init__()

        init_layer = lambda input, output: nn.Linear(input, output)

        self.layer_input = init_layer(input_size, hidden_layer_neurons - input_size)

        self.hidden_layers = nn.ModuleList([])
        for i in range(hidden_layers):
            self.hidden_layers.append(nn.Linear(hidden_layer_neurons, hidden_layer_neurons - input_size))

        self.layer_output = init_layer(hidden_layer_neurons - input_size, output_size)



        self.activation = nn.ReLU()

    def forward(self, password):
        output = self.activation(self.layer_input(password))

        for layer in self.hidden_layers:
            next_input = torch.cat((password, output), 0)
            output = self.activation(layer(next_input))


        return self.layer_output(output)





