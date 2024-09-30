import sys
import Model
import torch
import Template
import Normalize

def main():
    model_name = sys.argv[1]
    text_input = sys.argv[2]
    model_shape = Template.readMetadataFile(model_name)
    model = Model.passwordModel(model_shape['input_size'], 
                                model_shape['hidden_layer_neurons'],
                                model_shape['hidden_layers'],
                                model_shape['output_size'])
    model.load_state_dict(torch.load(f"./models/{model_name}/model.pt",  weights_only=True))
    normalize_input = Normalize.normalize(text_input)
    model.eval()
    normalize_output = model(normalize_input)
    output = Normalize.denormalize(normalize_output)
    print(output)



if __name__ == "__main__":
    main()
