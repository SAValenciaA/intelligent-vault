import os
import sys
import shutil

def main():
    script_path = os.path.dirname(__file__)
    model_name = sys.argv[1]
    shutil.rmtree(f"{script_path}/models/{model_name}")


if __name__ == "__main__":
    main()
