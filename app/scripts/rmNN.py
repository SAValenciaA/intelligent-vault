import sys
import shutil

def main():
    model_name = sys.argv[1]
    shutil.rmtree(f"./models/{model_name}")


if __name__ == "__main__":
    main()
