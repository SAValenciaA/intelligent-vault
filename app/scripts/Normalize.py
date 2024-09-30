import torch

min_char = "-"
max_char = "{"

min_ascii = ord(min_char)
max_ascii = ord(max_char)

comma = ","
space = " "

# This function normalize string values
# so optimization does not explode
def normalize(unnormalized_string: str) -> torch.Tensor:

    # To include the smallest posible range of characters
    # in the normalization, the space char and the ',' char
    # are replaced to characters closer the alphabet in ascii
    unnormalized_string = unnormalized_string.replace(comma, min_char)
    unnormalized_string = unnormalized_string.replace(space, max_char)


    # Formula for normalizing data using ascii codes so the
    # input is only floats from -1 to 1
    normalizer = lambda n: ((n-min_ascii)/(max_ascii-min_ascii))*(2) - 1

    normalized_list = [normalizer(ord(char)) for char in unnormalized_string]

    return torch.tensor(normalized_list, dtype=torch.float)

# This functions denormalize the result from the neuronal network's model
# so it can be readed
def denormalize(normalized_tensor: torch.Tensor) -> str:
    # transform the normalized value to character
    normalized_to_char = lambda i: chr(int((i.item() + 1) * ((max_ascii - min_ascii)/(2)) + min_ascii))
    # denormalises all the values in the tensor to characters into a string
    denormalized = "".join(normalized_to_char(i) for i in normalized_tensor)
    # return said string
    return denormalized.replace(min_char, comma).replace(max_char, space)
