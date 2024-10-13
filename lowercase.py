import os

def rename_files_to_lowercase(directory):
    for root, dirs, files in os.walk(directory):
        for name in files:
            print(name)
            old_path = os.path.join(root, name)
            new_name = name.lower()
            new_path = os.path.join(root, new_name)
            os.rename(old_path, new_path)
        for name in dirs:
            old_path = os.path.join(root, name)
            new_name = name.lower()
            new_path = os.path.join(root, new_name)
            os.rename(old_path, new_path)

if __name__ == "__main__":
    directory = os.path.dirname(os.path.realpath(__file__))
    rename_files_to_lowercase(directory)