import os
import json

script_path = os.path.dirname(__file__)

def createNewMetadataFile(input_size: int, hidden_layer_neurons: int,
                          hidden_layers: int, output_size: int,
                          model_name: str) -> None:
        metadata_path = f"{script_path}/models/{model_name}/meta.json"
        data = {
                'input_size': input_size,
                'hidden_layers': hidden_layers,
                'hidden_layer_neurons': hidden_layer_neurons,
                'output_size': output_size
                }
        with open(metadata_path, 'w', encoding='utf-8') as metadata_file:
            json.dump(data, metadata_file, ensure_ascii=False, indent=4)

def readMetadataFile(model_name: str) -> dict:
    metadata_path = f"{script_path}/models/{model_name}/meta.json"
    with open(metadata_path) as metadata_file:
        return json.load(metadata_file)
    
